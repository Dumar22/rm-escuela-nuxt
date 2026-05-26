<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const { posts, loading, fetchPosts, seedPostsToApi } = useBlog()

const showDeleteModal = ref(false)
const postToDelete = ref<any>(null)
const deleting = ref(false)

const loadPosts = async () => {
  await fetchPosts()
}

const handleSync = async () => {
  loading.value = true
  try {
    await seedPostsToApi()
    await fetchPosts()
    alert('Posts sincronizados correctamente')
  } catch (error: any) {
    console.error('Error syncing posts:', error)
    alert('Error al sincronizar posts: ' + (error.message || 'Error desconocido'))
  } finally {
    loading.value = false
  }
}

const confirmDelete = (post: any) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

const deletePost = async () => {
  if (!postToDelete.value) return

  deleting.value = true
  try {
    await $fetch(`/api/blog/${postToDelete.value.id}`, { method: 'DELETE' })
    await loadPosts()
    showDeleteModal.value = false
    postToDelete.value = null
    alert('Post eliminado correctamente')
  } catch (error: any) {
    console.error('Error deleting post:', error)
    alert('Error al eliminar el post: ' + (error.message || 'Error desconocido'))
  } finally {
    deleting.value = false
  }
}

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
        @click="handleSync"
        color="neutral"
        variant="outline"
        icon="i-lucide-database"
      >
        Sincronizar posts
      </UButton>
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
