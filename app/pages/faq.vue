<script setup lang="ts">
useSeoMeta({
  title: 'Preguntas Frecuentes – RM Escuela Creativa',
  description: 'Resuelve todas tus dudas sobre nuestros cursos, metodologías, pagos y certificaciones.'
})

const faqItems = [
  {
    label: '¿Cómo es el proceso de inscripción a un curso?',
    content: 'El proceso es muy sencillo. Debes ingresar a la pestaña "Contacto", llenar el formulario indicando el curso de tu interés, o escribirnos directamente a nuestro WhatsApp. Uno de nuestros asesores te contactará para confirmar tu cupo, compartirte las fechas de inicio y los métodos de pago disponibles.'
  },
  {
    label: '¿Qué incluyen los cursos?',
    content: 'Cada curso incluye el acceso a las clases dictadas por profesionales activos en la industria, material de apoyo visual y bibliográfico, ejercicios prácticos y, al finalizar y aprobar los requerimientos, tu certificado avalado por nuestra institución.'
  },
  {
    label: '¿La escuela entrega algún certificado?',
    content: 'Sí, RM Escuela Creativa otorga un Certificado de Asistencia y Aprobación a todos los estudiantes que completen el total de horas requeridas y demuestren el conocimiento adquirido mediante los proyectos o prácticas finales exigidos en cada programa o curso.'
  },
  {
    label: '¿Cuáles son las modalidades de estudio (Presencial o Virtual)?',
    content: 'Ofrecemos diferentes modalidades según el curso. Contamos con formación presencial en nuestras sedes en Manizales, Pereira o Medellín; modalidad virtual (con clases en vivo o pregrabadas) y modalidad híbrida. En la página de detalles de cada curso podrás ver el formato específico.'
  },
  {
    label: '¿Qué pasa si me pierdo una clase presencial o en vivo?',
    content: 'Entendemos que pueden surgir imprevistos. Te recomendamos comunicarte inmediatamente con coordinación académica o el docente a cargo para revisar si la sesión puede ser repuesta o si se te puede proporcionar el material visto en clase. Ten en cuenta que cierto porcentaje de asistencia es obligatorio para la certificación.'
  },
  {
    label: '¿Tienen opciones de financiación o pago a cuotas?',
    content: 'Sí, pregúntale a tu asesor asignado sobre los planes de pago por cuotas. Dependiendo de la duración del curso, puedes separar tu cupo con un anticipo y pagar el excedente mes a mes sin intereses de financiación.'
  },
  {
    label: '¿Necesito conocimientos previos para inscribirme?',
    content: 'La mayoría de nuestros cursos exprés y diplomados inician desde un nivel básico (desde cero). Sin embargo, ciertos talleres muy específicos pueden requerir una base. Al descargar el pensum de cada curso o consultar con un asesor, te indicaremos si requieres conocimientos previos.'
  }
]
</script>

<template>
  <div class="bg-gray-50/50 min-h-screen py-16 sm:py-24">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
      
      <div class="text-center mb-12">
        <h1 class="text-4xl font-display font-black uppercase tracking-tight text-gray-950 mb-4">
          Preguntas Frecuentes
        </h1>
        <p class="text-gray-600 text-lg">
          Resolvemos tus dudas principales para que des el paso seguro hacia tu formación profesional.
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <UAccordion 
          :items="faqItems" 
          color="gray"
          variant="ghost"
          size="xl"
          class="w-full"
        />
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">¿Tienes una pregunta diferente?</p>
        <UButton to="/contacto" color="primary" size="lg" class="font-bold">
          Habla con un asesor
        </UButton>
      </div>

    </div>
  </div>
</template>
