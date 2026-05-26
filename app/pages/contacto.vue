<script setup lang="ts">
type CourseApiItem = {
  id: string
  slug: string
  title: string
}

type CoursesApiResponse = {
  success: boolean
  data: CourseApiItem[]
}

const contactInfo = [
  {
    icon: 'i-lucide-map-pin',
    title: 'Ubicación',
    lines: ['Manizales', 'Pereira', 'Medellín']
  },
  {
    icon: 'i-lucide-phone',
    title: 'Teléfono',
    lines: ['WhatsApp: +57 301 655 5918']
  },
  {
    icon: 'i-lucide-mail',
    title: 'Email',
    lines: ['spaziointerior13@gmail.com']
  },
  {
    icon: 'i-lucide-clock',
    title: 'Horario de Atención',
    lines: ['Lunes a Viernes: 8:00 AM - 6:00 PM', 'Sábados: 9:00 AM - 2:00 PM', 'Domingos: Cerrado']
  }
]

const fallbackCourseOptions = [
  { label: 'Fotografía de Moda', value: 'fotografia-moda' },
  { label: 'Visual Merchandising', value: 'visual-merchandising' },
  { label: 'Modelo Profesional', value: 'modelo-profesional' },
  { label: 'Wedding Planner', value: 'wedding-planner' },
  { label: 'Productor de Eventos', value: 'productor-eventos' },
  { label: 'Otro', value: 'otro' }
]

const { data: coursesResponse } = await useAsyncData('contact-courses', async () => {
  try {
    return await $fetch<CoursesApiResponse>('/api/courses')
  } catch {
    return null
  }
})

const courseOptions = computed(() => {
  const apiCourses = coursesResponse.value?.data || []
  const apiOptions = apiCourses.map(course => ({
    label: course.title,
    value: course.slug
  }))

  if (apiOptions.length > 0) {
    return [...apiOptions, { label: 'Otro', value: 'otro' }]
  }

  return fallbackCourseOptions
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  course: '',
  otherCourse: '',
  message: '',
  website: ''
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref('')

const isOtherCourse = computed(() => form.course === 'otro')

const getSelectedCourseLabel = () => {
  if (form.course === 'otro') {
    return form.otherCourse.trim() || 'Otro (sin detalle)'
  }

  const selected = courseOptions.value.find(option => option.value === form.course)
  if (!selected) return 'No informado'
  return `${selected.label} (${selected.value})`
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  submitError.value = ''
  submitSuccess.value = ''
  isSubmitting.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course: getSelectedCourseLabel(),
        message: form.message,
        website: form.website
      }
    })

    submitSuccess.value = '¡Gracias por tu mensaje! Te contactaremos pronto.'

    form.name = ''
    form.email = ''
    form.phone = ''
    form.course = ''
    form.otherCourse = ''
    form.message = ''
    form.website = ''
  } catch (error: any) {
    submitError.value = error?.data?.statusMessage || 'No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.'
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Contacto - RM Escuela Creativa',
  description: 'Contáctanos para más información sobre nuestros cursos de moda, fotografía, diseño y más.'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-gray-950 text-white overflow-hidden h-[220px] sm:h-[260px] lg:h-[300px]">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/images/banners/banner-contactanos.jpg');"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/50 to-gray-950/82"
        style="pointer-events:none;"
      />
      <div class="relative h-full mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-end pb-7 sm:pb-9 lg:pb-10 text-center">
        <h1 class="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F4EFE8]" style="text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);">
          Contáctanos
        </h1>
      </div>
    </section>

    <!-- Contenido -->
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Información de Contacto -->
          <div>
            <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 mb-6">
              Información de Contacto
            </h2>
            <p class="text-lg text-gray-700 mb-8">
              Comunícate con nosotros por cualquiera de estos medios. Normalmente respondemos en menos de 24 horas.
            </p>

            <div class="space-y-4">
              <UCard v-for="info in contactInfo" :key="info.title">
                <template #header>
                  <div class="flex items-center gap-2">
                    <UIcon :name="info.icon" class="h-5 w-5 text-orange-500" />
                    <span class="font-semibold">{{ info.title }}</span>
                  </div>
                </template>
                <p v-for="line in info.lines" :key="line" class="text-gray-700">
                  {{ line }}
                </p>
              </UCard>
            </div>
          </div>

          <!-- Formulario -->
          <div>
            <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 mb-6">
              Envíanos un Mensaje
            </h2>

            <form class="space-y-6" @submit.prevent="handleSubmit">
              <!-- Campo honeypot anti-spam: debe permanecer vacío -->
              <input
                v-model="form.website"
                type="text"
                name="website"
                autocomplete="off"
                tabindex="-1"
                class="hidden"
                aria-hidden="true"
              >

              <UFormField label="Nombre Completo" name="name" required class="w-full">
                <UInput
                  v-model="form.name"
                  placeholder="Tu nombre"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Email" name="email" required class="w-full">
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="tu@email.com"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Teléfono" name="phone" class="w-full">
                <UInput
                  v-model="form.phone"
                  type="tel"
                  placeholder="+57 301 655 5918"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UFormField label="Curso de Interés" name="course" class="w-full">
                <USelect
                  v-model="form.course"
                  :items="courseOptions"
                  placeholder="Selecciona un curso"
                  size="lg"
                  class="w-full"
                  required
                />
              </UFormField>

              <UFormField
                v-if="isOtherCourse"
                label="¿Qué curso te interesa?"
                name="otherCourse"
                required
                class="w-full"
              >
                <UInput
                  v-model="form.otherCourse"
                  placeholder="Escribe el curso de interés"
                  size="lg"
                  class="w-full"
                  required
                />
              </UFormField>

              <UFormField label="Mensaje" name="message" required class="w-full">
                <UTextarea
                  v-model="form.message"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  :rows="4"
                  size="lg"
                  class="w-full"
                />
              </UFormField>

              <UButton
                type="submit"
                size="lg"
                block
                :loading="isSubmitting"
              >
                Enviar Mensaje
              </UButton>

              <UAlert
                v-if="submitSuccess"
                color="success"
                variant="subtle"
                :description="submitSuccess"
                icon="i-lucide-check-circle"
              />

              <UAlert
                v-if="submitError"
                color="error"
                variant="subtle"
                :description="submitError"
                icon="i-lucide-alert-triangle"
              />
            </form>

            <div class="mt-6">
              <UAlert
                color="primary"
                variant="subtle"
                title="¿Prefieres WhatsApp?"
                description="También puedes escribirnos directamente al +57 301 655 5918"
                icon="i-simple-icons-whatsapp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
