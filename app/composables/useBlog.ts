export interface BlogPost {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  author_role?: string
  date: string
  category: string
  image_url: string
  read_time?: string
  created_at?: string
  updated_at?: string
}

const normalizePost = (post: any): BlogPost => ({
  id: post.id ? String(post.id) : undefined,
  slug: post.slug ?? '',
  title: post.title ?? '',
  excerpt: post.excerpt ?? '',
  content: post.content ?? '',
  author: post.author ?? '',
  author_role: post.author_role ?? post.authorRole ?? '',
  date: post.date ?? '',
  category: post.category ?? '',
  image_url: post.image_url ?? post.imageUrl ?? '',
  read_time: post.read_time ?? post.readTime ?? '',
  created_at: post.created_at,
  updated_at: post.updated_at
})

const estadoPosts: BlogPost[] = [
  {
      id: '4',
      slug: 'pasarela-urban-manizales-moda',
      title: 'Pasarela Urban "Manizales Está de Moda"',
      excerpt: 'RM Modelos se prepara para uno de los eventos más grandes de la ciudad. Acompáñanos este 10, 11 y 12 de septiembre en una pasarela que marcará la pauta.',
      content: `
        La moda urbana se toma la ciudad. Este próximo **10, 11 y 12 de septiembre**, la capital caldense vivirá uno de los eventos más esperados del año: la **Pasarela Urban "Manizales Está de Moda"**.

        Con una apuesta agresiva, contemporánea y llena de talento local, **RM Modelos** asume la organización total de este evento que busca descentralizar el diseño y llevar la creatividad directamente a las calles con un estilo "Urban". 

        ### ¿Qué veremos en la pasarela?
        Durante tres días, el talento estará a flor de piel:
        - **Día 1 (10 de Sep):** Apertura de colecciones urbanas, enfocada en Streetwear y diseñadores emergentes de Manizales y el eje cafetero.
        - **Día 2 (11 de Sep):** Colecciones cápsula de marcas aliadas y muestras experimentales lideradas por los talentos de nuestra agencia RM.
        - **Día 3 (12 de Sep):** Gran cierre con la mejor selección de modelos, propuestas vanguardistas y música en vivo.

        ### Una plataforma para talentos
        Para **RM Modelos**, encabezar la producción de "Manizales Está de Moda" es un compromiso firme con la profesionalización de la industria en la región. Las mejores caras de nuestra escuela y agencia estarán pisando la pasarela, demostrando que en Manizales existe el talento, la actitud y la disciplina necesaria para las grandes ligas.

        **¡No te lo puedes perder!** Mantente atento a nuestras redes sociales para la revelación del lineup completo de diseñadores, venta de entradas e itinerario oficial.
      `,
      author: 'RM Familia',
      author_role: 'Organización',
      date: 'Septiembre 2026',
      category: 'Eventos',
      image_url: '/images/blog/pasarela_urban_manizales.jpg',
      read_time: '3 min de lectura'
    },
    {
      id: '5',
      slug: 'arte-y-expresion-visual-en-rm',
      title: 'Arte y Expresión Visual: Crear con Propósito',
      excerpt: 'El arte no es solo técnica: también es criterio, mensaje y sensibilidad. En RM impulsamos procesos creativos que convierten ideas en propuestas visuales sólidas.',
      content: `
        En RM Escuela Creativa, entendemos el arte como una herramienta para comunicar, transformar y construir identidad. No se trata únicamente de hacer piezas "bonitas", sino de desarrollar una mirada propia y una narrativa visual con intención.

        ### ¿Qué trabajamos en esta línea?
        - Lectura visual y análisis de referencias contemporáneas.
        - Composición, color y lenguaje gráfico aplicado a proyectos reales.
        - Desarrollo de portafolio con enfoque profesional.

        ### Del concepto a la pieza final
        Cada proceso artístico parte de una pregunta: ¿qué quiero decir y cómo lo hago visible? En nuestros espacios de formación, guiamos a los estudiantes para traducir conceptos en piezas con coherencia estética y valor comunicativo.

        El resultado es una práctica artística más consciente, actual y conectada con las industrias creativas.
      `,
      author: 'Equipo RM',
      author_role: 'Redacción',
      date: '14 de Marzo, 2026',
      category: 'Arte',
      image_url: '/images/blog/arte-blog.jpg',
      read_time: '4 min de lectura'
    },
    {
      id: '6',
      slug: 'creatividad-como-habito-profesional',
      title: 'Creatividad como Hábito Profesional',
      excerpt: 'Ser creativo no depende de la inspiración del momento. Se entrena con método, observación y práctica constante en contextos reales.',
      content: `
        Una de las ideas más limitantes en las industrias creativas es pensar que la creatividad aparece solo cuando "llega la musa". La realidad es otra: la creatividad se construye con disciplina y hábitos.

        ### Claves para entrenarla
        - Investigar referentes de forma crítica, no solo por tendencia.
        - Prototipar rápido para validar ideas.
        - Recibir retroalimentación y mejorar iterativamente.

        ### Crear bajo presión también se aprende
        En proyectos de moda, eventos, contenido y comunicación, los tiempos son cortos y las decisiones deben ser claras. Por eso trabajamos con ejercicios aplicados que fortalecen la toma de decisiones creativas en escenarios reales.

        Cuanto más se practica, más fluido se vuelve el proceso creativo.
      `,
      author: 'RM Familia',
      author_role: 'Formación',
      date: '14 de Marzo, 2026',
      category: 'Creatividad',
      image_url: '/images/blog/creatividad-blog.jpg',
      read_time: '3 min de lectura'
    },
    {
      id: '7',
      slug: 'innovacion-creativa-para-marcas',
      title: 'Innovación Creativa para Marcas y Proyectos',
      excerpt: 'Innovar no siempre significa inventar desde cero. Muchas veces implica reinterpretar lo existente y convertirlo en una experiencia relevante para la audiencia.',
      content: `
        La innovación creativa nace cuando conectamos observación de mercado, cultura y ejecución estratégica. Es el puente entre una idea atractiva y un resultado que realmente impacta.

        ### Innovar con enfoque
        - Detectar oportunidades reales en el comportamiento del consumidor.
        - Diseñar propuestas diferenciadoras con valor claro.
        - Ejecutar con coherencia visual, narrativa y técnica.

        ### De la idea a la acción
        En RM promovemos una innovación aplicable: soluciones que puedan implementarse en campañas, eventos, contenidos y productos. El objetivo no es solo llamar la atención, sino generar resultados medibles.

        Innovar también es decidir mejor, más rápido y con mayor visión.
      `,
      author: 'Ricardo Muñoz A.',
      author_role: 'Director General',
      date: '14 de Marzo, 2026',
      category: 'Innovación',
      image_url: '/images/blog/innovacion-blog.jpg',
      read_time: '4 min de lectura'
    },
    {
      id: '8',
      slug: 'moda-con-identidad-y-criterio',
      title: 'Moda con Identidad: Más Allá de la Tendencia',
      excerpt: 'La moda evoluciona cada temporada, pero el diferencial real está en construir una identidad visual consistente y auténtica.',
      content: `
        Hablar de moda hoy implica mucho más que seguir lo que está en auge. Las propuestas que permanecen son aquellas que logran una voz propia y coherente en cada colección, editorial o campaña.

        ### Puntos clave en la construcción de estilo
        - Definir una línea estética con intención.
        - Entender el contexto cultural de cada propuesta.
        - Adaptar tendencias sin perder autenticidad.

        ### Moda que comunica
        Cada decisión de estilismo, dirección de arte y casting transmite un mensaje. Por eso, formar criterio visual es tan importante como dominar la parte técnica.

        En RM trabajamos la moda como lenguaje creativo y profesional.
      `,
      author: 'Equipo RM',
      author_role: 'Moda y Dirección Creativa',
      date: '14 de Marzo, 2026',
      category: 'Moda',
      image_url: '/images/blog/moda-blog.jpg',
      read_time: '4 min de lectura'
    },
    {
      id: '9',
      slug: 'tendencias-cultura-y-consumo-2026',
      title: 'Tendencias 2026: Cultura, Estética y Consumo',
      excerpt: 'Las tendencias más relevantes de este año están marcadas por autenticidad, experiencias híbridas y nuevas formas de conexión entre marcas y comunidades.',
      content: `
        Las tendencias de 2026 muestran un cambio claro: las audiencias valoran más la experiencia, la transparencia y la narrativa de marca que la simple exposición publicitaria.

        ### Lo que estamos observando
        - Consumo de contenido más breve, pero con mayor intención.
        - Estéticas que mezclan nostalgia digital y acabados orgánicos.
        - Mayor búsqueda de experiencias presenciales con impacto en redes.

        ### ¿Cómo aplicar estas señales?
        Identificar tendencias no es repetir formatos. Es leer el contexto, seleccionar lo relevante para tu público y ejecutarlo con personalidad.

        Esta lectura estratégica permite anticipar movimientos y tomar mejores decisiones creativas y comerciales.
      `,
      author: 'RM Insights',
      author_role: 'Observatorio Creativo',
      date: '14 de Marzo, 2026',
      category: 'Tendencias',
      image_url: '/images/blog/tendencias-blog.jpg',
      read_time: '5 min de lectura'
    },
    {
      id: '1',
      slug: 'tendencias-fotografia-moda-2026',
      title: 'Tendencias en Fotografía de Moda para 2026',
      excerpt: 'Descubre las corrientes visuales y estéticas que dominarán las editoriales de moda este año. Un repaso por la iluminación, el estilismo y los mensajes detrás de la lente.',
      content: `
        La fotografía de moda está en constante evolución y este 2026 nos trae un enfoque renovado hacia lo natural y lo crudo. Atrás van quedando los retratos híper-editados y entramos en una era donde la "perfección imperfecta" toma el control.

        ### 1. El regreso de la fotografía analógica
        Hemos notado un resurgimiento enorme en el uso de cámaras de rollo de 35mm. Las texturas granulosas y la saturación natural de la película química le dan a las producciones un aspecto nostálgico pero vigente. ¡Anímate a quitarle el polvo a la antigua cámara de la familia!

        ### 2. Luz natural e imperfección
        Los grandes flashes de estudio se combinan ahora con luz natural directa. Las sombras duras no son un error, sino un recurso estilístico para marcar dimensiones y darle agresividad al retrato.

        ### 3. Inclusión y Realidad
        El modelaje sigue rompiendo barreras. La industria busca rostros con caracteres únicos, apartándose de los cánones tradicionales del siglo pasado y dándole foco a la diversidad real de las personas.

        En RM Escuela Creativa, nuestro curso de Fotografía de Moda está completamente actualizado con estas y más tendencias. ¡No te quedes atrás y empieza a dominar la cámara!
      `,
      author: 'Ricardo Muñoz A.',
      author_role: 'Director General',
      date: '3 de Marzo, 2026',
      category: 'Fotografía',
      image_url: '/cursos-detalle/fotografia-de-moda-1.jpg',
      read_time: '4 min de lectura'
    },
    {
      id: '2',
      slug: 'importancia-visual-merchandising',
      title: 'Por qué tu tienda necesita Visual Merchandising',
      excerpt: 'El espacio físico de venta sigue siendo vital. Aprende cómo la correcta disposición visual de tus productos puede incrementar tus ventas hasta en un 40%.',
      content: `
        ¿Alguna vez has entrado a una tienda y, sin saber por qué, te has sentido inmediatamente cómodo y con ganas de comprar? Eso no es magia, es **Visual Merchandising** aplicado correctamente.

        El Visual Merchandising no trata simplemente de "poner las cosas bonitas". Es una estrategia de comunicación directa entre el producto y el cliente a través del espacio, la iluminación, el color y el flujo de circulación.

        ### Puntos focales
        Crear "puntos focales" que dirijan los ojos del consumidor hacia donde tú deseas es fundamental. No todo el producto puede tener el mismo nivel jerárquico; de lo contrario, abrumarás a las personas.

        ### El viaje del cliente
        Mapear por dónde ingresará la persona, y cómo la vas a guiar a la caja de cobro es el verdadero arte del layout comercial. 

        Al comprender la psicología detrás del comportamiento humano dentro del espacio, podemos aumentar las métricas de conversión significativamente.
      `,
      author: 'Equipo RM',
      author_role: 'Redacción',
      date: '25 de Febrero, 2026',
      category: 'Merchandising',
      image_url: '/cursos-detalle/visual-merchandising-1.jpg',
      read_time: '3 min de lectura'
    },
    {
      id: '3',
      slug: 'que-hace-un-coolhunter',
      title: '¿Qué hace realmente un Coolhunter?',
      excerpt: 'Más allá de mirar redes sociales, el Coolhunting es la labor investigativa de rastrear el origen de una tendencia cultural, social y comercial antes de que explote.',
      content: `
        La palabra *Coolhunter* o "Cazador de Tendencias" suena a la profesión perfecta. Muchos asumen que un Coolhunter simplemente analiza Instagram o TikTok buscando lo que es "genial" en el momento. Pero la realidad es mucho más profunda.

        Un investigador de tendencias opera en la intersección de la sociología, la economía, el diseño y el marketing. Su objetivo no es saber qué está pasando, sino **por qué está pasando** y hacia dónde se dirigirá.

        ### Las 3 fases del Coolhunting
        1. **Observación Periférica:** Captar los primeros indicios de un cambio cultural (música, tribus urbanas, movimientos sociales).
        2. **Análisis de Innovación:** Entender por qué un producto disruptivo tiene éxito en su pequeño nicho inicial.
        3. **Traducción Comercial:** Convertir todos estos hallazgos en un informe accionable para que una marca de retail o una empresa pueda desarrollar un producto a futuro.

        Anticiparse al futuro te dará la rentabilidad que necesitas. ¿Te interesa profundizar? Tenemos el curso exacto para ti en RM Escuela.
      `,
      author: 'Ricardo Muñoz A.',
      author_role: 'Director General',
      date: '10 de Febrero, 2026',
      category: 'Tendencias',
      image_url: '/cursos-detalle/coolhunting-1.jpg',
      read_time: '5 min de lectura'
    }
  ]

