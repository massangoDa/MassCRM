const PUBLIC_ROUTES = new Set(["/login", "/register"])

export default defineNuxtRouteMiddleware(async (to) => {
  if (PUBLIC_ROUTES.has(to.path)) {
    return
  }

  const result = await verifyToken()
  if (!result) {
    return navigateTo("/login", { replace: true })
  }
})

export const verifyToken = async () => {
  const token = useCookie("token")
  if (!token.value) {
    return null
  }

  try {
    const api = useApi()
    return await api<{ token: string }>("/auth/verifyToken", {
      method: 'GET'
    })
  } catch (err) {
    return null
  }
}
