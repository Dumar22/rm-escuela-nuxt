<script setup lang="ts">
useSeoMeta({
  title: 'Preguntas Frecuentes - RM Escuela Creativa',
  description: 'Respuestas a las preguntas más comunes sobre nuestros cursos y programas'
})

const faqs = [
  {
    question: '¿Cuáles son los requisitos para inscribirse?',
    answer: 'No se requiere experiencia previa. Solo necesitas tener ganas de aprender y ser mayor de 16 años.'
  },
  {
    question: '¿Cuál es la modalidad de los cursos?',
    answer: 'Ofrecemos cursos presenciales y virtuales para adaptarnos a tus necesidades.'
  },
  {
    question: '¿Entregan certificado?',
    answer: 'Sí, al finalizar cada curso recibirás un certificado de participación.'
  },
  {
    question: '¿Cuáles son las formas de pago?',
    answer: 'Aceptamos pagos en efectivo, transferencia bancaria y tarjetas de crédito/débito.'
  },
  {
    question: '¿Puedo tomar varios cursos a la vez?',
    answer: 'Sí, puedes inscribirte en múltiples cursos según tu disponibilidad de horarios.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <h1 class="text-4xl font-display font-bold text-gray-900 text-center">
        Preguntas Frecuentes
      </h1>
      <p class="mt-4 text-lg text-gray-700 text-center">
        Encuentra respuestas a las preguntas más comunes
      </p>
      
      <div class="mt-12 space-y-6">
        <UCard v-for="(faq, index) in faqs" :key="index">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ faq.question }}
          </h3>
          <p class="mt-2 text-gray-700">
            {{ faq.answer }}
          </p>
        </UCard>
      </div>
      
      <div class="mt-12 text-center">
        <p class="text-gray-700">¿Tienes más preguntas?</p>
        <UButton to="/contacto" color="primary" class="mt-4">
          Contáctanos
        </UButton>
      </div>
    </div>
  </div>
</template>
