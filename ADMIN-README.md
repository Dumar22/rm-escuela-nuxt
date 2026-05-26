# Panel Administrativo - RM Escuela Nuxt

## 📋 Resumen de la Implementación

Se ha creado un **panel administrativo completo** para gestionar el contenido dinámico del sitio web de RM Escuela Creativa.

### ✅ Funcionalidades Implementadas

#### 1. **Sistema de Autenticación**
- Login/Logout con Supabase Auth
- Middleware de protección de rutas
- Composable `useAuth` para gestión de sesión

#### 2. **Panel Administrativo**
- Dashboard con estadísticas
- Layout admin con sidebar de navegación
- Accesos rápidos a todas las secciones

#### 3. **CRUD del Blog (Completo)**
- ✅ Listar todos los posts
- ✅ Crear nuevo post
- ✅ Editar post existente
- ✅ Eliminar post con confirmación
- ✅ Generación automática de slug
- ✅ Vista previa de imagen
- ✅ Soporte para Markdown básico

#### 4. **Secciones Placeholder (Para futuro desarrollo)**
- Gestión de Cursos
- Editor de "Nosotros"
- Editor de "Contacto"

---

## 🚀 Configuración Inicial

### 1. Configurar Supabase

#### A. Crear la Base de Datos

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Abre **SQL Editor** en el menú lateral
3. Copia todo el contenido del archivo `supabase-schema.sql`
4. Pega el código en el editor SQL
5. Haz clic en **Run** para ejecutar el script

Esto creará:
- Tabla `blog_posts` con todos los campos necesarios
- Índices para mejorar el rendimiento
- Row Level Security (RLS) configurado
- Políticas de seguridad para lectura pública y escritura autenticada
- 4 posts de ejemplo migrados desde el composable estático

#### B. Crear un Usuario Admin

1. En Supabase, ve a **Authentication** → **Users**
2. Haz clic en **Add user** → **Create new user**
3. Ingresa un email y contraseña
4. Guarda las credenciales en un lugar seguro

### 2. Verificar Variables de Entorno

Tu archivo `.env` ya debe tener:

```env
SUPABASE_URL=https://qnwgvqirdugclysneakj.supabase.co
SUPABASE_KEY=sb_publishable_w4_isuDdLF2oo956uJPkwg_50S8E5Gp
```

> ⚠️ **Importante**: Estas variables ya están configuradas en `nuxt.config.ts` y el plugin de Supabase.

---

## 🎯 Uso del Panel Admin

### Acceder al Panel

1. Inicia el servidor de desarrollo:
```bash
pnpm dev
```

2. Navega a: `http://localhost:3001/admin/login`

3. Ingresa las credenciales del usuario que creaste en Supabase

4. Serás redirigido al dashboard en: `http://localhost:3001/admin`

### Gestionar el Blog

#### Crear un Nuevo Post

1. En el dashboard, haz clic en **"Gestionar Blog"** o navega directamente a `/admin/blog`
2. Haz clic en **"Nuevo Post"**
3. Completa todos los campos:
   - **Título**: Se generará automáticamente el slug
   - **Slug**: URL amigable (editable)
   - **Extracto**: Descripción breve para SEO
   - **Contenido**: Texto completo con soporte Markdown
   - **Autor y Rol**: Información del autor
   - **Fecha**: Formato libre (ej: "15 de Marzo, 2026")
   - **Categoría**: Selecciona una categoría predefinida
   - **URL de Imagen**: Ruta de la imagen en `/public`
   - **Tiempo de Lectura**: Ej: "5 min de lectura"
4. Haz clic en **"Publicar Post"**

#### Editar un Post

1. En la lista de posts, haz clic en el botón **"Editar"**
2. Modifica los campos necesarios
3. Haz clic en **"Actualizar Post"**

#### Eliminar un Post

1. En la lista de posts, haz clic en el botón **"Eliminar"**
2. Confirma la acción en el modal
3. El post se eliminará de forma permanente

### Markdown Soportado

El editor de contenido soporta Markdown básico:

```markdown
**Texto en negrita**
*Texto en cursiva*
### Título nivel 3
- Lista item 1
- Lista item 2
```

---

## 📂 Estructura de Archivos

