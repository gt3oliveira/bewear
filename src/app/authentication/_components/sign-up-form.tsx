'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().trim().min(3, "Nome é obrigatório."),
  email: z.email("Email inválido."),
  password: z.string().trim().min(8, "Senha deve ter no mínimo 8 caracteres"),
  passwordConfirmation: z.string().trim().min(8, "Senha deve ter no mínimo 8 caracteres"),
}).refine((data) => data.password === data.passwordConfirmation, { message: "As senhas não coincidem", path: ["passwordConfirmation"] });

type FormData = z.infer<typeof formSchema>;

export const SignUpForm = () => {
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const onSubmit = async (values: FormData) => {
    await authClient.signUp.email({
      name: values.name, // required
      email: values.email, // required
      password: values.password, // required
      fetchOptions: {
        onSuccess: () => {
          toast.success("Conta criada com sucesso!")
          router.push("/")
        },
        onError: (error) => {
          if (error.error.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
            toast.error("Já existe uma conta com esse email.")
            form.setError("email", {
              message: "Email já cadastrado.",
            })
            return
          }
          toast.error(error.error.message)
        }
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>
          Crie uma conta e comece a usar nossos serviços.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Digite seu email" {...field} />
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
                    <Input type="password" placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua senha novamente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Criar Conta</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
};