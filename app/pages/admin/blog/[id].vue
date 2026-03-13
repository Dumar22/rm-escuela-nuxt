<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabase()

const isEdit = computed(() => route.params.id !== 'nuevo')
const postId = computed(() => route.params.id)

// Estado del formulario
const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: '',
  author_role: '',
  date: '',
  category: '',
  image_url: '',
  read_time: ''
})

const loading = ref(false)
const saving = ref(false)

// Genera slug automático desde el título
watch(() => form.title, (newTitle) => {
  if (!isEdit.value || !form.slug) {
    form.slug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
})

// Cargar post si es edición
const loadPost = async () => {
  if (!isEdit.value) return
  
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId.value)
      .single()
    
    if (error) throw error
    
    if (data) {
      Object.assign(form, data)
    }
  } catch (error) {
    console.error('Error loading post:', error)
    alert('Error al cargar el post')
    router.push('/admin/blog')
  } finally {
    loading.value = false
  }
}

// Guardar post
const savePost = async () => {
  saving.value = true
  
  try {
    const postData: any = {
      ...form,
      updated_at: new Date().toISOString()
    }

    if (isEdit.value) {
      // Actualizar post existente
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', postId.value)
      
      if (error) throw error
    } else {
      // Crear nuevo post
      postData.created_at = new Date().toISOString()
      
      const { error } = await supabase
        .from('blog_posts')
        .insert([postData])
      
      if (error) throw error
    }
    
    router.push('/admin/blog')
  } catch (error) {
    console.error('Error saving post:', error)
    alert('Error al guardar el post')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  if (isEdit.value) {
    loadPost()
  } else {
    // Valores por defecto para nuevo post
    form.author = 'RM Familia'
    form.author_role = 'Redacción'
    form.date = new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <UButton
          to="/admin/blog"
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
        >
          Volver
        </UButton>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        {{ isEdit ? 'Editar Post' : 'Nuevo Post' }}
      </h1>
      <p class="text-gray-600">
        {{ isEdit ? 'Actualiza la información del artículo' : 'Completa los campos para crear un nuevo artículo' }}
      </p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-orange-600 mx-auto" />
      <p class="text-gray-600 mt-3">Cargando post...</p>
    </div>

    <form v-else @submit.prevent="savePost" class="max-w-6xl">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-10 space-y-8">
        
        <!-- Título -->
        <UFormField label="Título" name="title" required>
          <UInput
            v-model="form.title"
            placeholder="Título del artículo"
            size="lg"
            required
          />
        </UFormField>

        <!-- Slug -->
        <UFormField label="Slug (URL)" name="slug" required>
          <UInput
            v-model="form.slug"
            placeholder="titulo-del-articulo"
            size="lg"
            required
          />
          <template #hint>
            <p class="text-xs text-gray-500">URL amigable: /blog/{{ form.slug || 'slug' }}</p>
          </template>
        </UFormField>

        <!-- Extracto -->
        <UFormField label="Extracto" name="excerpt" required>
          <UTextarea
            v-model="form.excerpt"
            placeholder="Breve descripción del artículo (máx. 160 caracteres)"
            :rows="3"
            size="lg"
            required
          />
        </UFormField>

        <!-- Contenido -->
        <UFormField label="Contenido" name="content" required>
          <UTextarea
            v-model="form.content"
            placeholder="Contenido completo del artículo (soporta Markdown básico: **negrita**, *cursiva*, ### Títulos)"
            :rows="18"
            size="lg"
            required
          />
          <template #hint>
            <p class="text-xs text-gray-500">
              Usa ### para títulos, **texto** para negritas, *texto* para cursivas
            </p>
          </template>
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Autor -->
          <UFormField label="Autor" name="author" required>
            <UInput
              v-model="form.author"
              placeholder="Nombre del autor"
              size="lg"
              required
            />
          </UFormField>

          <!-- Rol del autor -->
          <UFormField label="Rol del Autor" name="author_role">
            <UInput
              v-model="form.author_role"
              placeholder="Ej: Redacción, Director"
              size="lg"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Fecha -->
          <UFormField label="Fecha de Publicación" name="date" required>
            <UInput
              v-model="form.date"
              placeholder="3 de Marzo, 2026"
              size="lg"
              required
            />
          </UFormField>

          <!-- Tiempo de lectura -->
          <UFormField label="Tiempo de Lectura" name="read_time">
            <UInput
              v-model="form.read_time"
              placeholder="5 min de lectura"
              size="lg"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Categoría -->
          <UFormField label="Categoría" name="category" required>
            <USelect
              v-model="form.category"
              :items="[
                { label: 'Fotografía', value: 'Fotografía' },
                { label: 'Moda', value: 'Moda' },
                { label: 'Tendencias', value: 'Tendencias' },
                { label: 'Eventos', value: 'Eventos' },
                { label: 'Merchandising', value: 'Merchandising' },
                { label: 'Arte', value: 'Arte' },
                { label: 'Diseño', value: 'Diseño' }
              ]"
              placeholder="Selecciona una categoría"
              size="lg"
              required
            />
          </UFormField>

          <!-- URL de imagen -->
          <UFormField label="URL de Imagen" name="image_url" required>
            <UInput
              v-model="form.image_url"
              placeholder="/images/blog/mi-imagen.jpg"
              size="lg"
              required
            />
          </UFormField>
        </div>

        <!-- Preview de imagen -->
        <div v-if="form.image_url" class="border border-gray-200 rounded-lg p-5">
          <p class="text-sm font-medium text-gray-700 mb-2">Vista previa de imagen:</p>
          <img
            :src="form.image_url"
            :alt="form.title"
            class="w-full max-w-2xl h-64 object-cover rounded-lg"
          />
        </div>

      </div>

      <!-- Botones de acción -->
      <div class="mt-6 flex items-center justify-end gap-3">
        <UButton
          to="/admin/blog"
          color="neutral"
          variant="ghost"
          size="lg"
        >
          Cancelar
        </UButton>
        <UButton
          type="submit"
          color="primary"
          size="lg"
          :loading="saving"
          :disabled="!form.title || !form.slug || !form.content"
        >
          {{ isEdit ? 'Actualizar Post' : 'Publicar Post' }}
        </UButton>
      </div>
    </form>
  </div>
</template>
