<script setup lang="ts">
const navigation = {
  cursos: [
    { label: 'Todos los Cursos', to: '/cursos' },
    { label: 'Moda y Diseño', to: '/cursos?categoria=moda' },
    { label: 'Fotografía', to: '/cursos?categoria=fotografia' },
    { label: 'Arte y Creatividad', to: '/cursos?categoria=arte' }
  ],
  empresa: [
    { label: 'Nosotros', to: '/nosotros' },
    { label: 'Blog y Novedades', to: '/blog' },
    { label: 'Contacto', to: '/contacto' },
    { label: 'Preguntas Frecuentes', to: '/faq' }
  ],
  legal: [
    { label: 'Términos y Condiciones', to: '/terminos' },
    { label: 'Política de Privacidad', to: '/privacidad' }
  ],
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/share/1Cezb2H3io/', icon: 'i-simple-icons-facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/RM_modelos', icon: 'i-simple-icons-instagram' },
    { label: 'YouTube', href: '#', icon: 'i-simple-icons-youtube' }
  ]
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-950 text-white" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Brand -->
        <div class="space-y-8">
          <div>
            <h3 class="text-2xl font-display font-bold text-orange-400">
              RM Escuela Creativa
            </h3>
            <p class="mt-4 text-sm leading-6 text-gray-300">
              Transformando pasiones en profesiones. Tu escuela de artes y moda en Colombia.
            </p>
          </div>
          
          <!-- Social links -->
          <div class="flex space-x-4">
            <a
              v-for="item in navigation.social"
              :key="item.label"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-orange-400 transition-colors"
            >
              <span class="sr-only">{{ item.label }}</span>
              <UIcon :name="item.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <!-- Cursos -->
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">Cursos</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.cursos" :key="item.label">
                  <NuxtLink
                    :to="item.to"
                    class="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- Empresa -->
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">Empresa</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.empresa" :key="item.label">
                  <NuxtLink
                    :to="item.to"
                    class="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:grid md:grid-cols-2 md:gap-8">
            <!-- Legal -->
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in navigation.legal" :key="item.label">
                  <NuxtLink
                    :to="item.to"
                    class="text-sm leading-6 text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            
            <!-- Contacto -->
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">Contacto</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li class="flex items-center gap-2 text-sm text-gray-300">
                  <UIcon name="i-lucide-mail" class="h-4 w-4 text-orange-400" />
                  spaziointerior13@gmail.com
                </li>
                <li class="flex items-center gap-2 text-sm text-gray-300">
                  <UIcon name="i-lucide-phone" class="h-4 w-4 text-orange-400" />
                  +57 301 665 5918
                </li>
                <li class="flex items-start gap-2 text-sm text-gray-300">
                  <UIcon name="i-lucide-map-pin" class="h-4 w-4 text-orange-400 mt-0.5" />
                  <span>Manizales - Pereira - Medellín</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
        <p class="text-xs leading-5 text-gray-400">
          &copy; {{ currentYear }} RM Escuela Creativa de Artes y Moda. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
