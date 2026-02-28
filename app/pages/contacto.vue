<script setup lang="ts">
const contactInfo = [
  {
    icon: 'i-lucide-map-pin',
    title: 'Dirección',
    lines: ['Calle 10 #45-67', 'El Poblado, Medellín', 'Antioquia, Colombia']
  },
  {
    icon: 'i-lucide-phone',
    title: 'Teléfono',
    lines: ['+57 (4) 123 4567', 'WhatsApp: +57 300 123 4567']
  },
  {
    icon: 'i-lucide-mail',
    title: 'Email',
    lines: ['info@rmescuela.com', 'admisiones@rmescuela.com']
  },
  {
    icon: 'i-lucide-clock',
    title: 'Horario de Atención',
    lines: ['Lunes a Viernes: 8:00 AM - 6:00 PM', 'Sábados: 9:00 AM - 2:00 PM', 'Domingos: Cerrado']
  }
]

const courseOptions = [
  { label: 'Selecciona un curso', value: '' },
  { label: 'Fotografía de Moda', value: 'fotografia-moda' },
  { label: 'Visual Merchandising', value: 'visual-merchandising' },
  { label: 'Modelo Profesional', value: 'modelo-profesional' },
  { label: 'Wedding Planner', value: 'wedding-planner' },
  { label: 'Productor de Eventos', value: 'productor-eventos' },
  { label: 'Otro', value: 'otro' }
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  course: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: Implementar envío real del formulario
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  alert('¡Gracias por tu mensaje! Te contactaremos pronto.')
}

useSeoMeta({
  title: 'Contacto - RM Escuela Creativa',
  description: 'Contáctanos para más información sobre nuestros cursos de moda, fotografía, diseño y más.'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-black text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-black to-slate-950" />
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-display font-bold tracking-tight sm:text-5xl mb-6">
            Contáctanos
          </h1>
          <p class="text-xl text-gray-200">
            Estamos aquí para ayudarte a comenzar tu viaje creativo
          </p>
        </div>
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
              <UFormField label="Nombre Completo" name="name" required>
                <UInput
                  v-model="form.name"
                  placeholder="Tu nombre"
                  size="lg"
                />
              </UFormField>

              <UFormField label="Email" name="email" required>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="tu@email.com"
                  size="lg"
                />
              </UFormField>

              <UFormField label="Teléfono" name="phone">
                <UInput
                  v-model="form.phone"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  size="lg"
                />
              </UFormField>

              <UFormField label="Curso de Interés" name="course">
                <USelect
                  v-model="form.course"
                  :items="courseOptions"
                  size="lg"
                />
              </UFormField>

              <UFormField label="Mensaje" name="message" required>
                <UTextarea
                  v-model="form.message"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  :rows="4"
                  size="lg"
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
            </form>

            <div class="mt-6">
              <UAlert
                color="primary"
                variant="subtle"
                title="¿Prefieres WhatsApp?"
                description="También puedes escribirnos directamente al +57 300 123 4567"
                icon="i-simple-icons-whatsapp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
