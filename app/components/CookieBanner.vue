<script setup lang="ts">
import { useCookie } from '#imports'

const cookieConsent = useCookie('has_consent_cookies', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
})

const isOpen = ref(!cookieConsent.value)

function acceptCookies() {
  cookieConsent.value = 'accepted'
  isOpen.value = false
}

function rejectCookies() {
  cookieConsent.value = 'rejected'
  isOpen.value = false
}
</script>

<template>
  <div v-if="isOpen" 
    class="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-[100] max-w-sm bg-white p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 ring-1 ring-gray-900/5 transition-all duration-500 transform animate-in slide-in-from-bottom sm:slide-in-from-left"
  >
    <div class="flex items-start gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <UIcon name="i-heroicons-information-circle-solid" class="w-6 h-6 text-primary" />
          <h3 class="text-base sm:text-lg font-bold text-gray-900">Aviso de Cookies</h3>
        </div>
        <p class="text-[0.85rem] text-gray-600 mb-4 leading-relaxed tracking-tight">
          Utilizamos cookies propias y de terceros para mejorar su experiencia de usuario, analizar nuestro tráfico y personalizar el contenido. Al operar en este sitio, usted acepta nuestra <NuxtLink to="/privacidad" class="text-primary hover:underline font-medium">Política de Privacidad</NuxtLink>.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-2">
          <UButton 
            color="gray" 
            variant="soft" 
            @click="rejectCookies" 
            class="justify-center sm:flex-1"
          >
            Solo esenciales
          </UButton>
          <UButton 
            color="primary" 
            @click="acceptCookies" 
            class="justify-center sm:flex-1 font-semibold shadow-md"
          >
            Aceptar todas
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
