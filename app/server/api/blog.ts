import { query, queryOne } from '~/app/server/utils/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    if (method === 'GET') {
      // Listar todos los posts
      const posts = await query(`
        SELECT * FROM blog_posts 
        ORDER BY created_at DESC
      `)
      return { success: true, data: posts }
    }

    if (method === 'POST') {
      // Crear nuevo post
      const body = await readBody(event)
      
      const { title, slug, excerpt, content, author, author_role, date, category, image_url, read_time } = body

      if (!title || !slug || !content) {
        throw createError({ statusCode: 400, statusMessage: 'Faltan campos requeridos' })
      }

      const result = await queryOne(`
        INSERT INTO blog_posts (title, slug, excerpt, content, author, author_role, date, category, image_url, read_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          author = EXCLUDED.author,
          author_role = EXCLUDED.author_role,
          date = EXCLUDED.date,
          category = EXCLUDED.category,
          image_url = EXCLUDED.image_url,
          read_time = EXCLUDED.read_time,
          updated_at = NOW()
        RETURNING *
      `, [title, slug, excerpt, content, author, author_role, date, category, image_url, read_time])

      return { success: true, data: result }
    }
  } catch (error: any) {
    console.error('Error en blog API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error al procesar la solicitud'
    })
  }
})
