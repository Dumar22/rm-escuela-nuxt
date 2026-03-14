<script setup lang="ts">
const route = useRoute()
const { posts } = useBlog()

const normalizeCategory = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const categoriaActiva = computed(() => {
  const raw = typeof route.query.categoria === 'string' ? route.query.categoria : ''
  return normalizeCategory(raw)
})

const categorias = computed(() => {
  const unique = Array.from(new Set(posts.value.map(post => post.category)))
  return ['Todas', ...unique]
})

const postsFiltrados = computed(() => {
  if (!categoriaActiva.value) return posts.value
  return posts.value.filter(post => normalizeCategory(post.category) === categoriaActiva.value)
})

const categoriaLink = (categoria: string) => {
  if (categoria === 'Todas') return '/blog'
  return `/blog?categoria=${encodeURIComponent(categoria)}`
}

const categoriaSeleccionadaLabel = computed(() => {
  if (!categoriaActiva.value) return 'Todas'
  return categorias.value.find(c => normalizeCategory(c) === categoriaActiva.value) ?? 'Todas'
})

const isCategoriaActiva = (categoria: string) => {
  if (categoria === 'Todas') return !categoriaActiva.value
  return normalizeCategory(categoria) === categoriaActiva.value
}

useSeoMeta({
  title: 'Blog y Novedades – RM Escuela Creativa',
  description: 'Entérate de las últimas tendencias, consejos y noticias sobre el mundo del diseño, la moda y el emprendimiento.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 pb-24">
    <!-- Hero banner blog -->
    <section class="relative bg-gray-950 text-white overflow-hidden h-[220px] sm:h-[260px] lg:h-[300px]">
      <div
        class="absolute inset-0 bg-center bg-cover"
        style="background-image: url('/images/banners/banner-blog.jpg');"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/50 to-gray-950/82"
        style="pointer-events:none;"
      />
      <div class="relative h-full mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-end pb-7 sm:pb-9 lg:pb-10 text-center">
        <h1 class="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F4EFE8]" style="text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);">
          Nuestro Blog
        </h1>
      </div>
    </section>

    <!-- Subcategorías del blog -->
    <section class="mx-auto max-w-7xl px-6 lg:px-8 mt-8 sm:mt-10">
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div class="flex items-center justify-between gap-4 mb-4">
          <h2 class="text-sm sm:text-base font-bold uppercase tracking-wider text-gray-900">
            Secciones del blog
          </h2>
          <p class="text-xs sm:text-sm text-gray-500">
            {{ postsFiltrados.length }} {{ postsFiltrados.length === 1 ? 'noticia' : 'noticias' }}
          </p>
        </div>

        <div class="overflow-x-auto pb-1">
          <div class="flex items-center gap-2 min-w-max">
            <NuxtLink
              v-for="categoria in categorias"
              :key="categoria"
              :to="categoriaLink(categoria)"
              class="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
              :class="isCategoriaActiva(categoria)
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600'"
            >
              {{ categoria }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Grid de Artículos -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-12 sm:mt-16">
      <div v-if="postsFiltrados.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="post in postsFiltrados" 
          :key="post.id"
          class="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Imagen -->
          <NuxtLink :to="`/blog/${post.slug}`" class="block aspect-[3/4] overflow-hidden bg-gray-100 relative group">
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
            <NuxtImg
              :src="post.imageUrl"
              :alt="post.title"
              width="600"
              :modifiers="{ fit: 'inside' }"
              class="w-full h-full object-contain transition-transform duration-500"
              format="webp"
            />
          </NuxtLink>

          <!-- Contenido -->
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-3 text-xs mb-4">
              <span class="font-semibold text-orange-600 uppercase tracking-wider">{{ post.category }}</span>
              <span class="text-gray-300">•</span>
              <span class="text-gray-500">{{ post.readTime }}</span>
            </div>

            <NuxtLink :to="`/blog/${post.slug}`" class="block text-xl font-bold text-gray-900 leading-snug mb-3 hover:text-orange-500 transition-colors">
              {{ post.title }}
            </NuxtLink>
            
            <p class="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <div class="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                  {{ post.author.charAt(0) }}
                </div>
                <div class="text-xs">
                  <p class="font-semibold text-gray-900">{{ post.author }}</p>
                  <p class="text-gray-500">{{ post.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <h3 class="text-2xl font-display font-bold text-gray-900 mb-3">
          No hay noticias en esta sección
        </h3>
        <p class="text-gray-600 mb-6">
          Aún no hay artículos publicados en <strong>{{ categoriaSeleccionadaLabel }}</strong>.
        </p>
        <UButton to="/blog" color="primary" variant="solid">
          Ver todas las noticias
        </UButton>
      </div>
    </div>
  </div>
</template>
