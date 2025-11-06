'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'

const formSchema = z.object({
  email: z.email('Email é obrigatório'),
  password: z
    .string('Senha é obrigatória')
    .trim()
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
})

type FormData = z.infer<typeof formSchema>

export const SignInForm = () => {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormData) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logado com sucesso!')
          router.push('/')
        },
        onError: (error) => {
          console.log(error.error.code)
          if (error.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
            toast.error('Credenciais inválidas. Tente novamente.')
            form.setError('email', {})
            form.setError('password', {})
            return
          }
          toast.error(error.error.message)
        },
      },
    })
  }

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Entre com suas credenciais.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Button
              onClick={handleSignInWithGoogle}
              variant={'outline'}
              type="button"
              className="w-full"
            >
              <FcGoogle />
              Entrar com o Google
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
