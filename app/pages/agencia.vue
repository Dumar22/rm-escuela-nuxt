<script setup lang="ts">
const servicios = [
  {
    id: 1,
    icon: 'i-lucide-users',
    title: 'Personal para Logística',
    description: 'Staff capacitado y profesional para la ejecución de eventos corporativos, ferias y convenciones.',
    features: ['Coordinadores de evento', 'Auxiliares de montaje', 'Personal de apoyo']
  },
  {
    id: 2,
    icon: 'i-lucide-sparkles',
    title: 'Modelos para Protocolo',
    description: 'Talento especializado en atención protocolaria, imagen de marca y representación corporativa.',
    features: ['Edecanes y azafatas', 'Imagen de marca', 'Protocolo empresarial']
  },
  {
    id: 3,
    icon: 'i-lucide-briefcase',
    title: 'Contratación de Talento',
    description: 'Banco de talento verificado para producciones, campañas y eventos de cualquier escala.',
    features: ['Modelos profesionales', 'Actores y performers', 'Casting personalizado']
  },
  {
    id: 4,
    icon: 'i-lucide-shirt',
    title: 'Desfiles de Moda',
    description: 'Producción integral de pasarelas, desde el casting hasta la dirección de escena.',
    features: ['Casting de modelos', 'Coreografía y dirección', 'Coordinación general']
  },
  {
    id: 5,
    icon: 'i-lucide-megaphone',
    title: 'Activación de Marca',
    description: 'Estrategias BTL con personal capacitado para generar engagement con tu público objetivo.',
    features: ['Sampleo y degustación', 'Experiencias de marca', 'Embajadores de marca']
  },
  {
    id: 6,
    icon: 'i-lucide-camera',
    title: 'Fotografía de Moda y Profesional',
    description: 'Sesiones fotográficas para lookbooks, e-commerce, catálogos y campañas publicitarias.',
    features: ['Fotografía editorial', 'Fotografía de producto', 'Campañas publicitarias']
  },
  {
    id: 7,
    icon: 'i-lucide-clapperboard',
    title: 'Productor de Eventos y Moda',
    description: 'Gestión completa de producción para lanzamientos, desfiles y eventos corporativos.',
    features: ['Dirección de producción', 'Coordinación de equipo', 'Logística integral']
  },
  {
    id: 8,
    icon: 'i-lucide-disc-3',
    title: 'DJs',
    description: 'Selección musical profesional para crear la atmósfera perfecta en tu evento.',
    features: ['DJs residentes', 'Ambientación musical', 'Equipos de sonido']
  },
  {
    id: 9,
    icon: 'i-lucide-palette',
    title: 'Decoración',
    description: 'Diseño y montaje de espacios que reflejan la identidad visual de tu marca o evento.',
    features: ['Diseño de espacios', 'Montaje y producción', 'Mobiliario y ambientación']
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
    <section class="relative bg-gray-950 text-white overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-gray-950/80 to-gray-950"
        style="pointer-events:none;"
      />
      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 text-center">
        <span
          class="inline-block px-4 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold uppercase tracking-widest mb-5"
        >
          Servicios Profesionales
        </span>
        <h1 class="text-4xl font-display font-bold tracking-tight sm:text-5xl mb-4">
          Agencia RM
        </h1>
        <p class="text-lg text-gray-300 max-w-xl mx-auto">
          Talento profesional y servicios especializados para eventos, moda y producción audiovisual
        </p>
      </div>
    </section>

    <!-- Servicios -->
    <section class="py-16 sm:py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluciones integrales para materializar tu proyecto con el más alto nivel de profesionalismo
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="servicio in servicios"
            :key="servicio.id"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                <UIcon :name="servicio.icon" class="w-6 h-6 text-orange-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 leading-tight">
                {{ servicio.title }}
              </h3>
            </div>

            <p class="text-gray-600 mb-4 leading-relaxed">
              {{ servicio.description }}
            </p>

            <ul class="space-y-2">
              <li
                v-for="feature in servicio.features"
                :key="feature"
                class="flex items-start gap-2 text-sm text-gray-700"
              >
                <UIcon name="i-lucide-check" class="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{{ feature }}</span>
              </li>
            </ul>
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
            <UFormField label="Nombre Completo" name="nombre" required>
              <UInput
                v-model="formulario.nombre"
                placeholder="Tu nombre"
                size="lg"
                required
              />
            </UFormField>

            <UFormField label="Email" name="email" required>
              <UInput
                v-model="formulario.email"
                type="email"
                placeholder="tu@email.com"
                size="lg"
                required
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Teléfono" name="telefono" required>
              <UInput
                v-model="formulario.telefono"
                type="tel"
                placeholder="+57 301 655 5918"
                size="lg"
                required
              />
            </UFormField>

            <UFormField label="Empresa" name="empresa">
              <UInput
                v-model="formulario.empresa"
                placeholder="Nombre de tu empresa (opcional)"
                size="lg"
              />
            </UFormField>
          </div>

          <UFormField label="Servicio de Interés" name="servicio" required>
            <USelect
              v-model="formulario.servicio"
              :items="servicios.map(s => ({ label: s.title, value: s.title }))"
              placeholder="Selecciona un servicio"
              size="lg"
              required
            />
          </UFormField>

          <UFormField label="Cuéntanos sobre tu proyecto" name="mensaje" required>
            <UTextarea
              v-model="formulario.mensaje"
              placeholder="Describe brevemente tu evento o proyecto, fecha aproximada, cantidad de personal requerido, etc."
              :rows="5"
              size="lg"
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
