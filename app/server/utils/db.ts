import { Pool } from 'pg'

let pool: Pool

export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.NEON_URL
    
    if (!databaseUrl) {
      throw new Error('NEON_URL no está configurada en las variables de entorno')
    }

    pool = new Pool({
      connectionString: databaseUrl,
      // Timeouts para evitar que las conexiones se cuelguen
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      max: 20,
    })
  }

  return pool
}

export async function query(text: string, params?: any[]) {
  const pool = getPool()
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result.rows
  } finally {
    client.release()
  }
}

export async function queryOne(text: string, params?: any[]) {
  const result = await query(text, params)
  return result[0] || null
}
