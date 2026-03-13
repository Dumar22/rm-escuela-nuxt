interface AppUser {
  id: string
  email: string
  user_metadata: Record<string, any>
}

interface StoredAccount {
  id: string
  email: string
  password: string
  metadata: Record<string, any>
}

const STORAGE_USER_KEY = 'rm_static_current_user'
const STORAGE_ACCOUNTS_KEY = 'rm_static_accounts'

const readAccounts = (): StoredAccount[] => {
  if (!process.client) return []
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  }
  catch {
    return []
  }
}

const writeAccounts = (accounts: StoredAccount[]) => {
  if (!process.client) return
  localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts))
}

const readCurrentUser = (): AppUser | null => {
  if (!process.client) return null
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.id || !parsed?.email) return null
    return parsed as AppUser
  }
  catch {
    return null
  }
}

const writeCurrentUser = (currentUser: AppUser | null) => {
  if (!process.client) return
  if (!currentUser) {
    localStorage.removeItem(STORAGE_USER_KEY)
    return
  }
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser))
}

export const useAuth = () => {
  const user = useState<AppUser | null>('user', () => null)
  const loading = useState('authLoading', () => false)
  const hydrated = useState('authHydrated', () => false)

  const hydrateUser = () => {
    if (!process.client || hydrated.value) return
    user.value = readCurrentUser()
    hydrated.value = true
  }

  const getUser = async () => {
    hydrateUser()
    loading.value = true
    try {
      return user.value
    }
    catch (error) {
      console.error('Error getting user:', error)
      user.value = null
      return null
    }
    finally {
      loading.value = false
    }
  }

  const signIn = async (email: string, password: string) => {
    hydrateUser()
    loading.value = true
    try {
      const accounts = readAccounts()
      const account = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password)

      if (!account) {
        return { success: false, error: 'Credenciales inválidas (modo estático).' }
      }

      const currentUser: AppUser = {
        id: account.id,
        email: account.email,
        user_metadata: account.metadata || {}
      }

      user.value = currentUser
      writeCurrentUser(currentUser)
      return { success: true, user: currentUser }
    } catch (error: any) {
      console.error('Error signing in:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    hydrateUser()
    loading.value = true
    try {
      user.value = null
      writeCurrentUser(null)
      return { success: true }
    } catch (error: any) {
      console.error('Error signing out:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signUp = async (email: string, password: string, metadata = {}) => {
    hydrateUser()
    loading.value = true
    try {
      const accounts = readAccounts()
      const exists = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase())
      if (exists) {
        return { success: false, error: 'Ese correo ya está registrado.' }
      }

      const account: StoredAccount = {
        id: crypto.randomUUID(),
        email,
        password,
        metadata: metadata as Record<string, any>
      }

      writeAccounts([...accounts, account])
      return {
        success: true,
        user: {
          id: account.id,
          email: account.email,
          user_metadata: account.metadata
        }
      }
    } catch (error: any) {
      console.error('Error signing up:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signInWithOAuth = async (provider: 'google' | 'apple' | 'github' | 'azure' | 'discord') => {
    loading.value = true
    try {
      return {
        success: false,
        error: `Inicio de sesión con ${provider} desactivado temporalmente (modo estático).`
      }
    } catch (error: any) {
      console.error(`Error signing in with ${provider}:`, error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signInWithGoogle = async () => signInWithOAuth('google')
  const signInWithApple = async () => signInWithOAuth('apple')
  const signInWithMicrosoft = async () => signInWithOAuth('azure')
  const signInWithGitHub = async () => signInWithOAuth('github')
  const signInWithDiscord = async () => signInWithOAuth('discord')

  return {
    user,
    loading,
    getUser,
    signIn,
    signOut,
    signUp,
    signInWithOAuth,
    signInWithGoogle,
    signInWithApple,
    signInWithMicrosoft,
    signInWithGitHub,
    signInWithDiscord
  }
}
