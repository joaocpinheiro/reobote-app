import { signInForm } from '@/app/login/formSignIn'
import axios from 'axios'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

export async function handleSignIn(data: signInForm) {
  const { email, password } = data
  const payload = {
    email,
    password,
    persistent: true,
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const responseData = response.data

    if (!responseData.access_token) {
      throw new Error('Token de acesso não encontrado na resposta da API.')
    }
    const token = responseData.access_token
    Cookies.set('X-CSRF-TOKEN', token, { expires: 7, secure: true })
    toast.success('Login bem-sucedido! Redirecionando para o dashboard...')
  } catch (error) {
    console.error('Erro:', error)
    toast.error('Erro de rede. Por favor, tente novamente.')
  }
}
