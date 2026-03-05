export const useBlog = () => {
  const posts = ref([
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
      authorRole: 'Organización',
      date: 'Septiembre 2026',
      category: 'Eventos',
      imageUrl: '/images/blog/pasarela_urban_manizales.jpg',
      readTime: '3 min de lectura'
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
      authorRole: 'Director General',
      date: '3 de Marzo, 2026',
      category: 'Fotografía',
      imageUrl: '/cursos-detalle/fotografia-de-moda-1.jpg',
      readTime: '4 min de lectura'
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
      authorRole: 'Redacción',
      date: '25 de Febrero, 2026',
      category: 'Merchandising',
      imageUrl: '/cursos-detalle/visual-merchandising-1.jpg',
      readTime: '3 min de lectura'
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
      authorRole: 'Director General',
      date: '10 de Febrero, 2026',
      category: 'Tendencias',
      imageUrl: '/cursos-detalle/coolhunting-1.jpg',
      readTime: '5 min de lectura'
    }
  ])

  const getPost = (slug: string) => posts.value.find(p => p.slug === slug)

  return {
    posts,
    getPost
  }
}
