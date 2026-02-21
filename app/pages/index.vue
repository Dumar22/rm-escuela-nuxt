<script setup lang="ts">
// Datos de cursos destacados
const featuredCourses = [
  {
    id: 1,
    title: 'Fotografía de Moda',
    category: 'Fotografía',
    duration: '3 meses',
    students: 120,
    rating: 4.8,
    price: '450.000',
    description: 'Aprende las técnicas profesionales de fotografía de moda y editorial'
  },
  {
    id: 2,
    title: 'Visual Merchandising',
    category: 'Marketing',
    duration: '2 meses',
    students: 95,
    rating: 4.9,
    price: '380.000',
    description: 'Domina el arte de presentar productos y crear experiencias visuales'
  },
  {
    id: 3,
    title: 'Modelo Profesional',
    category: 'Moda',
    duration: '4 meses',
    students: 150,
    rating: 4.7,
    price: '520.000',
    description: 'Conviértete en modelo profesional con técnicas de pasarela y editorial'
  }
]

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
    rating: 5
  },
  {
    name: 'Laura Pérez',
    role: 'Estudiante de Modelo Profesional',
    content: 'Superó todas mis expectativas. Me siento preparada para enfrentar el mundo profesional.',
    rating: 5
  }
]

useSeoMeta({
  title: 'RM Escuela Creativa de Artes y Moda',
  description: 'Descubre tu talento creativo con nuestros cursos profesionales de moda, arte, fotografía y más. Formación de calidad en Medellín, Colombia.'
})
</script>

<template>
  <div >
    <!-- Hero Section - Banner RM Modelos -->
    <section class="relative bg-blue overflow-hidden min-h-[500px] md:min-h-[550px] lg:min-h-[600px] m-0 p-0">
      <!-- Burbujas decorativas - lado derecho en escalera vertical -->
      <!-- Primera burbuja - tamaño completo -->
      <div class="hidden md:block absolute top-[20px] w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full bg-orange-500/40"
           style="right: -60px;" />
      <!-- Segunda burbuja - tamaño intermedio (top = 20 + altura primera) -->
      <div class="hidden md:block absolute top-[180px] md:top-[212px] lg:top-[244px] xl:top-[276px] w-[120px] h-[120px] md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-full bg-orange-500/40"
           style="right: -80px;" />
      <!-- Tercera burbuja - tamaño mitad (top = segunda.top + altura segunda) -->
      <div class="hidden md:block absolute top-[300px] md:top-[356px] lg:top-[420px] xl:top-[468px] w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full bg-orange-500/40"
           style="right: -100px;" />

      <div class="relative mx-auto max-w-7xl h-full px-0">
        <div class="grid grid-cols-1 md:grid-cols-3 h-full min-h-[500px] md:min-h-[550px] lg:min-h-[600px]">
          <!-- Lado izquierdo - Silueta -->
          <div class="relative order-2 md:order-1 flex items-end justify-start">
            <div class="relative w-[260px] h-[300px] sm:w-[280px] sm:h-[340px] md:w-[320px] md:h-[420px] lg:w-[420px] lg:h-[540px] xl:w-[480px] xl:h-[600px]" style="margin-left: -80px;">
              <img 
                src="/silueta.png" 
                alt="RM Modelos - Escuela Creativa" 
                class="object-contain object-left-bottom w-full h-full"
              />
            </div>
          </div>
          
          <!-- Centro - Texto branding -->
          <div class="relative order-1 md:order-2 flex flex-col justify-center items-center md:items-start px-6 py-6 md:py-8 lg:py-0 z-10">
            <!-- RM Modelos -->
            <div class="mb-2">
              <div class="relative w-[150px] h-[65px] sm:w-[180px] sm:h-[80px] md:w-[200px] md:h-[90px] lg:w-[300px] lg:h-[130px] xl:w-[360px] xl:h-[160px]">
                <img 
                  src="/rm-texto.png" 
                  alt="RM" 
                  class="object-contain object-left w-full h-full"
                />
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-black tracking-wide -mt-1 md:-mt-2 lg:-mt-4">
                Modelos
              </h1>
            </div>
            
            <!-- Escuela Creativa de Artes & Moda -->
            <div class="mt-3 md:mt-4 w-fit">
              <h2 class="text-orange-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wider md:tracking-widest uppercase">
                Escuela Creativa de Artes & Moda
              </h2>
              <p class="text-gray-500 text-[10px] sm:text-xs md:text-sm mt-1 text-right">
                Modelo educativo Learning by Doing
              </p>
            </div>
          </div>
          
          <!-- Lado derecho - Burbujas (columna vacía para equilibrar el layout) -->
          <div class="hidden md:block relative order-3">
            <!-- Esta columna crea el espacio visual para las burbujas que están position absolute -->
          </div>
        </div>
      </div>
      
      <!-- Línea naranja inferior -->
      <div class="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
    </section>

    <!-- Features Section -->
    <section class="py-24 sm:py-32 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            ¿Por Qué Elegir RM Escuela Creativa?
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Más de 10 años formando profesionales creativos
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-7xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <UCard 
              v-for="feature in features" 
              :key="feature.title"
              class="text-center"
            >
              <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <UIcon :name="feature.icon" class="h-8 w-8 text-orange-500" />
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </UCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-16">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cursos Destacados
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Los más populares entre nuestros estudiantes
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <UCard 
            v-for="course in featuredCourses" 
            :key="course.id"
            class="overflow-hidden group hover:shadow-xl transition-all"
          >
            <!-- Image placeholder -->
            <template #header>
              <div class="h-48 bg-gradient-to-br from-orange-100 to-slate-100 flex items-center justify-center -m-4 mb-0">
                <span class="text-6xl opacity-20">📸</span>
              </div>
            </template>

            <div class="flex items-center justify-between mb-2">
              <UBadge color="primary" variant="subtle">{{ course.category }}</UBadge>
              <div class="flex items-center gap-1 text-amber-500">
                <UIcon name="i-lucide-star" class="h-4 w-4 fill-current" />
                <span class="text-sm font-semibold">{{ course.rating }}</span>
              </div>
            </div>
            <h3 class="text-xl font-semibold group-hover:text-orange-500 transition-colors mb-2">
              {{ course.title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ course.description }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>⏱️ {{ course.duration }}</span>
              <span>👥 {{ course.students }} estudiantes</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-orange-500">
                ${{ course.price }}
              </span>
              <UButton :to="`/cursos/${course.id}`" size="sm">
                Ver Más
              </UButton>
            </div>
          </UCard>
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
    <section class="py-24 sm:py-32 bg-gradient-to-br from-gray-50 to-orange-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-16">
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Lo Que Dicen Nuestros Estudiantes
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            Historias de éxito de nuestra comunidad
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <UCard 
            v-for="testimonial in testimonials" 
            :key="testimonial.name"
            class="bg-white"
          >
            <div class="flex gap-0.5 mb-4">
              <UIcon 
                v-for="i in testimonial.rating" 
                :key="i"
                name="i-lucide-star" 
                class="h-5 w-5 fill-amber-500 text-amber-500" 
              />
            </div>
            <h3 class="text-lg font-semibold">{{ testimonial.name }}</h3>
            <p class="text-sm text-gray-500 mb-3">{{ testimonial.role }}</p>
            <p class="text-gray-600">"{{ testimonial.content }}"</p>
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
