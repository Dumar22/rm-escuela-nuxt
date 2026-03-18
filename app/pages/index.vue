<script setup lang="ts">
const { destacados } = useCursos()

const features = [
  {
    icon: 'i-lucide-award',
    title: 'Profesores Expertos',
    description: 'Aprende de profesionales activos en la industria con años de experiencia'
  },
  {
    icon: 'i-lucide-clock',
    title: 'Horarios Flexibles',
    description: 'Clases presenciales y virtuales adaptadas a tu agenda'
  },
  {
    icon: 'i-lucide-users',
    title: 'Comunidad Creativa',
    description: 'Conecta con otros estudiantes y profesionales del sector'
  }
]

const testimonials = [
  {
    name: 'María González',
    role: 'Estudiante de Fotografía',
    content: 'La mejor decisión de mi carrera. Los profesores son increíbles y el ambiente es súper inspirador.',
    rating: 5
  },
  {
    name: 'Carlos Mendoza',
    role: 'Graduado de Visual Merchandising',
    content: 'Conseguí trabajo antes de terminar el curso. La calidad de la enseñanza es excelente.',
    rating: 4.9
  },
  {
    name: 'Laura Pérez',
    role: 'Estudiante de Modelo Profesional',
    content: 'Superó todas mis expectativas. Me siento preparada para enfrentar el mundo profesional.',
    rating: 4.5
  }
]

function starType(rating: number, pos: number) {
  if (pos <= Math.floor(rating)) return 'full'
  if (pos === Math.ceil(rating) && rating % 1 >= 0.4) return 'half'
  return 'empty'
}

useSeoMeta({
  title: 'RM Escuela Creativa de Artes y Moda',
  description: 'Descubre tu talento creativo con nuestros cursos profesionales de moda, arte, fotografía y más. Formación de calidad en Medellín, Colombia.'
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <section class="pt-20 pb-10 sm:pt-28 sm:pb-12 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            ¿Por Qué Elegir RM Escuela Creativa?
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-700">
            Más de 10 años formando profesionales creativos
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-7xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <UCard 
              v-for="feature in features" 
              :key="feature.title"
              class="text-center group cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/60"
            >
              <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 transition-colors duration-300 group-hover:bg-orange-200">
                <UIcon :name="feature.icon" class="h-8 w-8 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 class="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-orange-600">{{ feature.title }}</h3>
              <p class="text-gray-700">{{ feature.description }}</p>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Cursos Destacados -->
    <section class="pt-10 pb-10 sm:pt-12 sm:pb-12 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-14">
          <span class="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Nuestros Cursos
          </span>
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cursos Destacados
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-700">
            Los programas más populares de nuestra escuela
          </p>
        </div>

        <div class="mx-auto max-w-4xl mb-8 sm:mb-10">
          <UAlert
            color="warning"
            variant="subtle"
            icon="i-lucide-badge-percent"
            title="Promoción por compra múltiple"
            description="Compra 2 cursos: 10% OFF · Compra 3 cursos: 15% OFF · Compra 4 cursos: 20% OFF"
          />
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <CursoCard
            v-for="curso in destacados"
            :key="curso.id"
            :curso="curso"
            destacado
          />
        </div>

        <div class="mt-12 text-center">
          <UButton
            to="/cursos"
            variant="outline"
            color="primary"
            size="lg"
            trailing-icon="i-lucide-arrow-right"
          >
            Ver Todos los Cursos
          </UButton>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="pt-10 pb-24 sm:pt-12 sm:pb-32 bg-gradient-to-br from-gray-50 to-orange-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-16">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Lo Que Dicen Nuestros Estudiantes
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-700">
            Historias de éxito de nuestra comunidad
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <UCard 
            v-for="testimonial in testimonials" 
            :key="testimonial.name"
            class="bg-white"
          >
            <div class="flex items-center gap-0.5 mb-4">
              <template v-for="pos in 5" :key="pos">
                <!-- Estrella llena -->
                <svg v-if="starType(testimonial.rating, pos) === 'full'" class="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <!-- Media estrella -->
                <svg v-else-if="starType(testimonial.rating, pos) === 'half'" class="h-5 w-5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient :id="`half-${testimonial.name}`">
                      <stop offset="50%" stop-color="#f59e0b"/>
                      <stop offset="50%" stop-color="#d1d5db"/>
                    </linearGradient>
                  </defs>
                  <path :fill="`url(#half-${testimonial.name})`" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <!-- Estrella vacía -->
                <svg v-else class="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </template>
              <span class="ml-1.5 text-sm font-semibold text-amber-600">{{ testimonial.rating }}</span>
            </div>
            <h3 class="text-lg font-semibold">{{ testimonial.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ testimonial.role }}</p>
            <p class="text-gray-700">"{{ testimonial.content }}"</p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative bg-black text-white overflow-hidden">
      <!-- Banner de fondo -->
      <div class="absolute inset-0">
        <img 
          src="/banner.jpg" 
          alt="Banner RM Escuela Creativa" 
          class="w-full h-full object-cover opacity-50"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
      </div>
      
      <div class="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo Para Empezar?
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
            Únete a cientos de estudiantes que ya están transformando sus vidas. 
            Inscríbete ahora y obtén un descuento especial.
          </p>
          <div class="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <UButton 
              to="/cursos"
              size="xl"
              class="shadow-lg hover:scale-105 transition-transform"
            >
              Ver Cursos Disponibles
            </UButton>
            <UButton 
              to="/contacto"
              variant="outline"
              color="neutral"
              size="xl"
              trailing-icon="i-lucide-arrow-right"
            >
              Hablar con un Asesor
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
