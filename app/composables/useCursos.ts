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
  modality: 'Virtual y Presencial' | 'Virtual' | 'Híbrido'
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
    subtitle: 'MODELO PROFESIONAL · PASARELA - FOTOGRAFÍA - FILM',
    shortDesc: 'Enfoque de modelo profesional para campañas publicitarias.',
    description: 'Enfoque de modelo profesional para campañas publicitarias\n\nEste curso de 64 horas está diseñado para una formación integral en el mundo del modelaje, combinando conocimientos teóricos con una intensa práctica enfocada en el desarrollo de habilidades frente a la cámara. A lo largo del curso, los estudiantes explorarán los fundamentos del modelaje profesional, incluyendo postura, expresión corporal, teoría de moda, pasarela y estilo personal, con énfasis en técnicas de modelaje fotográfico y fílmico.\n\nCada alumno vivirá una experiencia formativa que le permitirá descubrir y proyectar su potencial en la industria del modelaje con seguridad, estilo y autenticidad.',
    category: 'Moda',
    categoryColor: '#ea580c',
    duration: '64 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/modelo-profesional.jpg',
    detailImages: ['/cursos-detalle/modelo-profesional-1.jpg', '/cursos-detalle/modelo-profesional-2.jpg'],
    price: '520.000',
    currency: 'COP',
    featured: true,
    order: 1
  },
  {
    id: '2',
    slug: 'fotografia-de-moda',
    title: 'Fotografía de Moda',
    subtitle: 'FOTOGRAFÍA DE MODA · EDITORIAL Y PUBLICITARIA DE MODA',
    shortDesc: 'Enfoque en nuevas tendencias globales y perspectiva artística.',
    description: 'Enfoque en nuevas tendencias globales y perspectiva artística\n\nEste curso intensivo de 48 horas está diseñado para fotógrafos, creativos y apasionados de la moda que buscan perfeccionar su estilo y técnica dentro del universo de la fotografía editorial y publicitaria. Con un enfoque actualizado en las nuevas tendencias estéticas, narrativas y tecnológicas que dominan el panorama global, el curso explora la fotografía de moda como una forma de arte contemporáneo y como una poderosa herramienta de comunicación visual.\n\nSe aprenderá a ejecutar producciones de alto impacto y se profundizará en aspectos de construcción de imagen, storytelling, iluminación, trabajo con modelos, composición, dirección de arte y postproducción.',
    category: 'Fotografía',
    categoryColor: '#7c3aed',
    duration: '48 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/fotografia-moda.jpg',
    detailImages: ['/cursos-detalle/fotografia-de-moda-1.jpg', '/cursos-detalle/fotografia-de-moda-2.jpg'],
    price: '450.000',
    currency: 'COP',
    featured: true,
    order: 2
  },
  {
    id: '3',
    slug: 'visual-merchandising',
    title: 'Visual Merchandising',
    subtitle: 'VISUAL MERCHANDISING · MARKETING VISUAL DE TIENDAS',
    shortDesc: 'Estrategias visuales de tiendas para transformar la experiencia de compra y potenciar las ventas.',
    description: 'Este curso de 32 horas está diseñado para emprendedores, comerciantes, diseñadores, gerentes de tienda, visual merchandisers, estudiantes de diseño y marketing, y todos aquellos que quieran incursionar en el mundo del retail y las estrategias visuales de tiendas.\n\nExplora las últimas tendencias globales para transformar la experiencia de compra y maximizar el impacto comercial. Hacemos que los productos sean visibles y vendedores con el idioma de la creatividad, aplicando las últimas técnicas de diseño y comunicación visual en el punto de venta, alineadas con las tendencias globales para generar experiencias memorables, aumentar el tráfico en tiendas y potenciar las ventas.\n\nEl programa incluye clases teórico-prácticas, análisis de casos reales, ejercicios creativos, recursos visuales, street vision, coolhunting y asesoramiento personalizado.',
    category: 'Marketing',
    categoryColor: '#0891b2',
    duration: '32 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Medio',
    image: '/cursos/visual-merchandising.jpg',
    detailImages: ['/cursos-detalle/visual-merchandising-1.jpg', '/cursos-detalle/visual-merchandising-2.jpg'],
    price: '380.000',
    currency: 'COP',
    featured: true,
    order: 3
  },
  {
    id: '4',
    slug: 'wedding-planner',
    title: 'Wedding Planner',
    subtitle: 'WEDDING PLANNER · PLANEADOR DE BODAS Y EVENTOS SOCIALES',
    shortDesc: 'Organización de bodas y eventos sociales con enfoque en nuevas tendencias.',
    description: 'Este curso de 24 horas está diseñado para formar a futuros organizadores de bodas y eventos sociales con una visión actual, estratégica y orientada a las tendencias del sector. Los participantes adquirirán conocimientos clave sobre planificación, producción y ejecución de eventos, con un enfoque en las nuevas demandas del mercado, las preferencias de los consumidores y las tendencias emergentes del diseño, sostenibilidad, tecnología y experiencias personalizadas.\n\nSe explorarán desde los fundamentos del rol de un wedding planner hasta los aspectos prácticos y creativos que diferencian un evento tradicional de uno innovador y memorable, dejando así un alto valor en la ejecución del evento de nuestros clientes.',
    category: 'Eventos',
    categoryColor: '#be185d',
    duration: '24 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/wedding-planner.jpg',
    detailImages: ['/cursos-detalle/wedding-planner-1.jpg', '/cursos-detalle/wedding-planner-2.jpg'],
    price: '360.000',
    currency: 'COP',
    featured: false,
    order: 4
  },
  {
    id: '5',
    slug: 'figurin-hombre-mujer',
    title: 'Figurín Hombre y Mujer',
    subtitle: 'FIGURÍN HOMBRE Y MUJER · ILUSTRACIÓN DE MODA',
    shortDesc: 'Desarrolla el cuerpo humano estilizado para plasmar prendas de vestuario y textiles.',
    description: 'Este curso intensivo de 36 horas está diseñado para introducir y desarrollar habilidades en la creación de figurines de moda y técnicas de ilustración aplicadas al diseño textil y de vestuario.\n\nA lo largo de las 36 horas, los participantes aprenderán a representar el cuerpo humano estilizado, plasmar diseños con proporción, movimiento y expresión, y explorar distintas técnicas manuales de ilustración, obteniendo un estilo visual propio para plasmar sus creaciones.',
    category: 'Diseño',
    categoryColor: '#059669',
    duration: '36 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/figurin.jpg',
    detailImages: ['/cursos-detalle/figurin-1.jpg', '/cursos-detalle/figurin-2.jpg'],
    price: '400.000',
    currency: 'COP',
    featured: false,
    order: 5
  },
  {
    id: '6',
    slug: 'dj-electronico-crossover',
    title: 'DJ Electrónico Crossover',
    subtitle: 'DJ ELECTRÓNICO CROSSOVER · DJ PROFESIONAL EN RITMOS ELECTRÓNICOS Y CROSSOVER',
    shortDesc: 'Técnicas esenciales para mezclar, crear y presentar sets de alto nivel en todo tipo de eventos.',
    description: 'Este curso de 48 horas está diseñado para quienes desean adentrarse en el mundo del DJing con un enfoque versátil en los géneros electrónicos y crossover. Durante el tiempo de formación, tanto práctica como teórica, aprenderás a dominar las técnicas esenciales para mezclar, crear y presentar sets de alto nivel, adaptándote tanto a la escena electrónica como a eventos sociales donde se mezclan distintos estilos musicales.\n\nEste curso está estructurado para guiarte desde los conceptos básicos del equipo y software de DJ, hasta la ejecución de mezclas fluidas, manejo de BPM, ecualización, efectos y la lectura del público. Además, se abordarán elementos clave del performance en vivo, gestión de biblioteca musical y preparación de sets profesionales.',
    category: 'Música',
    categoryColor: '#d97706',
    duration: '48 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/dj-electronico.jpg',
    detailImages: ['/cursos-detalle/dj-electronico-1.jpg', '/cursos-detalle/dj-electronico-2.jpg'],
    price: '350.000',
    currency: 'COP',
    featured: false,
    order: 6
  },
  {
    id: '7',
    slug: 'productor-de-eventos-y-moda',
    title: 'Productor de Eventos y Moda',
    subtitle: 'PRODUCTOR DE EVENTOS Y MODA · ORGANIZACIÓN - PRODUCCIÓN DE EVENTOS Y ESPECTÁCULOS',
    shortDesc: 'Desarrolla y produce eventos y espectáculos con conceptualización y planificación.',
    description: 'Este curso de 32 horas está diseñado para formar profesionales capaces de conceptualizar, gestionar y ejecutar en el mundo de las producciones. Está dirigido a estudiantes e interesados en diseño, producción de eventos, relaciones públicas, creativos y cualquier persona sin conocimientos previos en la producción de espectáculos.\n\nBrindamos las herramientas necesarias para desarrollar y producir eventos y espectáculos con conceptualización y planificación en el mundo de la moda, presentaciones, lanzamientos, performances, cultura, conciertos, desfiles, activación de marcas, deportes, festivales musicales, congresos, etc. Con un enfoque en escenografías e integrando creatividad, técnica y gestión desde la idea inicial hasta la ejecución final, ofrecemos una visión contemporánea y profesional.',
    category: 'Eventos',
    categoryColor: '#d97706',
    duration: '32 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/productor-musical.jpg',
    detailImages: ['/cursos-detalle/productor-eventos-1.jpg', '/cursos-detalle/productor-eventos-2.jpg'],
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
    modality: 'Virtual y Presencial',
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
    subtitle: 'CONTENIDO Y REDES SOCIALES · CREADOR DE CONTENIDO CREATIVO Y REDES SOCIALES',
    shortDesc: 'Herramientas prácticas y creativas para destacar en redes sociales y plataformas digitales.',
    description: 'Este curso intensivo de 16 horas está diseñado para brindar herramientas prácticas y creativas a quienes deseen desarrollarse como creadores de contenido digital y optimizar su presencia en redes sociales.\n\nA través de clases teórico-prácticas, los participantes aprenderán a diseñar estrategias de contenido, generar publicaciones efectivas y utilizar herramientas digitales para destacar en plataformas como Instagram, TikTok, Facebook, YouTube y más, diseñando y planificando contenido visual, narrativo y creativo.',
    category: 'Digital',
    categoryColor: '#ea580c',
    duration: '16 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/creacion-contenido.jpg',
    detailImages: ['/cursos-detalle/creacion-de-contenido-1.jpg', '/cursos-detalle/creacion-de-contenido-2.jpg'],
    price: '330.000',
    currency: 'COP',
    featured: false,
    order: 9
  },
  {
    id: '10',
    slug: 'fotografia-video-celular',
    title: 'Fotografía y Video con Celular',
    subtitle: 'FOTOGRAFÍA Y VIDEO CON CELULAR · CREACIÓN DE CONTENIDO',
    shortDesc: 'Aprende a producir contenido visual impactante utilizando únicamente tu celular.',
    description: 'Este curso de 32 horas está diseñado para personas que desean aprender a producir contenido visual impactante utilizando únicamente su celular. Los participantes adquirirán conocimientos teóricos y prácticos en fotografía y video, dominando técnicas de iluminación y composición, grabación, edición y publicación con un enfoque 100% digital y orientado a plataformas como Instagram, TikTok, YouTube, Shorts y más.\n\nA través de este programa, los alumnos optimizarán y desarrollarán habilidades en planificación, producción, edición y estrategia digital para producto, moda y contenido.',
    category: 'Fotografía',
    categoryColor: '#7c3aed',
    duration: '32 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico',
    image: '/cursos/fotografia-video-cel.jpg',
    detailImages: ['/cursos-detalle/fotografia-celular-1.jpg', '/cursos-detalle/fotografia-celular-2.jpg'],
    price: '220.000',
    currency: 'COP',
    featured: false,
    order: 10
  },
  {
    id: '11',
    slug: 'periodismo-de-moda',
    title: 'Periodismo de Moda',
    subtitle: 'PERIODISMO DE MODA · MERCADOS EMERGENTES Y LATINOAMERICANOS',
    shortDesc: 'Visión integral del papel del periodista en la industria de la moda contemporánea.',
    description: 'Este diplomado de 24 horas está enfocado en periodismo de moda y ofrece una visión integral del papel del periodista en la industria de la moda contemporánea, con especial énfasis en los mercados emergentes.\n\nA través de un enfoque multidisciplinario, se exploran los fundamentos del periodismo especializado, las dinámicas del mercado global y local, el análisis de tendencias y la construcción de narrativas que conecten con audiencias digitales e impresas. Este programa está diseñado para formar profesionales con capacidad crítica y creativa, capaces de contar historias de moda con contexto cultural, sensibilidad estética y conciencia del impacto social de la industria.',
    category: 'Periodismo',
    categoryColor: '#be185d',
    duration: '24 horas',
    modality: 'Virtual y Presencial',
    level: 'Medio – Avanzado',
    image: '/cursos/periodismo-moda.jpg',
    detailImages: ['/cursos-detalle/periodismo-moda-1.jpg', '/cursos-detalle/periodismo-moda-2.jpg'],
    price: '680.000',
    currency: 'COP',
    featured: false,
    order: 11
  },
  {
    id: '12',
    slug: 'decoracion-express',
    title: 'Decoración Express',
    subtitle: 'DECORACIÓN EXPRESS · DECORACIÓN DE INTERIORES PARA HOGAR',
    shortDesc: 'Interiorismo práctico, paletas de color y decoración de ambientes en tiempo récord.',
    description: 'Este taller de 12 horas está pensado para personas que quieren adquirir conocimientos prácticos y herramientas básicas de decoración para transformar sus espacios con estilo, funcionalidad y estética, bajo los fundamentos del interiorismo y la decoración: equilibrio, armonía y ritmo.',
    category: 'Diseño',
    categoryColor: '#059669',
    duration: '12 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico',
    image: '/cursos/decoracion-express.jpg',
    detailImages: ['/cursos-detalle/decoracion-express-1.jpg', '/cursos-detalle/decoracion-express-2.jpg'],
    price: '280.000',
    currency: 'COP',
    featured: false,
    order: 12
  },
  {
    id: '13',
    slug: 'coolhunting',
    title: 'Coolhunting & Tendencias',
    subtitle: 'COOLHUNTING & TENDENCIAS · CONSULTORÍAS EN MERCADOS Y TENDENCIAS',
    shortDesc: 'Identifica, analiza y anticipa tendencias emergentes en el mercado latinoamericano y colombiano.',
    description: 'Este curso de 38 horas está diseñado para profesionales del marketing, diseño, innovación y comunicación, así como para emprendedores, comerciantes y todos aquellos interesados en anticiparse al futuro del consumo y los estilos de vida.\n\nSe trata de un programa intensivo creado para proporcionar a los participantes las herramientas y metodologías necesarias para identificar, analizar y anticipar tendencias emergentes en contextos de cambio acelerado. A través del coolhunting, una disciplina clave para la innovación estratégica, los estudiantes aprenderán a reconocer señales culturales, tecnológicas y sociales que marcan el futuro del consumo en mercados emergentes, con especial énfasis en el mercado latinoamericano y colombiano.',
    category: 'Moda',
    categoryColor: '#7c3aed',
    duration: '38 horas',
    modality: 'Virtual y Presencial',
    level: 'Medio – Avanzado',
    image: '/cursos/coolhunting.jpg',
    detailImages: ['/cursos-detalle/coolhunting-1.jpg', '/cursos-detalle/coolhunting-2.jpg'],
    price: '370.000',
    currency: 'COP',
    featured: false,
    order: 13
  },
  {
    id: '14',
    slug: 'maquillaje-profesional',
    title: 'Maquillaje Profesional',
    subtitle: 'MAQUILLAJE PROFESIONAL · TÉCNICAS ACTUALES Y BEAUTY LOOKS',
    shortDesc: 'Formación práctica en técnicas de maquillaje social, editorial y de tendencias.',
    description: 'Curso enfocado en fundamentos y técnicas profesionales de maquillaje para diferentes contextos: social, editorial y contenido digital. Incluye preparación de piel, visagismo, colorimetría, correcciones, iluminación del rostro y acabados de larga duración.\n\nEl programa combina teoría y práctica para desarrollar habilidades aplicables en sesiones fotográficas, eventos y entornos comerciales, fortaleciendo criterio estético y ejecución técnica.',
    category: 'Belleza',
    categoryColor: '#db2777',
    duration: '24 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Avanzado',
    image: '/cursos/maquillaje.jpg',
    detailImages: [],
    price: '340.000',
    currency: 'COP',
    featured: false,
    order: 14
  },
  {
    id: '15',
    slug: 'podcasts-creacion-y-produccion',
    title: 'Podcasts: Creación y Producción',
    subtitle: 'PODCASTS · GUION, VOZ, GRABACIÓN Y PUBLICACIÓN',
    shortDesc: 'Aprende a crear un podcast desde la idea hasta su publicación en plataformas.',
    description: 'Curso práctico para diseñar, producir y lanzar un podcast con identidad propia. Se trabaja conceptualización, estructura de episodios, guion, locución, grabación, edición de audio y distribución.\n\nIncluye herramientas para mejorar narrativa, calidad sonora y estrategia de contenido, orientado a marcas personales, emprendimientos y creadores digitales.',
    category: 'Comunicación',
    categoryColor: '#2563eb',
    duration: '20 horas',
    modality: 'Virtual y Presencial',
    level: 'Básico – Medio',
    image: '/cursos/podcasts.jpg',
    detailImages: [],
    price: '320.000',
    currency: 'COP',
    featured: false,
    order: 15
  }
]

export function useCursos() {
  const cursosState = useState<Curso[]>('public-cursos', () => [...cursos])

  const loadCursosFromSupabase = async () => {
    return cursosState.value
  }

  const todos = computed(() => [...cursosState.value].sort((a, b) => a.order - b.order))
  const destacados = computed(() => cursosState.value.filter(c => c.featured).sort((a, b) => a.order - b.order))

  function getCurso(slug: string) {
    return cursosState.value.find(c => c.slug === slug) ?? null
  }

  return { todos, destacados, getCurso, loadCursosFromSupabase }
}
