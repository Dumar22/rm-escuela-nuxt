export default defineNuxtRouteMiddleware(async () => {
  const { getUser } = useAuth()
  const user = await getUser()

  if (!user) {
    return navigateTo('/acceso')
  }
})
