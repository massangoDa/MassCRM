export const useApi = () => {
  const token = useCookie('token')

  return $fetch.create({
    baseURL: '/backend',
    onRequest({ options }) {
      options.headers = new Headers(options.headers)
      options.headers.set("Authorization", `Bearer ${token.value}`)
    }
  })
}
