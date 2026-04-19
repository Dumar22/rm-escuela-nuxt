import { query, queryOne } from '~/app/server/utils/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    if (method === 'GET') {
      // Listar todos los cursos
      const courses = await query(`
        SELECT * FROM courses 
        ORDER BY display_order ASC
      `)
      return { success: true, data: courses }
    }

    if (method === 'POST') {
      // Crear nuevo curso
      const body = await readBody(event)
      
      const { slug, title, subtitle, short_desc, description, category, category_color, duration, modality, level, image, detail_images, price, currency, featured, display_order } = body

      if (!slug || !title || !description) {
        throw createError({ statusCode: 400, statusMessage: 'Faltan campos requeridos' })
      }

      const result = await queryOne(`
        INSERT INTO courses (slug, title, subtitle, short_desc, description, category, category_color, duration, modality, level, image, detail_images, price, currency, featured, display_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *
      `, [slug, title, subtitle, short_desc, description, category, category_color, duration, modality, level, image, JSON.stringify(detail_images || []), price, currency, featured || false, display_order || 1])

      return { success: true, data: result }
    }
  } catch (error: any) {
    console.error('Error en courses API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error al procesar la solicitud'
    })
  }
})
