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
| `/api/contact` | POST | Guarda mensajes del formulario de contacto |

## Notificaciones del formulario (Email + WhatsApp)

El endpoint `/api/contact` ahora puede notificar al equipo por email y WhatsApp cuando entra un mensaje.

Configura estas variables en tu `.env`:

```bash
# Email via Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_NOTIFICATION_FROM_EMAIL=RM Escuela <notificaciones@tu-dominio.com>
CONTACT_NOTIFICATION_TO_EMAILS=equipo1@tu-dominio.com,equipo2@tu-dominio.com

# WhatsApp via Meta Cloud API
WHATSAPP_API_TOKEN=EAAxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_TEAM_TO=573001112233
```

Notas:
- Si faltan variables de configuración, el mensaje igual se guarda en base de datos y la notificación se omite.
- `WHATSAPP_TEAM_TO` debe ir en formato internacional, sin `+` ni espacios (ejemplo: `573001112233`).

## Estructura

```
app/
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

server/
    ├── api/
    │   ├── courses.ts           # GET/POST cursos
    │   ├── courses/
    │   │   └── [id].ts          # GET/PUT/DELETE curso por ID
    │   ├── blog.ts              # GET/POST posts
    │   ├── contact.ts           # POST mensajes de contacto
    │   └── blog/
    │       └── [id].ts          # GET/PUT/DELETE post por ID
    └── utils/
            └── db.ts                # Cliente Neon (pool PostgreSQL)
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

### El formulario de contacto devuelve error 500
- Verifica que existe la tabla `contact_messages` en Neon
- Si tu DB ya estaba creada antes de este cambio, ejecuta este SQL manualmente:

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    course TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
```

## Próximos pasos

- [ ] Cambiar credenciales admin por defecto
- [ ] Pasar autenticación a tabla `admin_users` en Neon (producción)
- [ ] Agregar autenticación de estudiantes (futuro LMS)
- [ ] Setup de pagos (Wompi, Stripe, etc.)
