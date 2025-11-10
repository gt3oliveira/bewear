'use client'

interface AddToCartButtonProps {
  productVariantId: string
  quantity: number
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'

import { addProductToCart } from '@/actions/add-cart-product'
import { Button } from '@/components/ui/button'

export const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['addProductToCart', productVariantId, quantity],
    mutationFn: async () => {
      addProductToCart({
        productVariantId,
        quantity,
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  return (
    <Button
      variant={'outline'}
      size={'lg'}
      className="rounded-full"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2Icon className="animate-spin" />}
      Adicionar à sacola
    </Button>
  )
}
