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
  detailImages?: string[]
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
    subtitle: 'PASARELA - FOTOGRAFÍA - FILM',
    shortDesc: 'Enfoque modelo profesional para campañas publicitarias.',
    description: 'Este curso de 64 horas está diseñado para una formación integral en el mundo del modelaje, combinando conocimientos teóricos con una intensa practica enfocada en el desarrollo de habilidades frente a la cámara. A lo largo del curso los estudiantes explorarán los fundamentos del modelaje profesional, incluyendo postura, expresión corporal, teoría de moda, pasarela y estilo personal, con énfasis en tecnicas de modelaje fotográfico y filmico.\n\nCada alumno vivirá una expereiencia formativa que le permitirá descubrir y proyectar su potencial en la industria del modelaje con seguridad, estilo y autenticidad.',
    category: 'Moda',
    categoryColor: '#ea580c',
    duration: '64 horas',
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
    subtitle: 'EDITORIAL & PUBLICITARIA DE MODA',
    shortDesc: 'Enfoque en nuevas tendencias globales y perspectiva artística.',
    description: 'Este curso intensivo de 48 horas está diseñado para fotógrafos, creativos y apasionados de la moda que buscan perfeccionar su estilo y técnica dentro del universo de la fotografía editorial y publicitaria. Con un enfoque actualizado en las nuevas tendencias estéticas, narrativas y tecnológicas que dominan el panorama global, el curso explora la fotografía de moda como una forma de arte contemporáneo y como una poderosa herramienta de comunicación visual.\n\nSe aprenderá a ejecutar producciones de alto impacto, se profundizará en aspectos de construcción de imagen, storytelling, iluminación, trabajo con modelos, composición, dirección de arte, y postproducción.',
    category: 'Fotografía',
    categoryColor: '#7c3aed',
    duration: '48 horas',
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
    subtitle: 'MARKETING VISUAL DE TIENDAS',
    shortDesc: 'Estrategias visuales de tiendas para transformar la experiencia de compra y potenciar las ventas.',
    description: 'Este curso de 32 horas esta diseñado para emprendedores, comerciantes, diseñadores, gerentes de tienda, visual merchandisers, estudiantes de diseño y marketing y todos aquellos que quieran incursionar en el mundo del retail y estrategias visuales de tiendas.\n\nExplora las ultimas tendencias globales para transformar la experiencia de compra y maximizar el impacto comercial. Hacemos que los productos sean visibles y vendedores con el idioma de la creatividad, con las ultimas tecnicas de diseño y comunicación visual en punto de venta, alineadas con las tendencias globales, para generar experiencias memorables, aumentar el tráfico en tiendas y potenciar las ventas.\n\nClases teórico-prácticas, análisis de casos reales, ejercicios creativos, recursos visuales, street vision, coolhunting, asesoramiento personalizado.',
    category: 'Marketing',
    categoryColor: '#0891b2',
    duration: '32 horas',
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
    subtitle: 'STREET ART POP · CREADOR DE ARTE MODERNO CONTEMPORÁNEO',
    shortDesc: 'Exploración dinámica del arte contemporáneo a través del street art y el pop art.',
    description: 'Este curso intensivo de 24 horas ofrece una exploración dinámica del arte contemporáneo a través de dos de sus corrientes más vibrantes y provocadoras: el street art y el pop art.\n\nDiseñado tanto para principiantes como para amantes del arte que deseen profundizar en estas expresiones urbanas y populares, el curso combina teoría, análisis visual y práctica creativa con clases y salidas de campo, sesiones prácticas de creación artística en un trabajo colaborativo.',
    category: 'Arte',
    categoryColor: '#7c3aed',
    duration: '24 horas',
    modality: 'Virtual',
    level: 'Básico – Avanzado',
    image: '/cursos/arte-contemporaneo.jpg',
    detailImages: ['/cursos-detalle/arte-contemporaneo-1.jpg', '/cursos-detalle/arte-contemporaneo-2.jpg'],
    price: '390.000',
    currency: 'COP',
    featured: false,
    order: 8
  },
  {
    id: '9',
    slug: 'creacion-de-contenido',
    title: 'Contenido y Redes Sociales',
    subtitle: 'CREADOR DE CONTENIDO CREATIVO Y REDES SOCIALES',
    shortDesc: 'Herramientas prácticas y creativas para destacar en redes sociales y plataformas digitales.',
    description: 'Este curso intensivo de 16 horas está diseñado para brindar herramientas prácticas y creativas a quienes deseen desarrollarse como creadores de contenido digital y optimizar su presencia en redes sociales.\n\nA través de clases teórico-prácticas, los participantes aprenderán a diseñar estrategias de contenido, generar publicaciones efectivas y utilizar herramientas digitales para destacar en plataformas como Instagram, TikTok, Facebook, YouTube y más. Diseñando y planificando contenido visual, narrativo y creativo.',
    category: 'Digital',
    categoryColor: '#ea580c',
    duration: '16 horas',
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
    title: 'Coolhunting & Tendencias',
    subtitle: 'CONSULTORÍAS EN MERCADOS Y TENDENCIAS',
    shortDesc: 'Identifica, analiza y anticipa tendencias emergentes en el mercado latino americano y colombiano.',
    description: 'Este curso de 38 horas está diseñado para profesionales del marketing, diseño, innovación, comunicación, emprendedores, comerciantes y todos aquellos interesados en anticiparse al futuro del consumo y los estilos de vida.\n\nEste curso intensivo está diseñado para proporcionar a los participantes las herramientas y metodologías necesarias para identificar, analizar y anticipar tendencias emergentes en contextos de cambio acelerado.\n\nA través del coolhunting, una disciplina clave para la innovación estratégica, los estudiantes aprenderán señales culturales, tecnológicas y sociales que marcan el futuro del consumo en mercados emergentes y en especial el mercado latinoamericano y colombiano.',
    category: 'Moda',
    categoryColor: '#7c3aed',
    duration: '38 horas',
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
