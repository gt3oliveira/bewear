import { MinusIcon, PlusIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { formatCentsToBRL } from '@/helpers/money'

import { Button } from '../ui/button'
import { useRemoveProductFromCart } from '@/hooks/mutations/use-remove-product-from-cart'
import { useIncreaseProductFromCart } from '@/hooks/mutations/use-increase-product-from-cart'

interface CartItemProps {
  id: string
  productName: string
  productVariantName: string
  productVariantImageUrl: string
  productVariantPriceInCents: number
  quantity: number
}
export const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductToCartMutation = useRemoveProductFromCart(id)
  const increaseProductToCartMutation = useIncreaseProductFromCart(id)

  const handleRemoveProduct = () =>
    removeProductToCartMutation.mutate(undefined, {
      onSuccess: () => {
        quantity > 1 ? '' : toast.success('Produto removido com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro ao remover o produto.')
      },
    })

  const handleIncreaseProduct = () => increaseProductToCartMutation.mutate()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-xl"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[110px] items-center justify-between rounded-lg border-[2.5px] border-[#F4EFFF] p-1">
            <Button
              onClick={handleRemoveProduct}
              className="h-4 w-4"
              variant={'ghost'}
            >
              {quantity > 1 ? <MinusIcon /> : <Trash2 />}
            </Button>
            <p className="cursor-default text-sm font-medium">{quantity}</p>
            <Button
              onClick={handleIncreaseProduct}
              className="h-4 w-4"
              variant={'ghost'}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <p className="self-end text-lg font-semibold">
        {formatCentsToBRL(productVariantPriceInCents * quantity)}
      </p>
    </div>
  )
}
