import { desc } from 'drizzle-orm'
import Image from 'next/image'

import { CategorySelector } from '@/components/common/category-selector'
import { PartnerBrands } from '@/components/common/partner-brands'
import { ProductList } from '@/components/common/product-list'
import { db } from '@/db'
import { productTable } from '@/db/schema'

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  })
  const categories = await db.query.categoryTable.findMany()

  return (
    <div className="space-y-6">
      <Image
        src="/banner-01.svg"
        alt="Leve uma vida com estilo"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />

      <PartnerBrands />

      <ProductList products={products} title="Mais vendidos" />

      <CategorySelector categories={categories} className="mx-5" />

      <Image
        src="/banner-02.svg"
        alt="Seja autêntico"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />

      <ProductList products={newlyCreatedProducts} title="Lançamentos" />
    </div>
  )
}
