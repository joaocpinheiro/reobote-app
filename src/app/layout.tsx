import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} grid-rows-app mx-auto grid min-h-screen w-full max-w-[1600px] gap-5 bg-zinc-900 p-8`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  )
}
