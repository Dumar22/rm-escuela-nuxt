<script setup lang="ts">
const audioRef = ref<HTMLAudioElement | null>(null)
const isAudioEnabled = ref(true)
const isAudioPlaying = ref(false)
const cookieConsent = useCookie<string | null>('has_consent_cookies')

const SESSION_AUDIO_KEY = 'rm-bg-audio-played'
const AUDIO_PREF_KEY = 'rm-bg-audio-enabled'
const MAX_AUDIO_MS = 40_000

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
  stopTimer = setTimeout(() => {
    stopAudio()
  }, MAX_AUDIO_MS)
}

const tryStartAudio = async (force = false) => {
  if (!import.meta.client) return
  if (!isAudioEnabled.value) return
  if (!force && sessionStorage.getItem(SESSION_AUDIO_KEY) === '1') return

  const audio = audioRef.value
  if (!audio) return

  try {
    audio.volume = 0.35
    audio.currentTime = 0
    await audio.play()
    isAudioPlaying.value = true
    sessionStorage.setItem(SESSION_AUDIO_KEY, '1')
    scheduleStop()
    removeInteractionListeners()
  } catch {
    // Si el navegador bloquea autoplay, se intentará en la primera interacción.
  }
}

const firstInteractionHandler = () => {
  void tryStartAudio()
}

const setAudioPreference = (enabled: boolean) => {
  isAudioEnabled.value = enabled
  if (!import.meta.client) return
  localStorage.setItem(AUDIO_PREF_KEY, enabled ? '1' : '0')
}

const toggleAudio = async () => {
  if (isAudioEnabled.value) {
    setAudioPreference(false)
    stopAudio()
    return
  }

  setAudioPreference(true)
  await tryStartAudio(true)
}

const addInteractionListeners = () => {
  if (!import.meta.client) return
  window.addEventListener('click', firstInteractionHandler)
  window.addEventListener('touchstart', firstInteractionHandler)
  window.addEventListener('keydown', firstInteractionHandler)
  window.addEventListener('scroll', firstInteractionHandler, { passive: true })
}

const removeInteractionListeners = () => {
  if (!import.meta.client) return
  window.removeEventListener('click', firstInteractionHandler)
  window.removeEventListener('touchstart', firstInteractionHandler)
  window.removeEventListener('keydown', firstInteractionHandler)
  window.removeEventListener('scroll', firstInteractionHandler)
}

onMounted(() => {
  const savedPreference = localStorage.getItem(AUDIO_PREF_KEY)
  if (savedPreference === '0') {
    isAudioEnabled.value = false
  }

  const audio = audioRef.value
  if (audio) {
    audio.addEventListener('play', () => {
      isAudioPlaying.value = true
    })
    audio.addEventListener('pause', () => {
      isAudioPlaying.value = false
    })
    audio.addEventListener('ended', () => {
      isAudioPlaying.value = false
    })
  }

  if (cookieConsent.value === 'accepted') {
    void tryStartAudio()
  }
  addInteractionListeners()
})

watch(
  () => cookieConsent.value,
  (value) => {
    if (value === 'accepted') {
      void tryStartAudio(true)
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

      <!-- Botón Flotante de WhatsApp -->
      <button
        type="button"
        class="fixed bottom-6 left-6 z-[100] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-black/50"
        :aria-label="isAudioEnabled ? 'Silenciar audio ambiental' : 'Activar audio ambiental'"
        @click="toggleAudio"
      >
        <UIcon :name="isAudioEnabled ? 'i-lucide-volume-2' : 'i-lucide-volume-x'" class="h-4 w-4" />
        <span>{{ isAudioEnabled ? (isAudioPlaying ? 'Sonido on' : 'Sonido listo') : 'Sonido off' }}</span>
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
