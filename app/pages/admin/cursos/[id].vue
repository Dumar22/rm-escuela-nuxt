<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()

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

const categoryColorOptions = [
  { label: 'Naranja', value: '#ea580c' },
  { label: 'Rojo', value: '#dc2626' },
  { label: 'Verde', value: '#16a34a' },
  { label: 'Azul', value: '#2563eb' },
  { label: 'Morado', value: '#7c3aed' },
  { label: 'Rosa', value: '#db2777' },
  { label: 'Ámbar', value: '#d97706' },
  { label: 'Gris', value: '#4b5563' }
]

const detailImages = computed(() => [form.detail_image_1, form.detail_image_2].filter(Boolean))

const selectedCategoryColor = computed(() => {
  return categoryColorOptions.find(option => option.value === form.category_color) || categoryColorOptions[0]
})

const previewStats = computed(() => [
  { label: 'Duración', value: form.duration || 'Pendiente' },
  { label: 'Modalidad', value: form.modality || 'Pendiente' },
  { label: 'Nivel', value: form.level || 'Pendiente' }
])

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
    const data = await $fetch(`/api/courses/${cursoId.value}`)
    if (data && data.data) {
      Object.assign(form, {
        ...data.data,
        detail_image_1: data.data.detail_images?.[0] || '',
        detail_image_2: data.data.detail_images?.[1] || ''
      })
    }
  } catch (error) {
    console.error('Error loading course:', error)
    alert('Error al cargar el curso')
    router.push('/admin/cursos')
  } finally {
    loading.value = false
  }
}

