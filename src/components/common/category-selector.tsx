import { categoryTable } from '@/db/schema'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface CategorySelectorProps {
  className?: string
  categories: (typeof categoryTable.$inferSelect)[]
}

export const CategorySelector = ({
  categories,
  className,
}: CategorySelectorProps) => {
  return (
    <div className={cn('rounded-3xl bg-[#F4EFFF] p-6', className)}>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={'outline'}
            className="rounded-full border-0 font-semibold hover:border"
            size={'lg'}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
