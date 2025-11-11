'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { AddToCartButton } from './add-to-cart-button'

interface ProductActionsProps {
  productVariantId: string
}

export const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [Quantity, setQuantity] = useState(1)

  const handleMinusClick = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handlePlusClick = () => {
    setQuantity((prev) => prev + 1)
  }

  return (
    <>
      <div className="flex flex-col gap-2 px-5">
        <h2 className="text-lg font-semibold">Quantidade</h2>
        <div className="flex w-[110px] items-center justify-between rounded-lg border-[2.5px] border-[#F4EFFF]">
          <Button onClick={handleMinusClick} size={'icon'} variant={'ghost'}>
            <MinusIcon />
          </Button>
          <p className="mb-1 cursor-default text-lg font-semibold">
            {Quantity}
          </p>
          <Button onClick={handlePlusClick} size={'icon'} variant={'ghost'}>
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          quantity={Quantity}
          productVariantId={productVariantId}
        />
        <Button size={'lg'} className="rounded-full">
          Comprar agora
        </Button>
      </div>
    </>
  )
}
