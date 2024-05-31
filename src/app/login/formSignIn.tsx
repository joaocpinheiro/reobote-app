'use client'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleSignIn } from '@/api/sign-in'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const signInForm = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' }),
})

export type signInForm = z.infer<typeof signInForm>

export const FormSignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<signInForm>({
    resolver: zodResolver(signInForm),
  })

  async function postSignIn(data: signInForm) {
    await handleSignIn(data)
    router.push('/dashboard')
  }
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(postSignIn)}>
        <div className="space-y-3.5">
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Seu e-mail"
          />
          {errors?.email && (
            <p className="text-red-700">{errors.email?.message}</p>
          )}

          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Senha"
          />
          {errors?.password && (
            <p className="text-red-700">{errors.password?.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-strongRed p-3 text-white hover:opacity-60"
          type="submit"
        >
          Registrar
        </button>
        <p className="text-white">Não possui uma conta?</p>
        <Link
          href="/sign-up"
          className="text-strongRed transition duration-500 ease-in hover:border-b-2 hover:border-solid hover:border-strongRed"
        >
          Criar agora
        </Link>
      </form>
    </>
  )
}
