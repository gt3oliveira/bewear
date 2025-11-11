import Image from 'next/image'
import Link from 'next/link'

import { productVariantTable } from '@/db/schema'

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[]
}

export const VariantSelector = ({ variants }: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link key={variant.id} href={`/product-variant/${variant.slug}`}>
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  )
}
