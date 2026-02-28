// ─────────────────────────────────────────────────────────────────────────────
// Datos de cursos — preparado para reemplazar con llamada a API/BD en el futuro
// Cuando se integre Supabase / Directus / etc., solo cambiar este composable.
// ─────────────────────────────────────────────────────────────────────────────

export interface Curso {
  id: string
  slug: string
  title: string
  subtitle: string
  shortDesc: string
  description: string
  category: string
  categoryColor: string
  duration: string
  modality: 'Presencial' | 'Virtual' | 'Híbrido'
  level: string
  image: string
  price: string
  currency: string
  featured: boolean
  order: number
}

const cursos: Curso[] = [
  {
    id: '1',
    slug: 'modelo-profesional',
    title: 'Modelo Profesional',
    subtitle: 'PASARELA · FOTOGRAFÍA · FILM',
    shortDesc: 'Enfoque modelo profesional para campañas publicitarias.',
    description: 'Este curso de 64 horas está diseñado para una formación integral en el mundo del modelaje, combinando conocimientos teóricos con una intensa práctica enfocada en el desarrollo de habilidades frente a la cámara. A lo largo del curso los estudiantes explorarán los fundamentos del modelaje profesional, incluyendo postura, expresión corporal, teoría de moda, pasarela y estilo personal, con énfasis en técnicas de modelaje fotográfico y fílmico.\n\nCada alumno vivirá una experiencia formativa que le permitirá descubrir y proyectar su potencial en la industria del modelaje con seguridad, estilo y autenticidad.',
    category: 'Moda',
    categoryColor: '#ea580c',
    duration: '4 meses',
    modality: 'Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/modelo-profesional.jpg',
    price: '520.000',
    currency: 'COP',
    featured: true,
    order: 1
  },
  {
    id: '2',
    slug: 'fotografia-de-moda',
    title: 'Fotografía de Moda',
    subtitle: 'EDITORIAL · PUBLICITARIA · RETOQUE',
    shortDesc: 'Iluminación, dirección de modelos y edición para producción editorial profesional.',
    description: 'Aprende fotografía editorial, retoque profesional, dirección de estilismo y gestión de producción de moda. Incluye sesiones reales con modelos y maquilladores.',
    category: 'Fotografía',
    categoryColor: '#7c3aed',
    duration: '3 meses',
    modality: 'Virtual',
    level: 'Básico – Avanzado',
    image: '/cursos/fotografia-moda.jpg',
    price: '450.000',
    currency: 'COP',
    featured: true,
    order: 2
  },
  {
    id: '3',
    slug: 'visual-merchandising',
    title: 'Visual Merchandising',
    subtitle: 'TIENDAS · VITRINAS · EXPERIENCIA',
    shortDesc: 'Diseña escaparates, vitrinas y experiencias de tienda que impulsan las ventas.',
    description: 'Domina el arte del visual merchandising y el marketing en tienda. Aprende a crear displays atractivos, manejar planogramas y diseñar la experiencia del cliente.',
    category: 'Marketing',
    categoryColor: '#0891b2',
    duration: '2 meses',
    modality: 'Presencial',
    level: 'Básico – Medio',
    image: '/cursos/visual-merchandising.jpg',
    price: '380.000',
    currency: 'COP',
    featured: true,
    order: 3
  },
  {
    id: '4',
    slug: 'wedding-planner',
    title: 'Wedding Planner',
    subtitle: 'BODAS · QUINCES · EVENTOS SOCIALES',
    shortDesc: 'Organización y diseño de bodas y eventos sociales desde cero hasta el gran día.',
    description: 'Aprende a planear, coordinar y ejecutar bodas y eventos especiales. Protocolo, proveedores, ambientación, presupuestos y gestión de crisis el día del evento.',
    category: 'Eventos',
    categoryColor: '#be185d',
    duration: '2 meses',
    modality: 'Virtual',
    level: 'Básico – Avanzado',
    image: '/cursos/wedding-planner.jpg',
    price: '360.000',
    currency: 'COP',
    featured: false,
    order: 4
  },
  {
    id: '5',
    slug: 'figurin-de-moda',
    title: 'Figurín de Moda',
    subtitle: 'ILUSTRACIÓN · DISEÑO · COLECCIONES',
    shortDesc: 'Ilustración técnica de moda: proporciones, telas, texturas y colecciones.',
    description: 'Desarrolla tu capacidad de ilustración para moda. Aprende figurines técnicos, croquis de diseño, representación de textiles y presentación de colecciones.',
    category: 'Diseño',
    categoryColor: '#059669',
    duration: '3 meses',
    modality: 'Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/figurin.jpg',
    price: '400.000',
    currency: 'COP',
    featured: false,
    order: 5
  },
  {
    id: '6',
    slug: 'dj-electronico',
    title: 'DJ Electrónico',
    subtitle: 'MEZCLA · PRODUCCIÓN · CABINA EN VIVO',
    shortDesc: 'Mezcla, producción y actuación en vivo para la escena electrónica.',
    description: 'Aprende a mezclar, crear sets y entender la cultura del DJ. Software profesional, técnicas de mezcla, lectura de pista y actuación en cabina.',
    category: 'Música',
    categoryColor: '#d97706',
    duration: '2 meses',
    modality: 'Virtual',
    level: 'Básico – Avanzado',
    image: '/cursos/dj-electronico.jpg',
    price: '350.000',
    currency: 'COP',
    featured: false,
    order: 6
  },
  {
    id: '7',
    slug: 'productor-musical',
    title: 'Productor Musical',
    subtitle: 'DAW · MEZCLA · MASTERIZACIÓN',
    shortDesc: 'Producción, mezcla y masterización profesional desde tu DAW.',
    description: 'Domina la producción musical digital. Manejo de DAW (FL Studio / Ableton), síntesis, mezcla, masterización y distribución de tu música.',
    category: 'Música',
    categoryColor: '#d97706',
    duration: '3 meses',
    modality: 'Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/productor-musical.jpg',
    price: '420.000',
    currency: 'COP',
    featured: false,
    order: 7
  },
  {
    id: '8',
    slug: 'arte-contemporaneo',
    title: 'Arte Contemporáneo',
    subtitle: 'PINTURA · INSTALACIÓN · ARTE DIGITAL',
    shortDesc: 'Técnicas, conceptos y práctica artística para el arte del siglo XXI.',
    description: 'Explora el arte contemporáneo desde sus fundamentos conceptuales hasta la práctica. Pintura, instalación, arte digital y gestión de obra propia.',
    category: 'Arte',
    categoryColor: '#7c3aed',
    duration: '3 meses',
    modality: 'Virtual',
    level: 'Básico – Avanzado',
    image: '/cursos/arte-contemporaneo.jpg',
    price: '390.000',
    currency: 'COP',
    featured: false,
    order: 8
  },
  {
    id: '9',
    slug: 'creacion-de-contenido',
    title: 'Creación de Contenido',
    subtitle: 'REDES · VIDEO · MARCA PERSONAL',
    shortDesc: 'Estrategia, producción y edición de contenido para redes sociales y marcas.',
    description: 'Aprende a crear contenido de alto impacto para redes. Fotografía con celular, edición de video, estrategia de marca personal y monetización.',
    category: 'Digital',
    categoryColor: '#0891b2',
    duration: '2 meses',
    modality: 'Virtual',
    level: 'Básico – Avanzado',
    image: '/cursos/creacion-contenido.jpg',
    price: '330.000',
    currency: 'COP',
    featured: false,
    order: 9
  },
  {
    id: '10',
    slug: 'fotografia-video-celular',
    title: 'Fotografía y Video con Celular',
    subtitle: 'CELULAR · EDICIÓN · PUBLICACIÓN',
    shortDesc: 'Captura, edita y publica contenido profesional desde tu smartphone.',
    description: 'Aprende a sacar el máximo potencial de tu celular para fotografía y video. Composición, luz, edición y publicación de contenido de calidad profesional.',
    category: 'Fotografía',
    categoryColor: '#7c3aed',
    duration: '1 mes',
    modality: 'Virtual',
    level: 'Básico',
    image: '/cursos/fotografia-video-cel.jpg',
    price: '220.000',
    currency: 'COP',
    featured: false,
    order: 10
  },
  {
    id: '11',
    slug: 'periodismo-de-moda',
    title: 'Diplomado en Periodismo de Moda',
    subtitle: 'REDACCIÓN · CRÍTICA · COBERTURA',
    shortDesc: 'Escritura, crítica de moda y cobertura de eventos para medios especializados.',
    description: 'El único diplomado en periodismo de moda de la región. Aprende redacción especializada, crítica, cubrimiento de pasarelas y gestión de medios de moda.',
    category: 'Periodismo',
    categoryColor: '#be185d',
    duration: '5 meses',
    modality: 'Presencial',
    level: 'Medio – Avanzado',
    image: '/cursos/periodismo-moda.jpg',
    price: '680.000',
    currency: 'COP',
    featured: false,
    order: 11
  },
  {
    id: '12',
    slug: 'decoracion-express',
    title: 'Decoración Express',
    subtitle: 'INTERIORES · COLOR · AMBIENTES',
    shortDesc: 'Interiorismo práctico, paletas de color y decoración de ambientes en tiempo récord.',
    description: 'Aprende a transformar espacios con recursos limitados. Principios de diseño de interiores, tendencias actuales, manejo del color y presentación de propuestas.',
    category: 'Diseño',
    categoryColor: '#059669',
    duration: '1.5 meses',
    modality: 'Virtual',
    level: 'Básico',
    image: '/cursos/decoracion-express.jpg',
    price: '280.000',
    currency: 'COP',
    featured: false,
    order: 12
  },
  {
    id: '13',
    slug: 'coolhunting',
    title: 'Coolhunting',
    subtitle: 'TENDENCIAS · ANÁLISIS · INFORMES',
    shortDesc: 'Detecta tendencias emergentes y aplícalas en moda, diseño y comunicación.',
    description: 'Conviértete en cazador de tendencias. Aprende metodologías de coolhunting, análisis de macrotendencias, investigación de mercados y presentación de informes de tendencias.',
    category: 'Moda',
    categoryColor: '#ea580c',
    duration: '2 meses',
    modality: 'Presencial',
    level: 'Medio – Avanzado',
    image: '/cursos/coolhunting.jpg',
    price: '370.000',
    currency: 'COP',
    featured: false,
    order: 13
  }
]

export function useCursos() {
  const todos = computed(() => [...cursos].sort((a, b) => a.order - b.order))
  const destacados = computed(() => cursos.filter(c => c.featured).sort((a, b) => a.order - b.order))

  function getCurso(slug: string) {
    return cursos.find(c => c.slug === slug) ?? null
  }

  return { todos, destacados, getCurso }
}
