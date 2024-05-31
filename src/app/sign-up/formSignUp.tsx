'use client'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { handleSignUp } from '@/api/sign-up'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const signUpForm = z
  .object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' }),
    confirmPassword: z.string().min(4, {
      message: 'A confirmação da senha deve ter no mínimo 4 caracteres',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'A senha não combina',
  })

export type signUpForm = z.infer<typeof signUpForm>

export const FormSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<signUpForm>({
    resolver: zodResolver(signUpForm),
  })
  const router = useRouter()

  const postSignUp = async (data: signUpForm) => {
    try {
      const result = await handleSignUp(data)
      if (result.success) {
        router.push(result.redirectUrl)
      }
    } catch (error) {
      console.error('Erro ao registrar:', error)
      throw error
    }
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(postSignUp)}>
        <div className="space-y-3.5">
          <Input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Seu nome"
          />
          {errors?.name && (
            <p className="text-red-700">{errors.name?.message}</p>
          )}

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

          <Input
            id="password"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirme a senha"
          />
          {errors?.confirmPassword && (
            <p className="text-red-700">{errors.confirmPassword?.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-strongRed p-3 text-white hover:opacity-60"
          type="submit"
        >
          Registrar
        </button>
        <p className="text-white">Já possui uma conta?</p>
        <Link
          href="/login"
          className="text-strongRed transition duration-500 ease-in hover:border-b-2 hover:border-solid hover:border-strongRed"
        >
          Entrar agora
        </Link>
      </form>
    </>
  )
}
