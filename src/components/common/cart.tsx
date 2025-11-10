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
      <SheetContent className="w-full">
        <SheetHeader className="flex flex-row items-center">
          <ShoppingBagIcon />
          <SheetTitle className="text-xl">Sacola</SheetTitle>
        </SheetHeader>
        <div>
          {cartIsLoading && <p>Carregando...</p>}
          {cart?.items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <p>{item.productVariant.product.name}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
