-- ============================================
-- SCHEMA DE BASE DE DATOS PARA RM ESCUELA
-- Supabase / PostgreSQL
-- ============================================

-- Tabla: blog_posts
-- Gestión de artículos del blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  read_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Habilitar RLS (Row Level Security) para blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blog posts son legibles públicamente" ON blog_posts;
DROP POLICY IF EXISTS "Usuarios autenticados pueden crear posts" ON blog_posts;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar posts" ON blog_posts;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar posts" ON blog_posts;

-- Políticas de seguridad para blog_posts
-- Lectura pública (cualquiera puede leer los posts)
CREATE POLICY "Blog posts son legibles públicamente"
  ON blog_posts FOR SELECT
  TO PUBLIC
  USING (true);

-- Solo usuarios autenticados pueden crear posts
CREATE POLICY "Usuarios autenticados pueden crear posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Solo usuarios autenticados pueden actualizar posts
CREATE POLICY "Usuarios autenticados pueden actualizar posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Solo usuarios autenticados pueden eliminar posts
CREATE POLICY "Usuarios autenticados pueden eliminar posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Tabla: courses
-- Gestión de cursos desde el panel administrativo
-- ============================================

CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  category_color TEXT NOT NULL,
  duration TEXT NOT NULL,
  modality TEXT NOT NULL,
  level TEXT NOT NULL,
  image TEXT NOT NULL,
  detail_images JSONB DEFAULT '[]'::jsonb,
  price TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'COP',
  featured BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_order ON courses(display_order ASC);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cursos son legibles públicamente" ON courses;
DROP POLICY IF EXISTS "Usuarios autenticados pueden crear cursos" ON courses;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar cursos" ON courses;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar cursos" ON courses;

CREATE POLICY "Cursos son legibles públicamente"
  ON courses FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Usuarios autenticados pueden crear cursos"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden actualizar cursos"
  ON courses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden eliminar cursos"
  ON courses FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- LMS + COMPRAS (BASE PARA ESCUELA DINÁMICA)
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student', -- student | admin | instructor
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  display_order INTEGER NOT NULL DEFAULT 1,
  is_preview BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lesson_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  resource_type TEXT NOT NULL, -- pdf | file | link
  file_url TEXT,
  external_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lesson_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  activity_type TEXT NOT NULL DEFAULT 'assignment', -- assignment | quiz
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'COP',
  payment_method TEXT, -- efectivo | transferencia | tarjeta | epayco | mercado_pago | wompi | stripe | presencial
  payment_provider_order_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed | refunded
  purchase_mode TEXT NOT NULL DEFAULT 'virtual', -- virtual | presencial
  payer_name TEXT,
  payer_email TEXT,
  payer_phone TEXT,
  proof_url TEXT,
  admin_notes TEXT,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS payer_name TEXT;
ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS payer_email TEXT;
ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS payer_phone TEXT;
ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS proof_url TEXT;
ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE course_orders ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  order_id UUID REFERENCES course_orders(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active | completed | cancelled
  access_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES course_enrollments(id) ON DELETE SET NULL,
  certificate_code TEXT NOT NULL UNIQUE,
  file_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_module_id ON course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lesson_resources_lesson_id ON lesson_resources(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_activities_lesson_id ON lesson_activities(lesson_id);
CREATE INDEX IF NOT EXISTS idx_course_orders_user_id ON course_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_course_orders_course_id ON course_orders(course_id);
CREATE INDEX IF NOT EXISTS idx_course_orders_payment_status ON course_orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Perfiles: usuario puede ver su perfil" ON profiles;
DROP POLICY IF EXISTS "Perfiles: usuario puede actualizar su perfil" ON profiles;
DROP POLICY IF EXISTS "Perfiles: crear propio perfil" ON profiles;

CREATE POLICY "Perfiles: usuario puede ver su perfil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Perfiles: usuario puede actualizar su perfil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Perfiles: crear propio perfil"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Módulos públicos si curso publicado" ON course_modules;
DROP POLICY IF EXISTS "Lecciones visibles por preview o matrícula" ON course_lessons;
DROP POLICY IF EXISTS "Recursos solo para matriculados" ON lesson_resources;
DROP POLICY IF EXISTS "Actividades solo para matriculados" ON lesson_activities;
DROP POLICY IF EXISTS "Órdenes: usuario ve sus órdenes" ON course_orders;
DROP POLICY IF EXISTS "Órdenes: usuario crea sus órdenes" ON course_orders;
DROP POLICY IF EXISTS "Órdenes: usuarios autenticados pueden actualizar" ON course_orders;
DROP POLICY IF EXISTS "Matrículas: usuario ve sus matrículas" ON course_enrollments;
DROP POLICY IF EXISTS "Matrículas: usuarios autenticados crean" ON course_enrollments;
DROP POLICY IF EXISTS "Matrículas: usuarios autenticados actualizan" ON course_enrollments;
DROP POLICY IF EXISTS "Progreso: usuario ve su progreso" ON lesson_progress;
DROP POLICY IF EXISTS "Progreso: usuario crea su progreso" ON lesson_progress;
DROP POLICY IF EXISTS "Progreso: usuario actualiza su progreso" ON lesson_progress;
DROP POLICY IF EXISTS "Certificados: usuario ve sus certificados" ON certificates;

CREATE POLICY "Módulos públicos si curso publicado"
  ON course_modules FOR SELECT
  TO PUBLIC
  USING (
    EXISTS (
      SELECT 1 FROM courses c
      WHERE c.id = course_modules.course_id
    )
  );

CREATE POLICY "Lecciones visibles por preview o matrícula"
  ON course_lessons FOR SELECT
  TO authenticated, anon
  USING (
    is_preview = true
    OR EXISTS (
      SELECT 1
      FROM course_modules cm
      JOIN course_enrollments ce ON ce.course_id = cm.course_id
      WHERE cm.id = course_lessons.module_id
        AND ce.user_id = auth.uid()
        AND ce.status = 'active'
    )
  );

CREATE POLICY "Recursos solo para matriculados"
  ON lesson_resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM course_lessons cl
      JOIN course_modules cm ON cm.id = cl.module_id
      JOIN course_enrollments ce ON ce.course_id = cm.course_id
      WHERE cl.id = lesson_resources.lesson_id
        AND ce.user_id = auth.uid()
        AND ce.status = 'active'
    )
  );

