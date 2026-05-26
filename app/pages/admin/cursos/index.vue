<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const { cursos, loading, fetchCursos, getCursoById, importStaticCourses } = useCursos()
const router = useRouter()

const cursoToDelete = ref<any>(null)
const showDeleteModal = ref(false)
const deleting = ref(false)
const importing = ref(false)

const loadCursos = async () => {
  await fetchCursos()
}

const handleImport = async () => {
  importing.value = true
  try {
    await importStaticCourses()
    alert('Cursos importados correctamente')
  } catch (error: any) {
    alert('Error al importar: ' + (error.message || 'Error desconocido'))
  } finally {
    importing.value = false
  }
}

const confirmDelete = (curso: any) => {
  cursoToDelete.value = curso
  showDeleteModal.value = true
}

const deleteCurso = async () => {
  if (!cursoToDelete.value) return

  deleting.value = true
  try {
    await $fetch(`/api/courses/${cursoToDelete.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    cursoToDelete.value = null
    await loadCursos()
    alert('Curso eliminado correctamente')
  } catch (error: any) {
    console.error('Error deleting course:', error)
    alert('Error al eliminar el curso: ' + (error.message || 'Error desconocido'))
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  loadCursos()
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestión de Cursos</h1>
        <p class="text-gray-600">Administra el catálogo de cursos</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton
          @click="handleImport"
          color="neutral"
          variant="outline"
          icon="i-lucide-database"
          :loading="importing"
        >
          Importar cursos base
        </UButton>
        <UButton
          to="/admin/cursos/nuevo"
          color="primary"
          icon="i-lucide-plus"
        >
          Nuevo curso
        </UButton>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-orange-600 mx-auto" />
      <p class="text-gray-600 mt-3">Cargando cursos...</p>
    </div>

    <div v-else-if="cursos.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <UIcon name="i-lucide-graduation-cap" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-gray-900 mb-2">No hay cursos en Supabase</h3>
      <p class="text-gray-600 mb-6">Importa los cursos actuales o crea uno nuevo</p>
      <div class="flex items-center justify-center gap-3">
        <UButton
          @click="handleImport"
          color="neutral"
          variant="outline"
          icon="i-lucide-database"
          :loading="importing"
        >
          Importar cursos base
        </UButton>
        <UButton to="/admin/cursos/nuevo" color="primary" icon="i-lucide-plus">
          Crear curso
        </UButton>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Curso</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Modalidad</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Precio</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Orden</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="curso in cursos" :key="curso.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img :src="curso.image" :alt="curso.title" class="w-12 h-12 rounded object-cover" />
                <div>
                  <p class="font-semibold text-gray-900">{{ curso.title }}</p>
                  <p class="text-sm text-gray-500">{{ curso.slug }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ curso.category }}</td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ curso.modality }}</td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ curso.currency }} {{ curso.price }}</td>
            <td class="px-6 py-4 text-sm text-gray-700">{{ curso.display_order }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <UButton :to="`/admin/cursos/${curso.id}`" color="neutral" variant="ghost" size="sm" icon="i-lucide-pencil">
                  Editar
                </UButton>
                <UButton @click="confirmDelete(curso)" color="error" variant="ghost" size="sm" icon="i-lucide-trash-2">
                  Eliminar
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UModal v-model="showDeleteModal">
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Confirmar eliminación</h3>
        <p class="text-gray-600 mb-6">
          ¿Seguro que deseas eliminar el curso "<strong>{{ cursoToDelete?.title }}</strong>"?
        </p>
        <div class="flex justify-end gap-3">
          <UButton @click="showDeleteModal = false" color="neutral" variant="ghost">Cancelar</UButton>
          <UButton @click="deleteCurso" color="error">Eliminar</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
