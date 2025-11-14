'use client'
import { Button } from '@/components/ui/button'
import { useFinishOrder } from '@/hooks/mutations/use-finish-order'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'

export const FinishOrderButton = () => {
  const [SuccessDialogIsOpen, setSuccessDialogIsOpen] = useState(false)
  const finishOrderMutation = useFinishOrder()

  const handleFinishOrder = () => {
    finishOrderMutation.mutate()
    setSuccessDialogIsOpen(true)
  }

  return (
    <>
      <Button
        className="w-full rounded-full"
        size={'lg'}
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && <Loader2 className="animate-spin" />}
        Finalizar compra
      </Button>

      <Dialog open={SuccessDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            width={300}
            height={300}
            alt="Success"
            className="mx-auto"
          />
          <DialogTitle className="text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>
          <DialogFooter>
            <Button size={'lg'} variant="outline" className="rounded-full">
              <Link href={'/'}>Página inicial</Link>
            </Button>
            <Button size={'lg'} className="rounded-full">
              <Link href={'#'}>Ver meu pedido</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