const saveCurso = async () => {
  saving.value = true

  try {
    const detailImages = [form.detail_image_1, form.detail_image_2].filter(Boolean)

    const payload = {
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
      display_order: Number(form.display_order)
    }

    if (isEdit.value) {
      await $fetch(`/api/courses/${cursoId.value}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch('/api/courses', {
        method: 'POST',
        body: payload
      })
    }

    router.push('/admin/cursos')
  } catch (error: any) {
    console.error('Error saving course:', error)
    alert('Error al guardar el curso: ' + (error.message || 'Error desconocido'))
  } finally {
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
  <div class="relative">
    <div class="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-br from-orange-100 via-white to-amber-50 blur-3xl opacity-90"></div>

    <div class="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-2xl">
        <UButton to="/admin/cursos" color="neutral" variant="ghost" icon="i-lucide-arrow-left" class="mb-4 px-0">
          Volver al catálogo
        </UButton>
        <div class="flex flex-wrap items-center gap-3 mb-3">
          <UBadge color="orange" variant="soft" size="md">
            {{ isEdit ? 'Editar curso' : 'Nuevo curso' }}
          </UBadge>
          <span class="text-sm text-gray-500">Carga la información principal y deja listo el curso para publicar.</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 mb-3">
          {{ isEdit ? 'Ajusta la ficha del curso' : 'Crea un curso que se vea premium' }}
        </h1>
        <p class="text-base md:text-lg text-gray-600 leading-relaxed">
          Este formulario está pensado para edición seria: jerarquía clara, vista previa lateral y bloques agrupados para que no se sienta pesado.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 min-w-[280px]">
        <UCard class="border border-orange-200 bg-white/80 backdrop-blur shadow-sm">
          <div class="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Estado</div>
          <div class="text-sm font-semibold text-gray-900">{{ isEdit ? 'Edición activa' : 'Borrador nuevo' }}</div>
        </UCard>
        <UCard class="border border-gray-200 bg-white/80 backdrop-blur shadow-sm">
          <div class="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Imágenes</div>
          <div class="text-sm font-semibold text-gray-900">{{ detailImages.length + 1 }} cargadas</div>
        </UCard>
      </div>
    </div>

    <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
      <div class="text-center">
        <UIcon name="i-lucide-loader-2" class="w-10 h-10 animate-spin text-orange-600 mx-auto" />
        <p class="text-gray-600 mt-4">Cargando curso...</p>
      </div>
    </div>

    <form v-else @submit.prevent="saveCurso" class="mx-auto grid max-w-7xl grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
      <div class="space-y-6">
        <UCard class="overflow-hidden border-0 shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-white/90 backdrop-blur">
          <template #header>
            <div class="flex items-center justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-gray-950">Esenciales</h2>
                <p class="text-sm text-gray-500">Nombre, slug y resumen de venta.</p>
              </div>
              <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-orange-500" />
            </div>
          </template>

          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <UFormField class="w-full" label="Título" name="title" required>
              <UInput v-model="form.title" class="w-full" size="lg" required placeholder="Fotografía de Moda" />
            </UFormField>

            <UFormField class="w-full" label="Slug" name="slug" required>
              <UInput v-model="form.slug" class="w-full" size="lg" required placeholder="fotografia-de-moda" />
            </UFormField>
          </div>

          <div class="mt-5">
            <UFormField class="w-full" label="Subtítulo" name="subtitle" required>
              <UInput v-model="form.subtitle" class="w-full" size="lg" required placeholder="Aprende dirección creativa, técnica y criterio visual" />
            </UFormField>
          </div>

          <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]">
            <UFormField class="w-full" label="Descripción corta" name="short_desc" required>
              <UTextarea v-model="form.short_desc" class="w-full" :rows="4" size="lg" required placeholder="Texto breve para tarjetas y listados" />
            </UFormField>

            <div class="rounded-2xl border border-dashed border-orange-200 bg-orange-50/60 p-4 text-sm text-gray-700 self-start">
              <p class="font-semibold text-gray-950 mb-2">Consejo visual</p>
              <p class="leading-relaxed">
                La descripción corta debe sonar como una portada: clara, aspiracional y fácil de escanear en catálogo.
              </p>
            </div>
          </div>
        </UCard>

        <UCard class="border-0 shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-white/90 backdrop-blur">
          <template #header>
            <div>
              <h2 class="text-lg font-semibold text-gray-950">Contenido principal</h2>
              <p class="text-sm text-gray-500">La descripción larga para la ficha pública.</p>
            </div>
          </template>

          <UFormField class="w-full" label="Descripción completa" name="description" required>
            <UTextarea v-model="form.description" class="w-full" :rows="12" size="lg" required placeholder="Describe el valor del curso, metodología y resultados esperados" />
          </UFormField>
        </UCard>

        <UCard class="border-0 shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-white/90 backdrop-blur">
          <template #header>
            <div>
              <h2 class="text-lg font-semibold text-gray-950">Oferta y publicación</h2>
              <p class="text-sm text-gray-500">Datos para categoría, precio y orden en catálogo.</p>
            </div>
          </template>

          <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
            <UFormField class="w-full" label="Categoría" name="category" required>
              <UInput v-model="form.category" class="w-full" size="lg" required placeholder="Moda" />
            </UFormField>

            <UFormField class="md:col-span-2 w-full" label="Color categoría" name="category_color" required>
              <div class="rounded-2xl border border-gray-200 bg-white p-4">
                <div class="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p class="text-sm font-semibold text-gray-900">Elige un color</p>
                    <p class="text-xs text-gray-500">No hace falta escribir hexadecimal.</p>
                  </div>
                  <div class="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                    <span class="h-3 w-3 rounded-full ring-2 ring-white" :style="{ backgroundColor: form.category_color }"></span>
                    <span class="text-sm font-medium text-gray-700">{{ selectedCategoryColor.label }}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    v-for="option in categoryColorOptions"
                    :key="option.value"
                    type="button"
                    class="group rounded-2xl border px-3 py-3 text-left transition-all duration-200"
                    :class="form.category_color === option.value ? 'border-gray-950 shadow-sm ring-2 ring-gray-950/10' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'"
                    @click="form.category_color = option.value"
                  >
                    <div class="flex items-center gap-3">
                      <span class="h-10 w-10 rounded-xl shadow-inner ring-1 ring-black/10" :style="{ backgroundColor: option.value }"></span>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ option.label }}</div>
                        <div class="text-xs text-gray-500">{{ option.value }}</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </UFormField>

            <UFormField class="w-full" label="Duración" name="duration" required>
              <UInput v-model="form.duration" class="w-full" size="lg" required placeholder="8 semanas" />
            </UFormField>
          </div>

          <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <UFormField class="w-full" label="Modalidad" name="modality" required>
              <USelect
                v-model="form.modality"
                class="w-full"
                :items="[
                  { label: 'Virtual y Presencial', value: 'Virtual y Presencial' },
                  { label: 'Virtual', value: 'Virtual' },
                  { label: 'Híbrido', value: 'Híbrido' }
                ]"
                size="lg"
                required
              />
            </UFormField>

            <UFormField class="w-full" label="Nivel" name="level" required>
              <UInput v-model="form.level" class="w-full" size="lg" required placeholder="Básico / Intermedio / Avanzado" />
            </UFormField>

            <UFormField class="w-full" label="Orden" name="display_order" required>
              <UInput v-model="form.display_order" class="w-full" type="number" size="lg" required />
            </UFormField>
          </div>

          <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 items-end">
            <UFormField class="w-full" label="Precio" name="price" required>
              <UInput v-model="form.price" class="w-full" size="lg" required placeholder="650000" />
            </UFormField>

            <UFormField class="w-full" label="Moneda" name="currency" required>
              <UInput v-model="form.currency" class="w-full" size="lg" required placeholder="COP" />
            </UFormField>

            <UFormField class="w-full" label="Destacado" name="featured">
              <div class="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <UCheckbox v-model="form.featured" label="Mostrar como destacado" />
              </div>
            </UFormField>
          </div>
        </UCard>

        <UCard class="border-0 shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-white/90 backdrop-blur">
          <template #header>
            <div>
              <h2 class="text-lg font-semibold text-gray-950">Imágenes</h2>
              <p class="text-sm text-gray-500">Carga la portada y dos apoyos visuales.</p>
            </div>
          </template>

          <div class="space-y-5">
            <UFormField class="w-full" label="Imagen principal" name="image" required>
              <UInput v-model="form.image" class="w-full" size="lg" required placeholder="/images/cursos/foto-principal.jpg" />
            </UFormField>

            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <UFormField class="w-full" label="Detalle curso" name="detail_image_1">
                <UInput v-model="form.detail_image_1" class="w-full" size="lg" placeholder="/images/cursos/detalle-1.jpg" />
              </UFormField>

              <UFormField class="w-full" label="Pensum" name="detail_image_2">
                <UInput v-model="form.detail_image_2" class="w-full" size="lg" placeholder="/pensums/pensum-curso.pdf" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pb-4">
          <UButton to="/admin/cursos" color="neutral" variant="ghost" size="lg">Cancelar</UButton>
          <UButton
            type="submit"
            color="primary"
            size="lg"
            :loading="saving"
            :disabled="!form.title || !form.slug || !form.description"
            icon="i-lucide-check"
          >
            {{ isEdit ? 'Actualizar curso' : 'Crear curso' }}
          </UButton>
        </div>
      </div>

      <aside class="xl:sticky xl:top-6 h-fit space-y-6">
        <UCard class="overflow-hidden border-0 shadow-[0_20px_50px_rgba(15,23,42,0.08)] bg-slate-950 text-white">
          <div class="relative h-48 overflow-hidden">
            <img
              :src="form.image || '/images/banners/banner-1.jpg'"
              :alt="form.title || 'Vista previa del curso'"
              class="h-full w-full object-cover opacity-85"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <div class="text-xs uppercase tracking-[0.25em] text-white/70">Vista previa</div>
                <div class="text-lg font-semibold leading-tight">{{ form.title || 'Título del curso' }}</div>
              </div>
              <div
                class="h-10 w-10 rounded-full border border-white/20 shadow-lg"
                :style="{ backgroundColor: form.category_color || '#ea580c' }"
              ></div>
            </div>
          </div>

          <div class="p-5 space-y-5">
            <div class="flex flex-wrap gap-2">
              <UBadge v-if="form.category" color="white" variant="soft">{{ form.category }}</UBadge>
              <UBadge v-if="form.featured" color="orange" variant="solid">Destacado</UBadge>
            </div>

            <p class="text-sm leading-relaxed text-white/80">
              {{ form.subtitle || 'Escribe un subtítulo corto y potente para vender el curso.' }}
            </p>

            <div class="grid grid-cols-3 gap-2 text-center">
              <div v-for="item in previewStats" :key="item.label" class="rounded-2xl bg-white/5 p-3">
                <div class="text-[11px] uppercase tracking-[0.18em] text-white/50">{{ item.label }}</div>
                <div class="mt-1 text-sm font-semibold text-white">{{ item.value }}</div>
              </div>
            </div>

            <div class="rounded-2xl bg-white/5 p-4">
              <div class="flex items-center justify-between text-sm text-white/80">
                <span>Precio</span>
                <span class="font-semibold text-white">{{ form.currency || 'COP' }} {{ form.price || '0' }}</span>
              </div>
              <div class="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div class="h-full w-3/4 rounded-full bg-gradient-to-r from-orange-400 to-amber-300"></div>
              </div>
            </div>
          </div>
        </UCard>

        <UCard class="border border-gray-200 bg-white/90 backdrop-blur">
          <template #header>
            <div>
              <h3 class="text-base font-semibold text-gray-950">Checklist rápido</h3>
              <p class="text-sm text-gray-500">Antes de guardar, revisa esto.</p>
            </div>
          </template>

          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-circle-check-big" class="mt-0.5 w-5 h-5 text-emerald-500" />
              <span>El título debe ser corto y claro.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-circle-check-big" class="mt-0.5 w-5 h-5 text-emerald-500" />
              <span>El slug debe quedar limpio para la URL pública.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-circle-check-big" class="mt-0.5 w-5 h-5 text-emerald-500" />
              <span>La imagen principal se usa en el catálogo.</span>
            </li>
            <li class="flex items-start gap-3">
              <UIcon name="i-lucide-circle-check-big" class="mt-0.5 w-5 h-5 text-emerald-500" />
              <span>Las imágenes detalle alimentan la ficha extendida.</span>
            </li>
          </ul>
        </UCard>
      </aside>
    </form>
  </div>
</template>
