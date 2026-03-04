<template>
  <UApp>
    <div class="flex min-h-screen flex-col relative">
      <AppNavbar />
      <main class="flex-1">
        <NuxtPage />
      </main>
      <AppFooter />

      <!-- Botón Flotante de WhatsApp -->
      <a
        href="https://wa.me/573016655918?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20RM%20Escuela%20Creativa"
        target="_blank"
        rel="noopener noreferrer"
        class="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Contáctanos por WhatsApp"
      >
        <UIcon name="i-simple-icons-whatsapp" class="h-8 w-8" />
        <!-- Ping animation de fondo (opcional, llama la atención) -->
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30"></span>
      </a>
    </div>
  </UApp>
</template>
