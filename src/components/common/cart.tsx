'use client'
import { ShoppingBagIcon } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '../ui/button'

export const Cart = () => {
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
      </SheetContent>
    </Sheet>
  )
}
