<script setup lang="ts">
const route = useRoute()
const { getPost } = useBlog()

const post = computed(() => getPost(route.params.slug as string))

// Un parser MUY básico para el contenido mockeado (convierte párrafos simples y ### al HTML).
// Nota: Cuando usemos un CMS real, esto no será necesario.
const formattedContent = computed(() => {
  if (!post.value) return ''
  
  let html = post.value.content
  // Convertir ### Titulos
  html = html.replace(/### (.*?)\n/g, '<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
  // Convertir negritas **texto**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Convertir italicas *texto*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // Convertir párrafos
  html = html.split('\n\n').map(p => {
    const trimmed = p.trim()
    if (!trimmed || trimmed.startsWith('<h3')) return trimmed
    return `<p class="mb-4 text-gray-700 leading-relaxed text-lg">${trimmed}</p>`
  }).join('')

  return html
})

useSeoMeta({
  title: () => post.value ? `${post.value.title} – Blog RM Escuela` : 'Artículo no encontrado',
  description: () => post.value?.excerpt || ''
})
</script>

<template>
  <div class="min-h-[80vh] bg-white pb-24">
    <template v-if="post">
      
      <!-- Back Link -->
      <div class="mx-auto max-w-4xl px-6 lg:px-8 mt-8 mb-4">
        <NuxtLink to="/blog" class="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al blog
        </NuxtLink>
      </div>

      <!-- Article Header -->
      <header class="mx-auto max-w-4xl px-6 lg:px-8 mb-10 mt-6">
        <div class="flex items-center gap-3 text-sm mb-4">
          <span class="font-bold text-orange-500 uppercase tracking-widest">{{ post.category }}</span>
          <span class="text-gray-300">•</span>
          <span class="text-gray-500">{{ post.readTime }}</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase leading-tight tracking-tight text-gray-950 mb-8">
          {{ post.title }}
        </h1>

        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-bold uppercase">
            {{ post.author.charAt(0) }}
          </div>
          <div>
            <p class="font-bold text-gray-900">{{ post.author }}</p>
            <p class="text-sm text-gray-500">{{ post.authorRole }} — Publicado el {{ post.date }}</p>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="mx-auto max-w-5xl px-6 lg:px-8 mb-12">
        <div class="w-full rounded-2xl overflow-hidden shadow-sm bg-gray-100 aspect-video lg:aspect-[21/9]">
          <NuxtImg
            :src="post.imageUrl"
            :alt="post.title"
            width="1200"
            height="600"
            format="webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Article Content -->
      <article class="mx-auto max-w-3xl px-6 lg:px-8">
        <!-- Excerpt as intro -->
        <p class="text-xl sm:text-2xl text-gray-600 font-light leading-relaxed mb-10 pb-8 border-b border-gray-100">
          {{ post.excerpt }}
        </p>

        <!-- Dynamic Content -->
        <div class="prose max-w-none text-gray-800" v-html="formattedContent"></div>
        
        <!-- Tags or footer of article -->
        <div class="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
          <span class="text-sm text-gray-500 uppercase tracking-widest font-bold">Compartir artículo</span>
          <div class="flex gap-2">
            <UButton color="neutral" variant="ghost" icon="i-simple-icons-facebook" />
            <UButton color="neutral" variant="ghost" icon="i-simple-icons-linkedin" />
            <UButton color="neutral" variant="ghost" icon="i-simple-icons-whatsapp" />
          </div>
        </div>
      </article>

    </template>

    <template v-else>
      <div class="text-center py-32 px-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-3">Artículo no encontrado</h1>
        <p class="text-gray-600 mb-8">El artículo que buscas no existe o fue removido.</p>
        <UButton to="/blog" color="primary" size="lg">Ver todos los artículos</UButton>
      </div>
    </template>
  </div>
</template>