export const useBlog = () => {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPosts = async (allowAutoSeed = true) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<{ data: BlogPost[] }>('/api/blog')
      const apiPosts = response?.data ?? []

      if (apiPosts.length > 0) {
        posts.value = apiPosts.map(normalizePost)
      } else if (allowAutoSeed) {
        // Si la tabla está vacía, sembrar los posts estáticos y recargar
        await seedPostsToApi()
        const retry = await $fetch<{ data: BlogPost[] }>('/api/blog')
        posts.value = (retry?.data ?? []).map(normalizePost)
      } else {
        posts.value = apiPosts.map(normalizePost)
      }
    } catch (err: any) {
      console.error('Error fetching posts:', err)
      error.value = err.message || 'Error al cargar los posts'
      // Fallback a datos estáticos si la API falla
      posts.value = estadoPosts.map(normalizePost)
    } finally {
      loading.value = false
    }
  }

  const seedPostsToApi = async () => {
    for (const p of estadoPosts) {
      const payload = {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: p.author,
        author_role: p.author_role,
        date: p.date,
        category: p.category,
        image_url: p.image_url,
        read_time: p.read_time
      }

      try {
        await $fetch('/api/blog', { method: 'POST', body: payload })
      } catch (err) {
        // Ignorar errores individuales y continuar con el resto
      }
    }
  }

  const loadPostsFromSupabase = async () => {
    await fetchPosts()
    return posts.value
  }

  const getPost = (slug: string) => posts.value.find(p => p.slug === slug)

  return {
    posts,
    loading,
    error,
    fetchPosts,
    seedPostsToApi,
    getPost,
    loadPostsFromSupabase
  }
}

