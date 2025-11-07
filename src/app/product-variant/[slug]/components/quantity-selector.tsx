'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export const QuantitySelector = () => {
  const [Quantity, setQuantity] = useState(1)

  const handleMinusClick = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handlePlusClick = () => {
    setQuantity((prev) => prev + 1)
  }

  return (
    <div className="flex w-[110px] items-center justify-between rounded-lg border-[2.5px] border-[#F4EFFF]">
      <Button onClick={handleMinusClick} size={'icon'} variant={'ghost'}>
        <MinusIcon />
      </Button>
      <p className="mb-1 cursor-default text-lg font-semibold">{Quantity}</p>
      <Button onClick={handlePlusClick} size={'icon'} variant={'ghost'}>
        <PlusIcon />
      </Button>
    </div>
  )
}
