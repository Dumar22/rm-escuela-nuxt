# Setup Neon + Nuxt - RM Escuela

## Requisitos completados ✅
- Proyecto creado en Neon: `rm-escuela`
- NEON_URL configurada en `.env`
- Dependencias instaladas: `pg` y `bcryptjs`
- Rutas servidor creadas: `/api/courses`, `/api/blog`
- Composables actualizados para hablar a la API

## Pasos para activar

### 1. Ejecutar SQL en Neon
1. Abre consola de Neon en https://console.neon.tech
2. Selecciona tu proyecto **rm-escuela**
3. Ve a **SQL Editor**
4. Copia todo el contenido de `NEON_SETUP.sql` (en la raíz del proyecto)
5. Pega en el editor y ejecuta ✅

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Levantar servidor de desarrollo
```bash
pnpm dev
```

### 4. Probar en admin
- Abre http://localhost:3000/admin/login
- **Email**: `admin@rmescuela.com`
- **Password**: `admin123` (cambiar después)
- Ir a **Gestionar Cursos** → **Nuevo curso**

## Qué hace cada ruta

| Ruta | Método | Qué hace |
|------|--------|----------|
| `/api/courses` | GET | Lista todos los cursos |
| `/api/courses` | POST | Crea un nuevo curso |
| `/api/courses/[id]` | GET | Obtiene un curso por ID |
| `/api/courses/[id]` | PUT | Actualiza un curso |
| `/api/courses/[id]` | DELETE | Elimina un curso |
| `/api/blog` | GET | Lista todos los posts |
| `/api/blog` | POST | Crea un nuevo post |
| `/api/blog/[id]` | GET | Obtiene un post por ID |
| `/api/blog/[id]` | PUT | Actualiza un post |
| `/api/blog/[id]` | DELETE | Elimina un post |

## Estructura

```
app/
  ├── server/
  │   ├── api/
  │   │   ├── courses.ts           # GET/POST cursos
  │   │   ├── courses/
  │   │   │   └── [id].ts          # GET/PUT/DELETE curso por ID
  │   │   ├── blog.ts              # GET/POST posts
  │   │   └── blog/
  │   │       └── [id].ts          # GET/PUT/DELETE post por ID
  │   └── utils/
  │       └── db.ts                # Cliente Neon (pool PostgreSQL)
  ├── composables/
  │   ├── useCursos.ts         # Fetch a /api/courses
  │   └── useBlog.ts           # Fetch a /api/blog
  └── pages/
      └── admin/
          ├── cursos/
          │   ├── index.vue    # Lista y elimina cursos
          │   └── [id].vue     # Crea/edita cursos
          └── blog/
              ├── index.vue    # Lista y elimina posts
              └── [id].vue     # Crea/edita posts
```

## Autenticación

Hoy usamos **localStorage + email/password simple**. El usuario admin está en la app (`useAuth.ts`), no en la base de datos.

Para cambiar credenciales:
1. Ve a `app/composables/useAuth.ts`
2. Modifica en la función `signIn` el email/password permitidos

### Próximo: autenticación real en Neon
Cuando quieras escalar, créamos tabla `admin_users` en Neon con bcrypt y sesiones JWT.

## Troubleshooting

### Error: "Cannot find module 'pg'"
```bash
pnpm install
pnpm dev
```

### Error: "NEON_URL not configured"
- Verifica que `.env` tenga: `NEON_URL=postgresql://...`
- Reinicia el servidor: `Ctrl+C` y `pnpm dev`

### Cursos no cargan
- Abre DevTools → Network → revisa request a `/api/courses`
- Si error 500, mira consola del servidor (`pnpm dev`)
- Verifica que la tabla `courses` existe en Neon

### No puedo crear un curso
- Abre DevTools → Console
- Copia el error exacto
- Revisa que `/api/courses` respondió con error (Network tab)

## Próximos pasos

- [ ] Cambiar credenciales admin por defecto
- [ ] Pasar autenticación a tabla `admin_users` en Neon (producción)
- [ ] Agregar autenticación de estudiantes (futuro LMS)
- [ ] Setup de pagos (Wompi, Stripe, etc.)
