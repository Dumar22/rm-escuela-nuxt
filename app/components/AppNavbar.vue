<script setup lang="ts">
const navigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Cursos', to: '/cursos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' }
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
      <!-- Logo -->
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="flex items-center">
          <img 
            src="/logo.png" 
            alt="RM Escuela Creativa de Artes y Moda" 
            width="180"
            height="60"
            class="h-14 w-auto max-w-[180px] object-contain"
          />
        </NuxtLink>
      </div>
      
      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <UButton
          variant="ghost"
          color="neutral"
          :icon="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Abrir menú"
        />
      </div>

      <!-- Desktop navigation - Centrado -->
      <div class="hidden lg:flex lg:items-center lg:justify-center lg:gap-x-10">
        <NuxtLink
          v-for="item in navigation"
          :key="item.label"
          :to="item.to"
          class="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500 transition-colors"
          active-class="text-orange-500"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- CTA Button -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <UButton 
          to="/cursos"
          color="primary"
          size="md"
        >
          Ver Cursos
        </UButton>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div 
      v-if="mobileMenuOpen"
      class="lg:hidden"
    >
      <div class="space-y-1 px-4 pb-3 pt-2">
        <NuxtLink
          v-for="item in navigation"
          :key="item.label"
          :to="item.to"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-orange-500"
          active-class="text-orange-500 bg-orange-50"
          @click="mobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <div class="pt-2">
          <UButton 
            to="/cursos"
            color="primary"
            block
            @click="mobileMenuOpen = false"
          >
            Ver Cursos
          </UButton>
        </div>
      </div>
    </div>
  </header>
</template>
