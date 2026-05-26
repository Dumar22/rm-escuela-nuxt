<script setup lang="ts">
const values = [
  {
    icon: 'i-lucide-award',
    title: 'Excelencia',
    description: 'Nos comprometemos con la más alta calidad en educación creativa'
  },
  {
    icon: 'i-lucide-zap',
    title: 'Learning by Doing',
    description: 'Aprendemos creando: proyectos reales desde el primer día'
  },
  {
    icon: 'i-lucide-target',
    title: 'Vanguardia',
    description: 'Tendencias globales conectadas con el estilo propio de cada estudiante'
  },
  {
    icon: 'i-lucide-users',
    title: 'Comunidad',
    description: 'Una red creativa que trasciende fronteras y culturas'
  }
]

const stats = [
  { value: '22+', label: 'Años en el mercado' },
  { value: '25+', label: 'Programas formativos' },
  { value: '2000+', label: 'Estudiantes formados' },
  { value: '10+', label: 'Paises con Experiencia' },
]

useSeoMeta({
  title: 'Nosotros – RM Escuela Creativa de Artes & Moda',
  description: 'Con 22 años en el mercado colombiano, en RM Escuela Creativa formamos la nueva generación de talentos en moda, arte, emprendimiento y tendencias de mercados.'
})

useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/images/banners/banner-quienes-somos.jpg', fetchpriority: 'high' },
    { rel: 'preload', as: 'image', href: '/quienes-somos.jpg', fetchpriority: 'high' },
    { rel: 'preload', as: 'image', href: '/director.jpg', fetchpriority: 'high' }
  ]
})
</script>

