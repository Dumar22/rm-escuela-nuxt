import { queryOne } from '#server/utils/db'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeText(value: unknown, maxLength = 2000) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function splitRecipients(value: string | undefined) {
  if (!value) return []
  return value.split(',').map(item => item.trim()).filter(Boolean)
}

function createNotificationPayload(input: {
  id: string
  name: string
  email: string
  phone: string
  course: string
  message: string
  createdAt: string
  sourceUrl: string
}) {
  const subject = input.course
    ? `Nuevo lead interesado en ${input.course}`
    : `Nuevo lead de contacto: ${input.name}`

  const lines = [
    'Nuevo mensaje desde el formulario de contacto',
    `ID: ${input.id}`,
    `Fecha: ${input.createdAt}`,
    `Nombre: ${input.name}`,
    `Email: ${input.email}`,
    `Telefono: ${input.phone || 'No informado'}`,
    `Curso de interes: ${input.course || 'No informado'}`,
    `Mensaje: ${input.message}`,
    `Origen: ${input.sourceUrl}`
  ]

  const text = lines.join('\n')
  const html = `
    <h2>Nuevo mensaje desde el formulario de contacto</h2>
    <p><strong>ID:</strong> ${input.id}</p>
    <p><strong>Fecha:</strong> ${input.createdAt}</p>
    <p><strong>Nombre:</strong> ${input.name}</p>
    <p><strong>Email:</strong> ${input.email}</p>
    <p><strong>Telefono:</strong> ${input.phone || 'No informado'}</p>
    <p><strong>Curso de interes:</strong> ${input.course || 'No informado'}</p>
    <p><strong>Mensaje:</strong><br/>${input.message.replace(/\n/g, '<br/>')}</p>
    <p><strong>Origen:</strong> ${input.sourceUrl}</p>
  `

  return { subject, text, html, replyTo: input.email }
}

async function sendEmailNotification(payload: { subject: string; text: string; html: string; replyTo?: string }, config: {
  resendApiKey?: string
  contactNotificationFromEmail?: string
  contactNotificationToEmails?: string
}) {
  const { resendApiKey, contactNotificationFromEmail, contactNotificationToEmails } = config
  const to = splitRecipients(contactNotificationToEmails)

  if (!resendApiKey || !contactNotificationFromEmail || to.length === 0) {
    return { status: 'skipped', reason: 'missing-config' }
  }

  await $fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`
    },
    body: {
      from: contactNotificationFromEmail,
      to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      reply_to: payload.replyTo ? [payload.replyTo] : undefined
    }
  })

  return { status: 'sent' }
}

async function sendWhatsAppNotification(payload: { text: string }, config: {
  whatsappApiToken?: string
  whatsappPhoneNumberId?: string
  whatsappTeamTo?: string
}) {
  const { whatsappApiToken, whatsappPhoneNumberId, whatsappTeamTo } = config

  if (!whatsappApiToken || !whatsappPhoneNumberId || !whatsappTeamTo) {
    return { status: 'skipped', reason: 'missing-config' }
  }

  await $fetch(`https://graph.facebook.com/v20.0/${whatsappPhoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${whatsappApiToken}`
    },
    body: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: whatsappTeamTo,
      type: 'text',
      text: {
        body: payload.text
      }
    }
  })

  return { status: 'sent' }
}

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Método no permitido' })
  }

  try {
    const body = await readBody(event)

    const name = sanitizeText(body?.name, 120)
    const email = sanitizeText(body?.email, 180).toLowerCase()
    const phone = sanitizeText(body?.phone, 40)
    const course = sanitizeText(body?.course, 120)
    const message = sanitizeText(body?.message, 5000)
    const website = sanitizeText(body?.website, 255)

    if (website) {
      return { success: true }
    }

    if (!name || !email || !message) {
      throw createError({ statusCode: 400, statusMessage: 'Nombre, email y mensaje son obligatorios' })
    }

    if (!EMAIL_REGEX.test(email)) {
      throw createError({ statusCode: 400, statusMessage: 'El email no es válido' })
    }

    const result = await queryOne<{ id: string; created_at: string }>(
      `
        INSERT INTO contact_messages (name, email, phone, course, message)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at
      `,
      [name, email, phone || null, course || null, message]
    )

    const runtimeConfig = useRuntimeConfig(event)
    const sourceUrl = getRequestURL(event).toString()
    const notificationPayload = createNotificationPayload({
      id: result?.id || 'sin-id',
      name,
      email,
      phone,
      course,
      message,
      createdAt: result?.created_at || new Date().toISOString(),
      sourceUrl
    })

    const [emailNotification, whatsappNotification] = await Promise.all([
      sendEmailNotification(notificationPayload, {
        resendApiKey: runtimeConfig.resendApiKey,
        contactNotificationFromEmail: runtimeConfig.contactNotificationFromEmail,
        contactNotificationToEmails: runtimeConfig.contactNotificationToEmails
      }).catch((error: any) => {
        console.error('Error enviando email de contacto:', error)
        return { status: 'error', reason: 'send-failed' }
      }),
      sendWhatsAppNotification({ text: notificationPayload.text }, {
        whatsappApiToken: runtimeConfig.whatsappApiToken,
        whatsappPhoneNumberId: runtimeConfig.whatsappPhoneNumberId,
        whatsappTeamTo: runtimeConfig.whatsappTeamTo
      }).catch((error: any) => {
        console.error('Error enviando WhatsApp de contacto:', error)
        return { status: 'error', reason: 'send-failed' }
      })
    ])

    return {
      success: true,
      data: result,
      notifications: {
        email: emailNotification,
        whatsapp: whatsappNotification
      }
    }
  } catch (error: any) {
    console.error('Error en contact API:', error)

    if (error?.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'No se pudo procesar el mensaje de contacto'
    })
  }
})
