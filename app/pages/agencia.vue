<script setup lang="ts">
const serviciosImagenes = [
  {
    id: 1,
    imagen: '/agencia/contratacion-modelos.jpg',
    alt: 'Contratación de Modelos – Agencia RM',
    titulo: 'Contratación de Modelos',
    descripcion: 'Banco de talento verificado para producciones, campañas publicitarias y eventos de cualquier escala.'
  },
  {
    id: 2,
    imagen: '/agencia/casting-modelos.jpg',
    alt: 'Casting de Modelos – Agencia RM',
    titulo: 'Casting Profesional',
    descripcion: 'Proceso de selección de talento con criterios profesionales para proyectos editoriales, desfiles y producciones audiovisuales.'
  },
  {
    id: 3,
    imagen: '/agencia/escuela-modelos.jpg',
    alt: 'Escuela de Modelos – RM',
    titulo: 'Escuela de Modelos',
    descripcion: 'Formación integral para modelos desde cero: pasarela, fotografía, expresión corporal y preparación para la industria.'
  },
  {
    id: 4,
    imagen: '/agencia/rm-producciones.jpg',
    alt: 'Agencia RM – Producción y talento',
    titulo: 'Producción Agencia RM',
    descripcion: 'Acompañamiento integral para marcas y productoras con dirección creativa, coordinación de talento y ejecución de alto nivel.'
  }
]

const formulario = reactive({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  servicio: '',
  mensaje: ''
})

const isSubmitting = ref(false)

const whatsappBase = 'https://wa.me/573016555918'

const whatsappServicioLink = (servicio: string) => {
  const mensaje = `Hola, quiero más información sobre el servicio: ${servicio}`
  return `${whatsappBase}?text=${encodeURIComponent(mensaje)}`
}

const handleSubmit = async () => {
  isSubmitting.value = true
  // TODO: Integrar con backend o servicio de email
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  alert('¡Gracias por tu solicitud! Te contactaremos pronto.')
  // Reset form
  formulario.nombre = ''
  formulario.email = ''
  formulario.telefono = ''
  formulario.empresa = ''
  formulario.servicio = ''
  formulario.mensaje = ''
}

useSeoMeta({
  title: 'Agencia - Servicios Profesionales para Eventos y Moda | RM',
  description: 'Contrata talento profesional, modelos, fotógrafos, productores y personal especializado para tus eventos, desfiles y activaciones de marca.'
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-gray-950 text-white overflow-hidden h-[220px] sm:h-[260px] lg:h-[300px]">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/images/banners/banner-agencia.jpg');"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/50 to-gray-950/82"
        style="pointer-events:none;"
      />
      <div class="relative h-full mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-start justify-end pb-7 sm:pb-9 lg:pb-10 text-left">
        <h1 class="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F4EFE8]" style="text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);">
          Agencia RM
        </h1>
      </div>
    </section>

    <!-- Servicios -->
    <section class="py-12 sm:py-20 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10 sm:mb-14">
          <h2 class="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones integrales para materializar tu proyecto con el más alto nivel de profesionalismo
          </p>
        </div>

        <!-- Grid de imágenes responsivo -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <article
            v-for="s in serviciosImagenes"
            :key="s.id"
            class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <!-- Imagen -->
            <div class="overflow-hidden" style="aspect-ratio: 4/3;">
              <NuxtImg
                :src="s.imagen"
                :alt="s.alt"
                width="600"
                height="450"
                format="webp"
                quality="85"
                loading="lazy"
                class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <!-- Texto fuera de la imagen -->
            <div class="p-5 sm:p-6">
              <h3 class="text-xl font-display font-bold text-gray-900 mb-2 leading-tight">
                {{ s.titulo }}
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed mb-4">
                {{ s.descripcion }}
              </p>
              <UButton
                :to="whatsappServicioLink(s.titulo)"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="solid"
                size="sm"
                class="font-semibold"
              >
                Solicitar info
              </UButton>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Formulario de Cotización -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="mx-auto max-w-4xl px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Solicita una Cotización
          </h2>
          <p class="text-lg text-gray-600">
            Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="bg-gray-50 rounded-2xl border border-gray-100 p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Nombre Completo" name="nombre" required class="w-full">
              <UInput
                v-model="formulario.nombre"
                placeholder="Tu nombre"
                size="lg"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Email" name="email" required class="w-full">
              <UInput
                v-model="formulario.email"
                type="email"
                placeholder="tu@email.com"
                size="lg"
                class="w-full"
                required
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Teléfono" name="telefono" required class="w-full">
              <UInput
                v-model="formulario.telefono"
                type="tel"
                placeholder="+57 301 655 5918"
                size="lg"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Empresa" name="empresa" class="w-full">
              <UInput
                v-model="formulario.empresa"
                placeholder="Nombre de tu empresa (opcional)"
                size="lg"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="Servicio de Interés" name="servicio" required class="w-full">
            <USelect
              v-model="formulario.servicio"
              :items="serviciosImagenes.map(s => ({ label: s.titulo, value: s.titulo }))"
              placeholder="Selecciona un servicio"
              size="lg"
              class="w-full"
              required
            />
          </UFormField>

          <UFormField label="Cuéntanos sobre tu proyecto" name="mensaje" required class="w-full">
            <UTextarea
              v-model="formulario.mensaje"
              placeholder="Describe brevemente tu evento o proyecto, fecha aproximada, cantidad de personal requerido, etc."
              :rows="5"
              size="lg"
              class="w-full"
              required
            />
          </UFormField>

          <UButton
            type="submit"
            size="lg"
            block
            :loading="isSubmitting"
            class="font-bold"
          >
            Enviar Solicitud
          </UButton>
        </form>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div class="flex items-center gap-2 text-gray-700">
            <UIcon name="i-lucide-phone" class="w-5 h-5 text-orange-500" />
            <span class="font-semibold">WhatsApp:</span>
            <a href="https://wa.me/573016555918" target="_blank" class="text-orange-600 hover:text-orange-700">
              +57 301 655 5918
            </a>
          </div>
          <span class="hidden sm:block text-gray-300">•</span>
          <div class="flex items-center gap-2 text-gray-700">
            <UIcon name="i-lucide-mail" class="w-5 h-5 text-orange-500" />
            <a href="mailto:spaziointerior13@gmail.com" class="text-orange-600 hover:text-orange-700">
              spaziointerior13@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="bg-orange-600 text-white py-16">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <h2 class="text-2xl sm:text-3xl font-display font-bold mb-3">
          ¿Necesitas una solución personalizada?
        </h2>
        <p class="text-orange-100 mb-8 text-lg">
          Trabajamos con marcas, agencias y productoras para crear experiencias inolvidables
        </p>
        <UButton
          to="/contacto"
          color="neutral"
          variant="solid"
          size="lg"
          class="bg-white text-orange-600 hover:bg-orange-50 font-bold"
        >
          Hablemos de tu proyecto
        </UButton>
      </div>
    </section>
  </div>
</template>