<template>
  <div>

    <!-- Hero banner nosotros -->
    <section class="relative bg-gray-950 text-white overflow-hidden h-[220px] sm:h-[260px] lg:h-[300px]">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/images/banners/banner-quienes-somos.jpg');"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/50 to-gray-950/82"
        style="pointer-events:none;"
      />
      <div class="relative h-full mx-auto max-w-7xl px-4 lg:px-8 flex flex-col items-start justify-end pb-7 sm:pb-9 lg:pb-10 text-left">
       
        <h1 class="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F4EFE8]" style="text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);">
          Nosotros
        </h1>
        
      </div>
    </section>

    <!-- ── QUIÉNES SOMOS: imagen + texto ── -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <!-- Texto -->
          <div class="flex flex-col justify-center">
            <!-- Eyebrow badge -->
            <span class="inline-block self-start px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold uppercase tracking-widest mb-5">
              ¡SOMOS!
            </span>

            <h2 class="text-3xl sm:text-4xl font-display font-black uppercase leading-tight tracking-tight text-gray-950 mb-1">
              RM Modelos<br>
              <span class="text-orange-600">Escuela Creativa</span><br>
              de Artes y Moda
            </h2>

            <div class="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed mt-4">
              <p>
                Con <strong class="text-gray-900">22 años en el mercado colombiano</strong> y trayectoria en diversos países de América y Europa, somos una comunidad creativa y vanguardista dedicada a formar a la nueva generación de talentos en las industrias de la moda, el arte, el emprendimiento y las tendencias de mercados.
              </p>
              <p>
                Nuestra esencia se basa en el <strong class="text-gray-900">aprendizaje práctico</strong>: creemos que la mejor forma de aprender es haciendo (<em>learning by doing</em>). Por eso, cada uno de nuestros cursos, talleres, diplomados y workshops está diseñado para que nuestros estudiantes aprendan creando, experimentando y desarrollando proyectos reales desde el primer día y en el tiempo verdaderamente necesario.
              </p>
              <p>
                Nuestra metodología conecta la teoría con la acción, fomentando el pensamiento crítico, la innovación y el trabajo colaborativo. Nos inspiran las tendencias globales, pero también el estilo propio de cada estudiante, acompañándolos en el proceso de descubrir y potenciar su identidad creativa.
              </p>
            </div>

            <!-- CTA -->
            <div class="mt-8">
              <UButton
                to="/cursos"
                color="primary"
                size="lg"
                trailing-icon="i-lucide-arrow-right"
              >
                Explorar cursos
              </UButton>
            </div>
          </div>

          <!-- Imagen -->
          <div class="rounded-3xl overflow-hidden shadow-xl" style="aspect-ratio: 4/5;">
            <NuxtImg
              src="/quienes-somos.jpg"
              alt="RM Escuela Creativa – Quiénes Somos"
              width="800"
              height="1000"
              format="webp"
              quality="85"
              fetchpriority="high"
              loading="eager"
              preload
              class="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>

    <!-- ── DIRECTOR ── -->
    <section class="py-16 sm:py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <!-- Imagen — izquierda -->
          <div class="rounded-3xl overflow-hidden shadow-xl" style="aspect-ratio: 4/5;">
            <NuxtImg
              src="/director.jpg"
              alt="Ricardo Muñoz A. – Director RM Escuela Creativa"
              width="800"
              height="1000"
              format="webp"
              quality="85"
              fetchpriority="high"
              loading="eager"
              preload
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Texto — derecha -->
          <div class="flex flex-col justify-center">
            <span class="inline-block self-start px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold uppercase tracking-widest mb-5">
              Nuestro Director
            </span>

            <h2 class="text-3xl sm:text-4xl font-display font-black uppercase leading-tight tracking-tight text-gray-950 mb-1">
              Ricardo Muñoz A.
            </h2>
            <p class="text-orange-500 font-bold sm:text-lg uppercase tracking-wider mb-6">
              Fundador & Director General
            </p>

            <div class="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                Con más de <strong class="text-gray-900">25 años de experiencia</strong> en la ejecución de proyectos, logística, fotografía, moda, campo comercial, social, consultoría de coolhunting y visual merchandising, ha desarrollado un agudo sentido para detectar y anticipar tendencias de mercado.
              </p>
              <p>
                Sus habilidades clave incluyen la gestión estratégica de exhibiciones visuales y el análisis del comportamiento social y del consumidor. Motivado para aportar experiencia y creatividad a sus alumnos, aplicando uno de los mejores modelos de aprendizaje: <em>learning by doing</em> (aprender haciendo).
              </p>
              <p>
                Desde este enfoque, busca contribuir significativamente al desarrollo de nuevos profesionales en las áreas de moda, ejecución, investigación de tendencias y estrategias de mercado, así como en campañas para incrementar el impacto visual y comercial de la marca, producto o cliente.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ── CONECTA CON TU PASIÓN ── -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <!-- Texto — izquierda -->
          <div class="flex flex-col justify-center order-2 lg:order-1">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase leading-tight tracking-tight text-gray-950 mb-2">
              Fundación Internacional generación que!
            </h2>
            <p class="text-orange-500 font-bold sm:text-lg uppercase tracking-wider mb-6">
              En busca de una alternativa joven
            </p>

            <div class="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
              <p>
                Estamos enfocados en capacitar con conciencia y a la vanguardia de las tendencias de un nuevo mundo digital, con nuevas carreras que impactan en el desarrollo de una nueva generación que está en busca de nuevas alternativas que brinden el espacio para aprender y emprender.
              </p>
              <p>
                Al mismo tiempo, buscamos que disfruten del mundo y la vida con resiliencia, sueños, filantropía, cooperativismo y emprendimiento para un mundo mejor, apoyando siempre a quien no tiene las oportunidades económicas para realizar sus sueños profesionales.
              </p>

              <h3 class="text-gray-900 font-bold sm:text-lg uppercase tracking-wider mb-6">
              ¡Conecta con aquello que te apasiona!
            </h3>
            </div>
          </div>

          <!-- Imagen — derecha -->
          <div class="flex flex-col justify-center items-center order-1 lg:order-2 px-8 sm:px-0 w-full overflow-hidden">                          
            <h3 class="w-full max-w-[400px] text-center shrink-0 font-sans font-light uppercase text-gray-900 mb-0 relative z-10 text-[18px] sm:text-[23px] tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap">
              Fundación Internacional
            </h3>
            <NuxtImg
              src="/logo-que.png"
              alt="Impulsamos creatividad y talento"
              width="600"
              height="600"
              format="webp"
              quality="90"
              class="-mt-4 sm:-mt-6 w-full max-w-md h-auto object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>

    <!-- ── ESTADÍSTICAS ── -->
    <section class="bg-gray-950 py-16 sm:py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-4 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-5xl font-display font-black text-orange-500 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-300 text-sm font-medium uppercase tracking-wide">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── VALORES ── -->
    <section class="bg-gray-50 py-20 sm:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-14">
          <span class="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Nuestra esencia
          </span>
          <h2 class="text-3xl font-display font-bold tracking-tight text-gray-900 sm:text-4xl">
            Lo que nos define
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-700">
            Los pilares que guían cada clase, taller y proyecto
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="value in values"
            :key="value.title"
            class="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100/60 transition-all duration-300"
          >
            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
              <UIcon :name="value.icon" class="h-7 w-7 text-orange-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 class="text-lg font-display font-bold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{{ value.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA FINAL ── -->
    <section class="py-20 sm:py-28 bg-white">
      <div class="mx-auto max-w-3xl px-6 text-center">
        <h2 class="text-3xl font-display font-bold text-gray-900 sm:text-4xl mb-4">
          ¿Listo para desarrollar tu talento?
        </h2>
        <p class="text-lg text-gray-700 mb-8">
          Únete a miles de estudiantes que ya transformaron su pasión en una carrera profesional.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton to="/cursos" color="primary" size="xl" trailing-icon="i-lucide-arrow-right">
            Ver todos los cursos
          </UButton>
          <UButton to="/contacto" variant="outline" color="primary" size="xl">
            Contáctanos
          </UButton>
        </div>
      </div>
    </section>

  </div>
</template>
