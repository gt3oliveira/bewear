import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { ProductList } from '@/components/common/product-list'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { productTable, productVariantTable } from '@/db/schema'
import { formatCentsToBRL } from '@/helpers/money'

import { QuantitySelector } from './components/quantity-selector'
import { VariantSelector } from './components/variant-selector'

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductVariantPage({
  params,
}: ProductVariantPageProps) {
  const { slug } = await params
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  })

  if (!productVariant) return notFound()

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  })

  return (
    <div className="flex flex-col space-y-8">
      <Image
        src={productVariant.imageUrl}
        alt={productVariant.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full object-cover"
      />

      <div className="px-5">
        <VariantSelector
          variants={productVariant.product.variants.filter(
            (variant) => variant.id !== productVariant.id
          )}
        />
      </div>

      <div className="px-5">
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
        <h3 className="text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h3>
      </div>

      <div className="flex flex-col gap-2 px-5">
        <h2 className="text-lg font-semibold">Quantidade</h2>
        <QuantitySelector />
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <Button variant={'outline'} size={'lg'} className="rounded-full">
          Adicionar à sacola
        </Button>
        <Button size={'lg'} className="rounded-full">
          Comprar agora
        </Button>
      </div>

      <p className="px-5 text-sm">{productVariant.product.description}</p>

      <ProductList
        title={'Você também pode gostar'}
        products={likelyProducts.filter(
          (product) => product.id !== productVariant.product.id
        )}
      />
    </div>
  )
}
