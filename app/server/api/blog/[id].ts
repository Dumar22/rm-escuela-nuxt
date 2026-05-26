import { query, queryOne } from '~/app/server/utils/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID del post requerido' })
  }

  try {
    if (method === 'GET') {
      // Obtener un post específico
      const post = await queryOne(`
        SELECT * FROM blog_posts WHERE id = $1
      `, [id])

      if (!post) {
        throw createError({ statusCode: 404, statusMessage: 'Post no encontrado' })
      }

      return { success: true, data: post }
    }

    if (method === 'PUT') {
      // Actualizar post
      const body = await readBody(event)
      
      const { title, slug, excerpt, content, author, author_role, date, category, image_url, read_time } = body

      const post = await queryOne(`
        UPDATE blog_posts 
        SET title = $1, slug = $2, excerpt = $3, content = $4, author = $5, author_role = $6, date = $7, category = $8, image_url = $9, read_time = $10, updated_at = NOW()
        WHERE id = $11
        RETURNING *
      `, [title, slug, excerpt, content, author, author_role, date, category, image_url, read_time, id])

      if (!post) {
        throw createError({ statusCode: 404, statusMessage: 'Post no encontrado' })
      }

      return { success: true, data: post }
    }

    if (method === 'DELETE') {
      // Eliminar post
      await query(`DELETE FROM blog_posts WHERE id = $1`, [id])
      return { success: true, message: 'Post eliminado' }
    }
  } catch (error: any) {
    console.error('Error en blog/[id] API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error al procesar la solicitud'
    })
  }
})
