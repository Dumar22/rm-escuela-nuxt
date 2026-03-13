<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const supabase = useSupabase()
const router = useRouter()

// Estado
const posts = ref<any[]>([])
const loading = ref(false)
const showDeleteModal = ref(false)
const postToDelete = ref<any>(null)

// Cargar posts
const loadPosts = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    posts.value = data || []
  } catch (error) {
    console.error('Error loading posts:', error)
  } finally {
    loading.value = false
  }
}

// Eliminar post
const confirmDelete = (post: any) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

const deletePost = async () => {
  if (!postToDelete.value) return
  
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postToDelete.value.id)
    
    if (error) throw error
    
    await loadPosts()
    showDeleteModal.value = false
    postToDelete.value = null
  } catch (error) {
    console.error('Error deleting post:', error)
    alert('Error al eliminar el post')
  }
}

// Cargar al montar
onMounted(() => {
  loadPosts()
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestión del Blog</h1>
        <p class="text-gray-600">Administra los artículos de tu blog</p>
      </div>
      <UButton
        to="/admin/blog/nuevo"
        color="primary"
        size="lg"
        icon="i-lucide-plus"
      >
        Nuevo Post
      </UButton>
    </div>

    <!-- Lista de posts -->
    <div v-if="loading" class="text-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-orange-600 mx-auto" />
      <p class="text-gray-600 mt-3">Cargando posts...</p>
    </div>

    <div v-else-if="posts.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <UIcon name="i-lucide-file-text" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-gray-900 mb-2">No hay posts aún</h3>
      <p class="text-gray-600 mb-6">Comienza creando tu primer artículo</p>
      <UButton
        to="/admin/blog/nuevo"
        color="primary"
        icon="i-lucide-plus"
      >
        Crear Primer Post
      </UButton>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Título
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Categoría
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Autor
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Fecha
            </th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  v-if="post.image_url"
                  :src="post.image_url"
                  :alt="post.title"
                  class="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p class="font-semibold text-gray-900">{{ post.title }}</p>
                  <p class="text-sm text-gray-500">{{ post.slug }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                {{ post.category }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ post.author }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ new Date(post.date).toLocaleDateString('es-ES') }}
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <UButton
                  :to="`/admin/blog/${post.id}`"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-pencil"
                  size="sm"
                >
                  Editar
                </UButton>
                <UButton
                  @click="confirmDelete(post)"
                  color="error"
                  variant="ghost"
                  icon="i-lucide-trash-2"
                  size="sm"
                >
                  Eliminar
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <UModal v-model="showDeleteModal">
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Confirmar eliminación</h3>
        <p class="text-gray-600 mb-6">
          ¿Estás seguro de que deseas eliminar el post "<strong>{{ postToDelete?.title }}</strong>"?
          Esta acción no se puede deshacer.
        </p>
        <div class="flex justify-end gap-3">
          <UButton
            @click="showDeleteModal = false"
            color="neutral"
            variant="ghost"
          >
            Cancelar
          </UButton>
          <UButton
            @click="deletePost"
            color="error"
          >
            Eliminar
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
