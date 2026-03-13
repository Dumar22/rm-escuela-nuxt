import type { SupabaseClient } from '@supabase/supabase-js'

const staticModeError = {
  message: 'Supabase está desactivado temporalmente (modo estático).'
}

const createDisabledQuery = () => {
  const query: any = {
    data: null,
    error: staticModeError,
    select: () => query,
    insert: () => query,
    update: () => query,
    delete: () => query,
    eq: () => query,
    in: () => query,
    order: () => query,
    single: () => query,
    maybeSingle: () => query
  }

  query.then = (resolve: (value: any) => any) => Promise.resolve({ data: null, error: staticModeError }).then(resolve)
  return query
}

const disabledSupabaseClient = {
  from: () => createDisabledQuery(),
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null }, error: staticModeError }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ data: { user: null }, error: staticModeError }),
    signInWithOAuth: async () => ({ data: null, error: staticModeError })
  }
} as any

export const useSupabase = () => {
  const { $supabase } = useNuxtApp()
  return ($supabase || disabledSupabaseClient) as SupabaseClient
}