```
app/
├── composables/
│   ├── useAuth.ts              # Gestión de autenticación
│   ├── useSupabase.ts          # Cliente de Supabase tipado
│   ├── useBlog.ts              # Composable original (legacy)
│   └── useCursos.ts
├── middleware/
│   └── auth.ts                 # Protección de rutas admin
├── layouts/
│   └── admin.vue               # Layout del panel admin
├── pages/
│   ├── admin/
│   │   ├── index.vue           # Dashboard principal
│   │   ├── login.vue           # Página de login
│   │   ├── blog/
│   │   │   ├── index.vue       # Lista de posts
│   │   │   └── [id].vue        # Crear/Editar post
│   │   ├── cursos/
│   │   │   └── index.vue       # (Placeholder)
│   │   ├── nosotros.vue        # (Placeholder)
│   │   └── contacto.vue        # (Placeholder)
│   └── ...
├── plugins/
│   └── supabase.client.ts      # Plugin de inicialización
└── ...
```

---

## 🗄️ Esquema de Base de Datos

### Tabla: `blog_posts`

| Campo         | Tipo   | Descripción                           |
|--------------|--------|---------------------------------------|
| id           | UUID   | ID único del post (auto-generado)    |
| title        | TEXT   | Título del artículo                   |
| slug         | TEXT   | URL amigable (único)                  |
| excerpt      | TEXT   | Extracto/descripción breve            |
| content      | TEXT   | Contenido completo (Markdown)         |
| author       | TEXT   | Nombre del autor                      |
| author_role  | TEXT   | Rol del autor (opcional)              |
| date         | TEXT   | Fecha de publicación (formato libre)  |
| category     | TEXT   | Categoría del artículo                |
| image_url    | TEXT   | URL de la imagen destacada            |
| read_time    | TEXT   | Tiempo estimado de lectura (opcional) |
| created_at   | TIMESTAMPTZ | Fecha de creación                |
| updated_at   | TIMESTAMPTZ | Última actualización             |

---

## 🔒 Seguridad

### Row Level Security (RLS)

La tabla `blog_posts` tiene RLS habilitado con las siguientes políticas:

- **Lectura pública**: Cualquiera puede leer los posts (para el frontend público)
- **Escritura autenticada**: Solo usuarios autenticados pueden crear/editar/eliminar

### Protección de Rutas

Todas las rutas bajo `/admin` (excepto `/admin/login`) están protegidas por el middleware `auth.ts`:
- Verifica que exista una sesión activa
- Redirige a `/admin/login` si no hay usuario autenticado

---

## 🔄 Migración de Datos

Los posts actuales en `useBlog.ts` **ya están incluidos** en el script SQL como datos iniciales. Después de ejecutar el script, estos posts estarán disponibles en la base de datos.

Si deseas mantener ambos sistemas temporalmente:
1. Los posts en `useBlog.ts` seguirán funcionando en el frontend
2. El panel admin trabaja directamente con Supabase
3. Actualiza `app/pages/blog/index.vue` y `app/pages/blog/[slug].vue` para leer desde Supabase cuando estés listo

---

## 🎨 Próximos Pasos

### Secciones Pendientes

1. **CRUD de Cursos**
   - Crear tabla `cursos` en Supabase
   - Implementar formulario similar al del blog
   - Migrar datos de `useCursos.ts`

2. **Editor de "Nosotros"**
   - Tabla `content_pages` para contenido estático
   - Formulario con campos para cada sección
   - Sincronización con el frontend

3. **Editor de "Contacto"**
   - Gestión de información de contacto
   - Mensajes/solicitudes recibidas

4. **Sistema de Usuarios Completo**
   - Gestión de roles (admin, editor, estudiante)
   - Registro de estudiantes
   - Sistema de compra e inscripción a cursos

5. **Editor Visual de Hero**
   - Builder de componentes
   - Gestión de sliders/banners

---

## 🐛 Debugging

### Ver logs de Supabase

En el navegador, abre las DevTools y busca errores en la consola si algo no funciona.

### Verificar políticas RLS

Si no puedes crear/editar posts:
1. Ve a **Table Editor** en Supabase
2. Selecciona `blog_posts`
3. Ve a la pestaña **Policies**
4. Verifica que las 4 políticas estén activas

### Limpiar sesión

Si tienes problemas de autenticación:
```javascript
// Ejecuta esto en la consola del navegador
localStorage.clear()
```

---

## 📞 Soporte

Si encuentras algún problema o necesitas ayuda con la implementación, revisa:
1. Los logs en la consola del navegador
2. Los logs del servidor de desarrollo
3. El panel de **Logs** en Supabase

---

¡Tu panel administrativo está listo para usar! 🎉
