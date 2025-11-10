'use client'
import { useQuery } from '@tanstack/react-query'
import { ShoppingBagIcon } from 'lucide-react'

import { getCart } from '@/actions/get-cart'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '../ui/button'
import { CartItem } from './cart-item'

export const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  })
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <ShoppingBagIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center">
          <ShoppingBagIcon />
          <SheetTitle className="text-xl">Sacola</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-5">
          {cartIsLoading && <p>Carregando...</p>}
          {cart?.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productVariant.product.name}
              productVariantName={item.productVariant.name}
              productVariantImageUrl={item.productVariant.imageUrl}
              productVariantPriceInCents={item.productVariant.priceInCents}
              quantity={item.quantity}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
