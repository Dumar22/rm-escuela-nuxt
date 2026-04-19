-- ============================================
-- SCHEMA PARA RM ESCUELA EN NEON
-- PostgreSQL (sin Supabase Auth)
-- ============================================

-- Tabla: admin_users (para autenticación local)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin', -- admin | editor
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla: blog_posts
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

-- Tabla: courses
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

-- Índices para courses
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_order ON courses(display_order ASC);

-- Tabla: course_orders (órdenes de compra)
CREATE TABLE IF NOT EXISTS course_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
  student_email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_phone TEXT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'COP',
  payment_method TEXT, -- efectivo | transferencia | tarjeta
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed
  proof_url TEXT,
  admin_notes TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para course_orders
CREATE INDEX IF NOT EXISTS idx_course_orders_course_id ON course_orders(course_id);
CREATE INDEX IF NOT EXISTS idx_course_orders_payment_status ON course_orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_course_orders_student_email ON course_orders(student_email);

-- Insertar un usuario admin por defecto (email: admin@rmescuela.com, password: admin123)
-- La contraseña debe reemplazarse después por una real hasheada
INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES ('admin@rmescuela.com', 'to_be_replaced_with_bcrypt_hash', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

COMMIT;
