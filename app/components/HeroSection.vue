<script setup lang="ts">
// Preload de las imágenes críticas del hero (LCP)
useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/silueta.png', fetchpriority: 'high', type: 'image/webp' },
    { rel: 'preload', as: 'image', href: '/rm-texto.png', fetchpriority: 'high', type: 'image/webp' },
    { rel: 'preload', as: 'image', href: '/rm-img.jpg', fetchpriority: 'high' }
  ]
})
</script>

<template>
  <section
    class="hero-section relative bg-white overflow-hidden"
    style="height: clamp(520px, 62vw, 680px);"
  >
    <!-- Naranja 1 -->
    <div
      class="naranja-circulo naranja-c1 absolute rounded-full pointer-events-none"
      style="
        background-color: #ea580c;
        width: clamp(140px, 20vw, 280px);
        height: clamp(140px, 20vw, 280px);
        right: clamp(-70px, -8vw, -25px);
        top: clamp(20px, 4vw, 55px);
        z-index: 1;
      "
    />
    <!-- Naranja 2 -->
    <div
      class="naranja-circulo naranja-c2 absolute rounded-full pointer-events-none"
      style="
        background-color: #ea580c;
        width: clamp(105px, 14vw, 205px);
        height: clamp(105px, 14vw, 205px);
        right: clamp(-50px, -6vw, -18px);
        top: clamp(130px, 18vw, 285px);
        z-index: 1;
      "
    />
    <!-- Naranja 3 -->
    <div
      class="naranja-circulo naranja-c3 absolute rounded-full pointer-events-none"
      style="
        background-color: #ea580c;
        width: clamp(95px, 13vw, 175px);
        height: clamp(95px, 13vw, 175px);
        right: clamp(-30px, -3.5vw, -8px);
        top: clamp(220px, 32vw, 430px);
        z-index: 1;
      "
    />

    <!-- Círculo gris 1 — Creatividad -->
    <NuxtLink
      to="/blog?categoria=Creatividad"
      class="gris-circulo gris-c1 absolute flex items-center justify-center text-center rounded-full shadow-sm transition-transform hover:scale-110 cursor-pointer"
      style="
        width: clamp(100px, 16vw, 200px);
        height: clamp(100px, 16vw, 200px);
        right: clamp(18px, 3vw, 50px);
        top: 0;
        background-color: rgba(209, 213, 219, 0.65);
        z-index: 5;
      "
    >
      <span class="gris-label font-semibold text-gray-700 leading-tight" style="font-size: clamp(0.5rem, 1.05vw, 1.05rem); padding: clamp(4px, 0.8vw, 10px);">Creatividad</span>
    </NuxtLink>

    <!-- Círculo gris 2 — Innovación -->
    <NuxtLink
      to="/blog?categoria=Innovacion"
      class="gris-circulo gris-c2 absolute flex items-center justify-center text-center rounded-full shadow-sm transition-transform hover:scale-110 cursor-pointer"
      style="
        width: clamp(100px, 16vw, 200px);
        height: clamp(100px, 16vw, 200px);
        right: clamp(70px, 10vw, 130px);
        top: clamp(43px, 8.5vw, 108px);
        background-color: rgba(209, 213, 219, 0.55);
        z-index: 5;
      "
    >
      <span class="gris-label font-semibold text-gray-700 leading-tight" style="font-size: clamp(0.5rem, 1.05vw, 1.05rem); padding: clamp(4px, 0.8vw, 10px);">Innovación</span>
    </NuxtLink>

    <!-- Círculo gris 3 — Tendencias -->
    <NuxtLink
      to="/blog?categoria=Tendencias"
      class="gris-circulo gris-c3 absolute flex items-center justify-center text-center rounded-full shadow-sm transition-transform hover:scale-110 cursor-pointer"
      style="
        width: clamp(100px, 16vw, 200px);
        height: clamp(100px, 16vw, 200px);
        right: clamp(45px, 7vw, 95px);
        top: clamp(86px, 16.5vw, 216px);
        background-color: rgba(209, 213, 219, 0.55);
        z-index: 5;
      "
    >
      <span class="gris-label font-semibold text-gray-700 leading-tight" style="font-size: clamp(0.5rem, 1.05vw, 1.05rem); padding: clamp(4px, 0.8vw, 10px);">Tendencias</span>
    </NuxtLink>

    <!-- Círculo gris 4 — Moda -->
    <NuxtLink
      to="/blog?categoria=Moda"
      class="gris-circulo gris-c4 absolute flex items-center justify-center text-center rounded-full shadow-sm transition-transform hover:scale-110 cursor-pointer"
      style="
        width: clamp(100px, 16vw, 200px);
        height: clamp(100px, 16vw, 200px);
        right: clamp(18px, 3vw, 50px);
        top: clamp(129px, 24.5vw, 324px);
        background-color: rgba(209, 213, 219, 0.55);
        z-index: 5;
      "
    >
      <span class="gris-label font-semibold text-gray-700 leading-tight" style="font-size: clamp(0.5rem, 1.05vw, 1.05rem); padding: clamp(4px, 0.8vw, 10px);">Moda</span>
    </NuxtLink>

    <!-- Círculo gris 5 — Arte -->
    <NuxtLink
      to="/blog?categoria=Arte"
      class="gris-circulo gris-c5 absolute flex items-center justify-center text-center rounded-full shadow-sm transition-transform hover:scale-110 cursor-pointer"
      style="
        width: clamp(100px, 16vw, 200px);
        height: clamp(100px, 16vw, 200px);
        right: clamp(-50px, -7vw, -25px);
        top: clamp(172px, 32.5vw, 432px);
        background-color: rgba(209, 213, 219, 0.65);
        z-index: 5;
      "
    >
      <span class="gris-label font-semibold text-gray-700 leading-tight" style="font-size: clamp(0.5rem, 1.05vw, 1.05rem); padding: clamp(4px, 0.8vw, 10px);">Arte</span>
    </NuxtLink>

    <!-- CONTENIDO PRINCIPAL -->
    <div
      class="contenido-principal relative w-full h-full"
      style="height: clamp(520px, 62vw, 680px); z-index: 2;"
    >
      <!-- Silueta -->
      <div
        class="silueta-wrap absolute top-0 bottom-0 left-0 pointer-events-none"
        style="width: clamp(200px, 33vw, 500px); z-index: 3;"
      >
        <NuxtImg
          src="/silueta.png"
          alt="RM Modelos - Escuela Creativa de Artes y Moda"
          width="500"
          height="700"
          format="webp"
          quality="85"
          fetchpriority="high"
          loading="eager"
          preload
          style="width: 100%; height: 100%; object-fit: contain; object-position: left bottom;"
        />
      </div>

      <!-- Texto central -->
      <div
        class="texto-hero absolute flex flex-col justify-center"
        style="
          left: clamp(180px, 40vw, 640px);
          right: clamp(80px, 16vw, 200px);
          top: 35%;
          transform: translateY(-35%);
          z-index: 4;
        "
      >
        <NuxtImg
          src="/rm-img.jpg"
          alt="RM Modelos"
          width="600"
          height="340"
          quality="90"
          fetchpriority="high"
          loading="eager"
          style="width: clamp(200px, 28vw, 470px); aspect-ratio: 600/340; object-fit: contain; object-position: left; margin-top: clamp(-8px, -0.8vw, -4px);"
        />

        <div style="margin-top: clamp(10px, 1.5vw, 24px);">
          <div class="subtexto-wrap" style="display: inline-block; width: fit-content; margin-left: clamp(-60px, -6vw, -120px);">
            <h2
              class="text-orange-600 font-bold tracking-widest uppercase"
              style="font-size: clamp(1rem, 1.8vw, 1.85rem);"
            >
              Escuela Creativa de Artes &amp; Moda
            </h2>
            <p
              class="text-gray-900 text-right w-full"
              style="font-size: clamp(0.9rem, 1.5vw, 1.5rem); margin-top: clamp(2px, 0.4vw, 6px);"
            >
              Modelo educativo Learning by Doing
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra naranja vertical — solo móvil, reemplaza los círculos naranjas -->
    <div
      class="naranja-barra-movil absolute top-0 right-0 pointer-events-none"
      style="display: none; width: 14px; bottom: 90px; background-color: #ea580c; z-index: 3; border-radius: 0 0 0 6px;"
    />

    <!-- FILA INFERIOR DE CÍRCULOS — solo visible en móvil -->
    <div
      class="circulos-bottom-row absolute left-0 right-0 bottom-0 items-center justify-evenly px-3"
      style="display: none; height: 90px; z-index: 10; padding-bottom: 8px; padding-top: 8px; background-color: #ea580c; pointer-events: auto;"
    >
      <!-- Creatividad -->
      <NuxtLink
        to="/blog?categoria=Creatividad"
        class="flex items-center justify-center text-center rounded-full shadow-sm flex-shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style="width: min(16vw, 64px); height: min(16vw, 64px); background-color: rgba(255,255,255,0.28);"
      >
        <span class="font-semibold text-white leading-tight break-words text-center" style="font-size: clamp(0.45rem, 2.2vw, 0.6rem); padding: 4px; word-break: break-word;">Creatividad</span>
      </NuxtLink>
      <!-- Innovación -->
      <NuxtLink
        to="/blog?categoria=Innovacion"
        class="flex items-center justify-center text-center rounded-full shadow-sm flex-shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style="width: min(16vw, 64px); height: min(16vw, 64px); background-color: rgba(255,255,255,0.18);"
      >
        <span class="font-semibold text-white leading-tight break-words text-center" style="font-size: clamp(0.45rem, 2.2vw, 0.6rem); padding: 4px; word-break: break-word;">Innovación</span>
      </NuxtLink>
      <!-- Tendencias -->
      <NuxtLink
        to="/blog?categoria=Tendencias"
        class="flex items-center justify-center text-center rounded-full shadow-sm flex-shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style="width: min(16vw, 64px); height: min(16vw, 64px); background-color: rgba(255,255,255,0.18);"
      >
        <span class="font-semibold text-white leading-tight break-words text-center" style="font-size: clamp(0.45rem, 2.2vw, 0.6rem); padding: 4px; word-break: break-word;">Tendencias</span>
      </NuxtLink>
      <!-- Moda -->
      <NuxtLink
        to="/blog?categoria=Moda"
        class="flex items-center justify-center text-center rounded-full shadow-sm flex-shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style="width: min(16vw, 64px); height: min(16vw, 64px); background-color: rgba(255,255,255,0.18);"
      >
        <span class="font-semibold text-white leading-tight" style="font-size: clamp(0.45rem, 2.2vw, 0.6rem); padding: 4px;">Moda</span>
      </NuxtLink>
      <!-- Arte -->
      <NuxtLink
        to="/blog?categoria=Arte"
        class="flex items-center justify-center text-center rounded-full shadow-sm flex-shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style="width: min(16vw, 64px); height: min(16vw, 64px); background-color: rgba(255,255,255,0.28);"
      >
        <span class="font-semibold text-white leading-tight" style="font-size: clamp(0.45rem, 2.2vw, 0.6rem); padding: 4px;">Arte</span>
      </NuxtLink>
    </div>

    <!-- Línea naranja inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" style="z-index: 10;" />
  </section>
