<script setup lang="ts">
const { posts } = useBlog()

useSeoMeta({
  title: 'Blog y Novedades – RM Escuela Creativa',
  description: 'Entérate de las últimas tendencias, consejos y noticias sobre el mundo del diseño, la moda y el emprendimiento.'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 pb-24">
    <!-- Header -->
    <div class="bg-white border-b border-gray-100 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl font-display font-black uppercase leading-tight tracking-tight text-gray-950 mb-4">
          Nuestro Blog
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Noticias, tendencias y recursos educativos preparados por los expertos de RM Escuela Creativa para potenciar tu talento.
        </p>
      </div>
    </div>

    <!-- Grid de Artículos -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-12 sm:mt-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="post in posts" 
          :key="post.id"
          class="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Imagen -->
          <NuxtLink :to="`/blog/${post.slug}`" class="block aspect-[4/3] overflow-hidden bg-gray-100 relative group">
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
            <NuxtImg
              :src="post.imageUrl"
              :alt="post.title"
              width="600"
              height="450"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
    </div>
  </div>
</template>
