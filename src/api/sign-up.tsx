import { signUpForm } from '@/app/sign-up/formSignUp'
import Cookies from 'js-cookie'

export async function handleSignUp(data: signUpForm) {
  const { name, email, password, confirmPassword } = data
  const payload = {
    name,
    email,
    password,
    password_confirmation: confirmPassword,
    persistent: true,
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()

    if (!response.statusText) {
      throw new Error('Resposta vazia da API.')
    }

    const token = result.access_token

    Cookies.set('X-CSRF-TOKEN', token, { expires: 7, secure: true })
    return { success: true, redirectUrl: '/dashboard' }
  } catch (error) {
    console.error(error)
    throw error
  }
}
