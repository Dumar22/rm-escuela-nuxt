<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Editar Contacto</h1>
      <p class="text-gray-600">Modifica la información de contacto</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <UIcon name="i-lucide-mail" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-gray-900 mb-2">Próximamente</h3>
      <p class="text-gray-600">Esta sección estará disponible pronto</p>
    </div>
  </div>
</template>
