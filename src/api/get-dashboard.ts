import { Root } from '@/app/dashboard/page'
import Cookies from 'js-cookie'

export const getDashboard = async (): Promise<Root | undefined> => {
  try {
    const token = Cookies.get('X-CSRF-TOKEN')
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
          Authorization: `Bearer ${token?.toString()}`,
        },
      },
    )

    const responseData = await response.json()

    return await responseData
  } catch (e) {
    console.error(e)
    throw e
  }
}
