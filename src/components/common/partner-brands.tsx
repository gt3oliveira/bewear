import Image from 'next/image'

import { simpleIcons } from '@/constants/simple-icons'

export const PartnerBrands = () => {
  return (
    <div className="space-y-6 px-5">
      <h3 className="font-bold">Marcas Parceiras</h3>
      <div className="grid grid-cols-4">
        {simpleIcons.map((simpleIcon) => (
          <div
            key={simpleIcon.icon}
            className="flex flex-col items-center gap-2"
          >
            <div className="border-muted flex size-[70px] items-center justify-center rounded-xl border-[2.5px]">
              <Image
                width={30}
                height={30}
                src={simpleIcon.icon}
                alt={simpleIcon.label}
              />
            </div>
            <p className="font-semibold">{simpleIcon.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
