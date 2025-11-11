'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { PatternFormat } from 'react-number-format'

const formSchema = z.object({
  recipientName: z
    .string()
    .trim()
    .min(3, 'Nome do destinatário é obrigatório.'),
  street: z.string().trim().min(3, 'Rua é obrigatória.'),
  number: z.string().trim().min(1, 'Número é obrigatório.'),
  complement: z.string().trim().optional(),
  city: z.string().trim().min(3, 'Cidade é obrigatória.'),
  state: z.string().trim().min(2, 'Estado é obrigatório.'),
  neighborhood: z.string().trim().min(3, 'Bairro é obrigatório.'),
  zipCode: z.string().trim().min(8, 'CEP deve ter no mínimo 8 caracteres.'),
  country: z.string().trim().min(3, 'País é obrigatório.'),
  phone: z
    .string()
    .trim()
    .min(10, 'Telefone deve ter no mínimo 10 caracteres.'),
  email: z.email('Email inválido.'),
  cpf: z
    .string()
    .trim()
    .min(11, 'CPF ou CNPJ deve ter no mínimo 11 caracteres.'),
})

type FormData = z.infer<typeof formSchema>

export const Addresses = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      neighborhood: '',
      zipCode: '',
      country: '',
      phone: '',
      email: '',
      cpf: '',
    },
  })

  const onSubmit = (data: FormData) => console.log(data)

  const [AddressSelected, setAddressSelected] = useState<string | null>(null)
  return (
    <Card className="mx-5">
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={AddressSelected} onValueChange={setAddressSelected}>
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="address" id="rg1" />
                  <Label htmlFor="rg1">
                    Rua Manoel Silva, 123, Centro, Rio de Janeiro - RJ
                  </Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="add_new" id="rg2" />
                  <Label htmlFor="rg2">Adicionar novo endereço</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {AddressSelected === 'add_new' && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-8"
            >
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do destinatário</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do destinatário" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input placeholder="Rua" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="Número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="##.###-###"
                          placeholder="CEP"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pais</FormLabel>
                      <FormControl>
                        <Input placeholder="Pais" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="(##) #####-####"
                          placeholder="(00) 00000-0000"
                          customInput={Input}
                          {...field}
                        />
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
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF/CNPJ</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="###.###.###-##"
                          placeholder="000.000.000-00"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full rounded-full" type="submit">
                Salvar
              </Button>
            </form>
          </Form>
        )}
        <Button className="w-full rounded-full" size={'lg'}>
          Continuar
        </Button>
      </CardContent>
    </Card>
  )
}
