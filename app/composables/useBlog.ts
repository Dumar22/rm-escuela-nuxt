export const useBlog = () => {
  const posts = ref([
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
