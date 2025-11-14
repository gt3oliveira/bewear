import { db } from '@/db'
import { cartTable, shippingAddressTable } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CartSummary } from '../_components/cart-summary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatAddress } from '../_helpers/addresses'
import { Button } from '@/components/ui/button'

export default async function ConfirmationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.user) redirect('/')

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  })
  if (!cart || cart.items.length === 0) redirect('/')

  const totalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  )

  if (!cart.shippingAddress) redirect('/cart/identification')

  return (
    <div className="px-5">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </CardContent>
            </Card>
            <Button className="w-full rounded-full" size={'lg'}>
              Finalizar compra
            </Button>
          </CardContent>
        </Card>

        <CartSummary
          subTotalInCents={totalInCents}
          totalInCents={totalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
      </div>
    </div>
  )
}
