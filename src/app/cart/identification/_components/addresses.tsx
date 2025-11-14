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
import { PatternFormat } from 'react-number-format'
import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from '@/actions/add-address/schema'
import { useCreateShippingAddress } from '@/hooks/mutations/use-create-shipping-address'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { shippingAddressTable } from '@/db/schema'
import { useUserAddresses } from '@/hooks/queries/use-user-addresses'
import { useUpdateCartShippingAddress } from '@/hooks/mutations/use-update-cart-shipping-address'
import { formatAddress } from '../../helpers/addresses'

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[]
  defaultShippingAddressId: string | null
}

export const Addresses = ({
  defaultShippingAddressId,
  shippingAddresses,
}: AddressesProps) => {
  const router = useRouter()
  const [SelectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null
  )
  const createShippingAddressMutation = useCreateShippingAddress()
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress()
  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  })

  const form = useForm<CreateShippingAddressSchema>({
    resolver: zodResolver(createShippingAddressSchema),
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

  const onSubmit = async (data: CreateShippingAddressSchema) => {
    try {
      const newAddress = await createShippingAddressMutation.mutateAsync(data)
      toast.success('Endereço criado com sucesso!')
      form.reset()
      setSelectedAddress(newAddress.id)

      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id,
      })
      toast.success('Endereço vinculado ao carrinho!')
    } catch (error) {
      toast.error('Ocorreu um erro ao criar o endereço.')
      console.error(error)
    }
  }

  const handleGoToPayment = async () => {
    if (!SelectedAddress || SelectedAddress === 'add_new') return

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: SelectedAddress,
      })
      toast.success('Endereço selecionado para entrega!')
      router.push('/cart/confirmation')
    } catch (error) {
      toast.error('Erro ao selecionar endereço. Tente novamente.')
      console.error(error)
    }
  }

  return (
    <Card className="mx-5">
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="py-4 text-center">
            <p>Carregando endereços...</p>
          </div>
        ) : (
          <RadioGroup
            value={SelectedAddress}
            onValueChange={setSelectedAddress}
          >
            {addresses?.length === 0 && (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">
                  Você ainda não possui endereços cadastrados.
                </p>
              </div>
            )}

            {addresses?.map((address) => (
              <Card key={address.id}>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div className="flex-1">
                      <Label htmlFor={address.id} className="cursor-pointer">
                        <div>
                          <p className="text-sm">{formatAddress(address)}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        )}

        {SelectedAddress && SelectedAddress !== 'add_new' && (
          <div className="mt-4">
            <Button
              onClick={handleGoToPayment}
              className="w-full"
              disabled={updateCartShippingAddressMutation.isPending}
            >
              {updateCartShippingAddressMutation.isPending
                ? 'Processando...'
                : 'Ir para pagamento'}
            </Button>
          </div>
        )}

        {SelectedAddress === 'add_new' && (
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
              <Button
                type="submit"
                className="w-full"
                disabled={
                  createShippingAddressMutation.isPending ||
                  updateCartShippingAddressMutation.isPending
                }
              >
                {createShippingAddressMutation.isPending ||
                updateCartShippingAddressMutation.isPending
                  ? 'Salvando...'
                  : 'Salvar endereço'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