</template>

<style scoped>
/* ── ANIMACIÓN FLOAT (desktop + tablet) ──────── */
@keyframes floatY {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

.gris-c1 { animation: floatY 5.0s ease-in-out infinite; animation-delay: 0.0s; }
.gris-c2 { animation: floatY 5.8s ease-in-out infinite; animation-delay: 0.8s; }
.gris-c3 { animation: floatY 4.6s ease-in-out infinite; animation-delay: 1.5s; }
.gris-c4 { animation: floatY 6.2s ease-in-out infinite; animation-delay: 0.4s; }
.gris-c5 { animation: floatY 5.4s ease-in-out infinite; animation-delay: 1.1s; }

.naranja-c1 { animation: floatY 6.5s ease-in-out infinite; animation-delay: 0.3s; }
.naranja-c2 { animation: floatY 5.2s ease-in-out infinite; animation-delay: 1.2s; }
.naranja-c3 { animation: floatY 4.8s ease-in-out infinite; animation-delay: 2.0s; }

/* ── MÓVIL (< 640px) ─────────────────────────── */
@media (max-width: 639px) {
  /* Sección: flujo vertical, altura automática */
  .hero-section {
    height: auto !important;
    min-height: unset !important;
    padding-bottom: 0 !important;
    display: flex !important;
    flex-direction: column !important;
  }

  /* Ocultar círculos laterales */
  .naranja-circulo,
  .gris-circulo,
  .naranja-barra-movil {
    display: none !important;
  }

  /* Wrapper interno: columna centrada */
  .contenido-principal {
    position: relative !important;
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    padding: 24px 16px 0 !important;
  }

  /* Silueta: centrada abajo */
  .silueta-wrap {
    position: relative !important;
    width: 62vw !important;
    max-width: 230px !important;
    min-width: unset !important;
    height: 260px !important;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    margin: 0 auto !important;
    margin-bottom: 0 !important;
    order: 2 !important;
  }

  /* Texto: arriba */
  .texto-hero {
    position: relative !important;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    transform: none !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    padding: 8px 8px 0 !important;
    margin-top: 0 !important;
    order: 1 !important;
  }

  .rm-logo {
    width: min(62vw, 200px) !important;
    margin: 0 auto !important;
  }

  .titulo-modelos {
    font-size: clamp(2.6rem, 13vw, 4rem) !important;
    text-align: center !important;
  }

  /* Subtextos centrados */
  .subtexto-wrap {
    margin-left: 0 !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .subtexto-wrap h2 {
    font-size: clamp(0.7rem, 3.5vw, 1rem) !important;
    text-align: center !important;
    letter-spacing: 0.05em !important;
  }

  .subtexto-wrap p {
    text-align: center !important;
    font-size: clamp(0.65rem, 3vw, 0.9rem) !important;
  }

  /* Imagen silueta: sin espacio vacío inferior en móvil */
  .silueta-wrap img {
    object-fit: cover !important;
    object-position: center top !important;
  }

  /* Fila de círculos: flujo normal al pie, pegada a la silueta */
  .circulos-bottom-row {
    position: relative !important;
    display: flex !important;
    width: 100% !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    margin-top: 0 !important;
  }
}
</style>
