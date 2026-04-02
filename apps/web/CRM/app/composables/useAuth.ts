import type {LoginInput, RegisterInput} from "~/schemas/auth.validation";

export const useAuth = () => {
  const token = useCookie("token");
  const api = useApi()

  const register = async (data: RegisterInput) => {
    try {
      const result = await api<{ token: string }>('/auth/register', {
        method: 'POST',
        body: data
      })
      token.value = result.token
      await navigateTo('/')
    } catch (err) {
      throw err
    }
  }

  const login = async (data: LoginInput) => {
    try {
      const result = await api<{ token: string }>('/auth/login', {
        method: 'POST',
        body: data
      })
      token.value = result.token
      await navigateTo('/')
    } catch (err) {
      throw err
    }
  }

  return { register, login }
}
