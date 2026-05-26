<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const stats = [
  {
    label: 'Posts en Blog',
    value: '4',
    icon: 'i-lucide-newspaper',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    label: 'Cursos Activos',
    value: '13',
    icon: 'i-lucide-graduation-cap',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  {
    label: 'Usuarios',
    value: '0',
    icon: 'i-lucide-users',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    label: 'Solicitudes',
    value: '0',
    icon: 'i-lucide-mail',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  }
]

const quickLinks = [
  {
    title: 'Gestionar Blog',
    description: 'Crear, editar y eliminar artículos del blog',
    to: '/admin/blog',
    icon: 'i-lucide-newspaper',
    color: 'bg-blue-600'
  },
  {
    title: 'Gestionar Cursos',
    description: 'Administrar el catálogo de cursos',
    to: '/admin/cursos',
    icon: 'i-lucide-graduation-cap',
    color: 'bg-orange-600'
  },
  {
    title: 'Editar Nosotros',
    description: 'Actualizar información de la empresa',
    to: '/admin/nosotros',
    icon: 'i-lucide-info',
    color: 'bg-green-600'
  },
  {
    title: 'Editar Contacto',
    description: 'Modificar información de contacto',
    to: '/admin/contacto',
    icon: 'i-lucide-mail',
    color: 'bg-purple-600'
  }
]

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-gray-600">Bienvenido al panel administrativo de RM Escuela</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="[stat.bg, 'w-12 h-12 rounded-lg flex items-center justify-center']">
            <UIcon :name="stat.icon" :class="[stat.color, 'w-6 h-6']" />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900 mb-1">{{ stat.value }}</p>
        <p class="text-sm text-gray-600">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Accesos Rápidos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow group"
        >
          <div class="flex items-start gap-4">
            <div :class="[link.color, 'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0']">
              <UIcon :name="link.icon" class="w-6 h-6 text-white" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                {{ link.title }}
              </h3>
              <p class="text-sm text-gray-600">{{ link.description }}</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
      <div class="text-center py-8 text-gray-500">
        <UIcon name="i-lucide-activity" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No hay actividad reciente para mostrar</p>
      </div>
    </div>
  </div>
</template>
