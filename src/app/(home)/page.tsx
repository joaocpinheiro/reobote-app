'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function MyApp() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para a página de login ao montar o aplicativo
    router.push('/login')
  }, [])
}

export default MyApp
