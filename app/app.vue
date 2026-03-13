<script setup lang="ts">
const audioRef = ref<HTMLAudioElement | null>(null)
const isAudioEnabled = ref(true)
const isAudioPlaying = ref(false)
const cookieConsent = useCookie<string | null>('has_consent_cookies')

const AUDIO_PREF_KEY = 'rm-bg-audio-enabled'
const MAX_AUDIO_MS = 40_000

// Flag en memoria: se resetea con cada carga de página (no sessionStorage)
let hasPlayedThisLoad = false
let stopTimer: ReturnType<typeof setTimeout> | null = null

const stopAudio = () => {
  const audio = audioRef.value
  if (!audio) return
  audio.pause()
  audio.currentTime = 0
  isAudioPlaying.value = false
}

const scheduleStop = () => {
  if (stopTimer) clearTimeout(stopTimer)
  stopTimer = setTimeout(stopAudio, MAX_AUDIO_MS)
}

// Muestra el hint de toque en móvil hasta que el audio arranque
const showMobileHint = ref(false)

// Llamar play() de forma síncrona en el handler — requisito de iOS Safari
const startAudioSync = () => {
  if (!isAudioEnabled.value) return
  if (hasPlayedThisLoad) return
  if (isAudioPlaying.value) return

  const audio = audioRef.value
  if (!audio) return

  audio.volume = 0.35
  audio.currentTime = 0

  const promise = audio.play()
  if (promise !== undefined) {
    promise.then(() => {
      hasPlayedThisLoad = true
      isAudioPlaying.value = true
      showMobileHint.value = false
      scheduleStop()
      removeInteractionListeners()
    }).catch(() => {
      // Aún bloqueado — el hint seguirá visible
    })
  }
}

const tryStartAudio = async () => {
  startAudioSync()
}

const firstInteractionHandler = () => {
  startAudioSync()
}

const setAudioPreference = (enabled: boolean) => {
  isAudioEnabled.value = enabled
  if (!import.meta.client) return
  localStorage.setItem(AUDIO_PREF_KEY, enabled ? '1' : '0')
}

const toggleAudio = () => {
  if (isAudioEnabled.value) {
    setAudioPreference(false)
    stopAudio()
    showMobileHint.value = false
    return
  }
  setAudioPreference(true)
  hasPlayedThisLoad = false
  startAudioSync()
}

const addInteractionListeners = () => {
  if (!import.meta.client) return
  window.addEventListener('scroll',     firstInteractionHandler, { passive: true })
  window.addEventListener('click',      firstInteractionHandler)
  window.addEventListener('touchstart', firstInteractionHandler, { passive: true })
  window.addEventListener('keydown',    firstInteractionHandler)
  window.addEventListener('mousemove',  firstInteractionHandler, { passive: true, once: true })
}

const removeInteractionListeners = () => {
  if (!import.meta.client) return
  window.removeEventListener('scroll',     firstInteractionHandler)
  window.removeEventListener('click',      firstInteractionHandler)
  window.removeEventListener('touchstart', firstInteractionHandler)
  window.removeEventListener('keydown',    firstInteractionHandler)
  window.removeEventListener('mousemove',  firstInteractionHandler)
}

onMounted(() => {
  const savedPreference = localStorage.getItem(AUDIO_PREF_KEY)
  if (savedPreference === '0') {
    isAudioEnabled.value = false
  }

  const audio = audioRef.value
  if (audio) {
    audio.addEventListener('play',  () => { isAudioPlaying.value = true })
    audio.addEventListener('pause', () => { isAudioPlaying.value = false })
    audio.addEventListener('ended', () => { isAudioPlaying.value = false })
  }

  // Intento inmediato (funciona en desktop con historial de interacción)
  startAudioSync()

  // En móvil o si el intento falló, mostrar hint y escuchar primer gesto
  if (!hasPlayedThisLoad) {
    showMobileHint.value = true
    addInteractionListeners()
  }
})

watch(
  () => cookieConsent.value,
  (value) => {
    if (value === 'accepted') {
      hasPlayedThisLoad = false
      startAudioSync()
    }
  }
)

onBeforeUnmount(() => {
  removeInteractionListeners()
  if (stopTimer) clearTimeout(stopTimer)
})
</script>

<template>
  <UApp>
    <div class="flex min-h-screen flex-col relative">
      <AppNavbar />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <AppFooter />
      <CookieBanner />

      <!-- Prompt móvil: toca para activar sonido -->
      <Transition name="fade">
        <button
          v-if="showMobileHint && isAudioEnabled && !isAudioPlaying"
          type="button"
          class="fixed top-20 left-1/2 -translate-x-1/2 z-[110] inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md shadow-lg sm:hidden"
          @click="toggleAudio"
        >
          <UIcon name="i-lucide-volume-2" class="h-4 w-4 text-orange-400" />
          Toca para activar el sonido
        </button>
      </Transition>

      <!-- Botón flotante de audio -->
      <button
        type="button"
        class="fixed bottom-6 left-6 z-[100] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-black/50"
        :aria-label="isAudioEnabled ? 'Silenciar audio ambiental' : 'Activar audio ambiental'"
        @click="toggleAudio"
      >
        <UIcon :name="isAudioEnabled ? (isAudioPlaying ? 'i-lucide-volume-2' : 'i-lucide-volume-1') : 'i-lucide-volume-x'" class="h-4 w-4" />
        <span>{{ isAudioEnabled ? (isAudioPlaying ? 'Sonido on' : 'Toca para sonido') : 'Sonido off' }}</span>
      </button>

      <a
        href="https://wa.me/573016555918?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20RM%20Escuela%20Creativa"
        target="_blank"
        rel="noopener noreferrer"
        class="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Contáctanos por WhatsApp"
      >
        <UIcon name="i-simple-icons-whatsapp" class="h-8 w-8" />
        <!-- Ping animation de fondo (opcional, llama la atención) -->
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30"></span>
      </a>

      <audio
        ref="audioRef"
        src="/audio/rm-models-2.mp3"
        preload="metadata"
        class="hidden"
      />
    </div>
  </UApp>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; transform: translateX(-50%) translateY(-6px); }
</style>
