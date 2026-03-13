<script setup lang="ts">
const { user, signOut } = useAuth()
const router = useRouter()

const navigation = [
  { label: 'Dashboard', to: '/admin', icon: 'i-lucide-layout-dashboard' },
  { label: 'Blog', to: '/admin/blog', icon: 'i-lucide-newspaper' },
  { label: 'Cursos', to: '/admin/cursos', icon: 'i-lucide-graduation-cap' },
  { label: 'Pagos', to: '/admin/pagos', icon: 'i-lucide-credit-card' },
  { label: 'Nosotros', to: '/admin/nosotros', icon: 'i-lucide-info' },
  { label: 'Contacto', to: '/admin/contacto', icon: 'i-lucide-mail' }
]

const handleLogout = async () => {
  await signOut()
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="p-6 border-b border-gray-800">
          <h1 class="text-xl font-display font-bold text-orange-400">
            RM Admin
          </h1>
          <p class="text-xs text-gray-400 mt-1">Panel de control</p>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            active-class="bg-orange-600 text-white hover:bg-orange-700"
          >
            <UIcon :name="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <!-- User & Logout -->
        <div class="p-4 border-t border-gray-800">
          <div class="flex items-center gap-3 mb-3 px-2">
            <div class="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-sm font-bold">
              {{ user?.email?.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{{ user?.email }}</p>
              <p class="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
          <UButton
            @click="handleLogout"
            color="neutral"
            variant="ghost"
            block
            icon="i-lucide-log-out"
          >
            Cerrar sesión
          </UButton>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="ml-64">
      <!-- Top bar -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="px-8 py-4 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">
              <slot name="title">Panel Administrativo</slot>
            </h2>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/"
              target="_blank"
              class="text-sm text-gray-600 hover:text-orange-600 flex items-center gap-1"
            >
              <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              Ver sitio
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