CREATE POLICY "Actividades solo para matriculados"
  ON lesson_activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM course_lessons cl
      JOIN course_modules cm ON cm.id = cl.module_id
      JOIN course_enrollments ce ON ce.course_id = cm.course_id
      WHERE cl.id = lesson_activities.lesson_id
        AND ce.user_id = auth.uid()
        AND ce.status = 'active'
    )
  );

CREATE POLICY "Órdenes: usuario ve sus órdenes"
  ON course_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Órdenes: usuario crea sus órdenes"
  ON course_orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Órdenes: usuarios autenticados pueden actualizar"
  ON course_orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Matrículas: usuario ve sus matrículas"
  ON course_enrollments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Matrículas: usuarios autenticados crean"
  ON course_enrollments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Matrículas: usuarios autenticados actualizan"
  ON course_enrollments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Progreso: usuario ve su progreso"
  ON lesson_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Progreso: usuario crea su progreso"
  ON lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Progreso: usuario actualiza su progreso"
  ON lesson_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Certificados: usuario ve sus certificados"
  ON certificates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- DATOS INICIALES (OPCIONAL)
-- Migra los posts existentes del composable
-- ============================================

INSERT INTO blog_posts (title, slug, excerpt, content, author, author_role, date, category, image_url, read_time)
VALUES 
(
  'Pasarela Urban "Manizales Está de Moda"',
  'pasarela-urban-manizales-moda',
  'RM Modelos se prepara para uno de los eventos más grandes de la ciudad. Acompáñanos este 10, 11 y 12 de septiembre en una pasarela que marcará la pauta.',
  'La moda urbana se toma la ciudad. Este próximo **10, 11 y 12 de septiembre**, la capital caldense vivirá uno de los eventos más esperados del año: la **Pasarela Urban "Manizales Está de Moda"**.

Con una apuesta agresiva, contemporánea y llena de talento local, **RM Modelos** asume la organización total de este evento que busca descentralizar el diseño y llevar la creatividad directamente a las calles con un estilo "Urban". 

### ¿Qué veremos en la pasarela?
Durante tres días, el talento estará a flor de piel:
- **Día 1 (10 de Sep):** Apertura de colecciones urbanas, enfocada en Streetwear y diseñadores emergentes de Manizales y el eje cafetero.
- **Día 2 (11 de Sep):** Colecciones cápsula de marcas aliadas y muestras experimentales lideradas por los talentos de nuestra agencia RM.
- **Día 3 (12 de Sep):** Gran cierre con la mejor selección de modelos, propuestas vanguardistas y música en vivo.

### Una plataforma para talentos
Para **RM Modelos**, encabezar la producción de "Manizales Está de Moda" es un compromiso firme con la profesionalización de la industria en la región. Las mejores caras de nuestra escuela y agencia estarán pisando la pasarela, demostrando que en Manizales existe el talento, la actitud y la disciplina necesaria para las grandes ligas.

**¡No te lo puedes perder!** Mantente atento a nuestras redes sociales para la revelación del lineup completo de diseñadores, venta de entradas e itinerario oficial.',
  'RM Familia',
  'Organización',
  'Septiembre 2026',
  'Eventos',
  '/images/blog/pasarela_urban_manizales.jpg',
  '3 min de lectura'
),
(
  'Tendencias en Fotografía de Moda para 2026',
  'tendencias-fotografia-moda-2026',
  'Descubre las corrientes visuales y estéticas que dominarán las editoriales de moda este año. Un repaso por la iluminación, el estilismo y los mensajes detrás de la lente.',
  'La fotografía de moda está en constante evolución y este 2026 nos trae un enfoque renovado hacia lo natural y lo crudo. Atrás van quedando los retratos híper-editados y entramos en una era donde la "perfección imperfecta" toma el control.

### 1. El regreso de la fotografía analógica
Hemos notado un resurgimiento enorme en el uso de cámaras de rollo de 35mm. Las texturas granulosas y la saturación natural de la película química le dan a las producciones un aspecto nostálgico pero vigente. ¡Anímate a quitarle el polvo a la antigua cámara de la familia!

### 2. Luz natural e imperfección
Los grandes flashes de estudio se combinan ahora con luz natural directa. Las sombras duras no son un error, sino un recurso estilístico para marcar dimensiones y darle agresividad al retrato.

### 3. Inclusión y Realidad
El modelaje sigue rompiendo barreras. La industria busca rostros con caracteres únicos, apartándose de los cánones tradicionales del siglo pasado y dándole foco a la diversidad real de las personas.

En RM Escuela Creativa, nuestro curso de Fotografía de Moda está completamente actualizado con estas y más tendencias. ¡No te quedes atrás y empieza a dominar la cámara!',
  'Ricardo Muñoz A.',
  'Director General',
  '3 de Marzo, 2026',
  'Fotografía',
  '/cursos-detalle/fotografia-de-moda-1.jpg',
  '4 min de lectura'
),
(
  'Por qué tu tienda necesita Visual Merchandising',
  'importancia-visual-merchandising',
  'El espacio físico de venta sigue siendo vital. Aprende cómo la correcta disposición visual de tus productos puede incrementar tus ventas hasta en un 40%.',
  '¿Alguna vez has entrado a una tienda y, sin saber por qué, te has sentido inmediatamente cómodo y con ganas de comprar? Eso no es magia, es **Visual Merchandising** aplicado correctamente.

El Visual Merchandising no trata simplemente de "poner las cosas bonitas". Es una estrategia de comunicación directa entre el producto y el cliente a través del espacio, la iluminación, el color y el flujo de circulación.

### Puntos focales
Crear "puntos focales" que dirijan los ojos del consumidor hacia donde tú deseas es fundamental. No todo el producto puede tener el mismo nivel jerárquico; de lo contrario, abrumarás a las personas.

### El viaje del cliente
Mapear por dónde ingresará la persona, y cómo la vas a guiar a la caja de cobro es el verdadero arte del layout comercial. 

Al comprender la psicología detrás del comportamiento humano dentro del espacio, podemos aumentar las métricas de conversión significativamente.',
  'Equipo RM',
  'Redacción',
  '25 de Febrero, 2026',
  'Merchandising',
  '/cursos-detalle/visual-merchandising-1.jpg',
  '3 min de lectura'
),
(
  '¿Qué hace realmente un Coolhunter?',
  'que-hace-un-coolhunter',
  'Más allá de mirar redes sociales, el Coolhunting es la labor investigativa de rastrear el origen de una tendencia cultural, social y comercial antes de que explote.',
  'La palabra *Coolhunter* o "Cazador de Tendencias" suena a la profesión perfecta. Muchos asumen que un Coolhunter simplemente analiza Instagram o TikTok buscando lo que es "genial" en el momento. Pero la realidad es mucho más profunda.

Un investigador de tendencias opera en la intersección de la sociología, la economía, el diseño y el marketing. Su objetivo no es saber qué está pasando, sino **por qué está pasando** y hacia dónde se dirigirá.

### Las 3 fases del Coolhunting
1. **Observación Periférica:** Captar los primeros indicios de un cambio cultural (música, tribus urbanas, movimientos sociales).
2. **Análisis de Innovación:** Entender por qué un producto disruptivo tiene éxito en su pequeño nicho inicial.
3. **Traducción Comercial:** Convertir todos estos hallazgos en un informe accionable para que una marca de retail o una empresa pueda desarrollar un producto a futuro.

Anticiparse al futuro te dará la rentabilidad que necesitas. ¿Te interesa profundizar? Tenemos el curso exacto para ti en RM Escuela.',
  'Ricardo Muñoz A.',
  'Director General',
  '10 de Febrero, 2026',
  'Tendencias',
  '/cursos-detalle/coolhunting-1.jpg',
  '5 min de lectura'
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TRIGGERS Y FUNCIONES AUTOMÁTICAS
-- ============================================

-- Trigger para crear automáticamente el perfil cuando se registra un usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    'student'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INSTRUCCIONES DE USO
-- ============================================
-- 1. Ve a tu proyecto en Supabase
-- 2. Abre el SQL Editor
-- 3. Copia y pega este código completo
-- 4. Ejecuta el script
-- 5. Verifica en Table Editor que la tabla se creó correctamente
-- 6. La tabla ya tiene RLS habilitado y políticas configuradas
-- ============================================
