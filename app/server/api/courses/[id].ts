import { query, queryOne } from '~/app/server/utils/db'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID del curso requerido' })
  }

  try {
    if (method === 'GET') {
      // Obtener un curso específico
      const course = await queryOne(`
        SELECT * FROM courses WHERE id = $1
      `, [id])

      if (!course) {
        throw createError({ statusCode: 404, statusMessage: 'Curso no encontrado' })
      }

      return { success: true, data: course }
    }

    if (method === 'PUT') {
      // Actualizar curso
      const body = await readBody(event)
      
      const { title, slug, subtitle, short_desc, description, category, category_color, duration, modality, level, image, detail_images, price, currency, featured, display_order } = body

      const course = await queryOne(`
        UPDATE courses 
        SET title = $1, slug = $2, subtitle = $3, short_desc = $4, description = $5, category = $6, category_color = $7, duration = $8, modality = $9, level = $10, image = $11, detail_images = $12, price = $13, currency = $14, featured = $15, display_order = $16, updated_at = NOW()
        WHERE id = $17
        RETURNING *
      `, [title, slug, subtitle, short_desc, description, category, category_color, duration, modality, level, image, JSON.stringify(detail_images || []), price, currency, featured || false, display_order || 1, id])

      if (!course) {
        throw createError({ statusCode: 404, statusMessage: 'Curso no encontrado' })
      }

      return { success: true, data: course }
    }

    if (method === 'DELETE') {
      // Eliminar curso
      await query(`DELETE FROM courses WHERE id = $1`, [id])
      return { success: true, message: 'Curso eliminado' }
    }
  } catch (error: any) {
    console.error('Error en courses/[id] API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error al procesar la solicitud'
    })
  }
})
