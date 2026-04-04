export const useApi = () => {
  const token = useCookie('token')

  return $fetch.create({
    baseURL: '/backend',
    onRequest({ options }) {
      options.headers = new Headers(options.headers)
      if (token.value) {
        options.headers.set("Authorization", `Bearer ${token.value}`)
      }
    }
  })
}
