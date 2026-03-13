<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabase()

const isEdit = computed(() => route.params.id !== 'nuevo')
const cursoId = computed(() => route.params.id)

const form = reactive({
  title: '',
  slug: '',
  subtitle: '',
  short_desc: '',
  description: '',
  category: '',
  category_color: '#ea580c',
  duration: '',
  modality: 'Virtual y Presencial',
  level: '',
  image: '',
  detail_image_1: '',
  detail_image_2: '',
  price: '',
  currency: 'COP',
  featured: false,
  display_order: 1
})

const loading = ref(false)
const saving = ref(false)

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

const loadCurso = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', cursoId.value)
      .single()

    if (error) throw error

    if (data) {
      Object.assign(form, {
        ...data,
        detail_image_1: data.detail_images?.[0] || '',
        detail_image_2: data.detail_images?.[1] || ''
      })
    }
  }
  catch (error) {
    console.error('Error loading course:', error)
    alert('Error al cargar el curso')
    router.push('/admin/cursos')
  }
  finally {
    loading.value = false
  }
}

const saveCurso = async () => {
  saving.value = true

  try {
    const detailImages = [form.detail_image_1, form.detail_image_2].filter(Boolean)

    const payload: any = {
      title: form.title,
      slug: form.slug,
      subtitle: form.subtitle,
      short_desc: form.short_desc,
      description: form.description,
      category: form.category,
      category_color: form.category_color,
      duration: form.duration,
      modality: form.modality,
      level: form.level,
      image: form.image,
      detail_images: detailImages,
      price: form.price,
      currency: form.currency,
      featured: form.featured,
      display_order: Number(form.display_order),
      updated_at: new Date().toISOString()
    }

    if (isEdit.value) {
      const { error } = await supabase
        .from('courses')
        .update(payload)
        .eq('id', cursoId.value)

      if (error) throw error
    }
    else {
      payload.created_at = new Date().toISOString()
      const { error } = await supabase
        .from('courses')
        .insert([payload])

      if (error) throw error
    }

    router.push('/admin/cursos')
  }
  catch (error) {
    console.error('Error saving course:', error)
    alert('Error al guardar el curso')
  }
  finally {
    saving.value = false
  }
}

onMounted(() => {
  loadCurso()
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-4">
        <UButton to="/admin/cursos" color="neutral" variant="ghost" icon="i-lucide-arrow-left">
          Volver
        </UButton>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        {{ isEdit ? 'Editar Curso' : 'Nuevo Curso' }}
      </h1>
      <p class="text-gray-600">{{ isEdit ? 'Actualiza la información del curso' : 'Crea un nuevo curso para el catálogo' }}</p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-orange-600 mx-auto" />
      <p class="text-gray-600 mt-3">Cargando curso...</p>
    </div>

    <form v-else @submit.prevent="saveCurso" class="max-w-6xl">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Título" name="title" required>
            <UInput v-model="form.title" size="lg" required />
          </UFormField>

          <UFormField label="Slug" name="slug" required>
            <UInput v-model="form.slug" size="lg" required />
          </UFormField>
        </div>

        <UFormField label="Subtítulo" name="subtitle" required>
          <UInput v-model="form.subtitle" size="lg" required />
        </UFormField>

        <UFormField label="Descripción corta" name="short_desc" required>
          <UTextarea v-model="form.short_desc" :rows="3" size="lg" required />
        </UFormField>

        <UFormField label="Descripción completa" name="description" required>
          <UTextarea v-model="form.description" :rows="10" size="lg" required />
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormField label="Categoría" name="category" required>
            <UInput v-model="form.category" size="lg" required />
          </UFormField>

          <UFormField label="Color categoría" name="category_color" required>
            <UInput v-model="form.category_color" size="lg" required />
          </UFormField>

          <UFormField label="Duración" name="duration" required>
            <UInput v-model="form.duration" size="lg" required />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormField label="Modalidad" name="modality" required>
            <USelect
              v-model="form.modality"
              :items="[
                { label: 'Virtual y Presencial', value: 'Virtual y Presencial' },
                { label: 'Virtual', value: 'Virtual' },
                { label: 'Híbrido', value: 'Híbrido' }
              ]"
              size="lg"
              required
            />
          </UFormField>

          <UFormField label="Nivel" name="level" required>
            <UInput v-model="form.level" size="lg" required />
          </UFormField>

          <UFormField label="Orden" name="display_order" required>
            <UInput v-model="form.display_order" type="number" size="lg" required />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormField label="Precio" name="price" required>
            <UInput v-model="form.price" size="lg" required />
          </UFormField>

          <UFormField label="Moneda" name="currency" required>
            <UInput v-model="form.currency" size="lg" required />
          </UFormField>

          <UFormField label="Destacado" name="featured">
            <div class="pt-2">
              <UCheckbox v-model="form.featured" label="Mostrar como destacado" />
            </div>
          </UFormField>
        </div>

        <UFormField label="Imagen principal" name="image" required>
          <UInput v-model="form.image" size="lg" required />
        </UFormField>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField label="Imagen detalle 1" name="detail_image_1">
            <UInput v-model="form.detail_image_1" size="lg" />
          </UFormField>

          <UFormField label="Imagen detalle 2" name="detail_image_2">
            <UInput v-model="form.detail_image_2" size="lg" />
          </UFormField>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-3">
        <UButton to="/admin/cursos" color="neutral" variant="ghost" size="lg">Cancelar</UButton>
        <UButton type="submit" color="primary" size="lg" :loading="saving" :disabled="!form.title || !form.slug || !form.description">
          {{ isEdit ? 'Actualizar curso' : 'Crear curso' }}
        </UButton>
      </div>
    </form>
  </div>
</template>
