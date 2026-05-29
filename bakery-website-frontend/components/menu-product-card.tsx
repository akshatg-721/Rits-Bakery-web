'use client'

import { ShoppingBag } from 'lucide-react'

import type { MenuProduct } from '@/lib/menu-data'

interface MenuProductCardProps {
  product: MenuProduct
  headingLevel?: 'h3' | 'h4'
  showEgglessLabel?: boolean
  onAddToCart: (product: MenuProduct) => void
}

export function MenuProductCard({
  product,
  headingLevel = 'h3',
  showEgglessLabel = true,
  onAddToCart,
}: MenuProductCardProps) {
  const Heading = headingLevel

  return (
    <article className="group transition-transform duration-200 active:scale-[0.985]">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100 transition-transform duration-300 sm:group-hover:-translate-y-1">
        {product.isTopSeller && (
          <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest text-black font-medium">
            Top Seller
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur-sm sm:hidden"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingBag className="size-4" />
        </button>
        <button
          type="button"
          className="absolute inset-x-0 bottom-0 hidden min-h-12 items-center justify-center bg-[#111111]/90 px-4 text-center shadow-[0_8px_20px_rgb(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:bg-[#006241] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2 sm:flex sm:translate-y-full sm:group-hover:translate-y-0 sm:focus-visible:translate-y-0"
          onClick={() => onAddToCart(product)}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            Add to Cart
          </span>
        </button>
      </div>

      <div className="mt-3 flex flex-col items-center px-1.5 text-center md:mt-4 md:px-1">
        {showEgglessLabel && (
          <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Eggless
          </span>
        )}
        <Heading className="text-base font-medium leading-snug text-gray-900">
          {product.name}
        </Heading>
        {product.description && (
          <p className="mt-1.5 text-sm leading-5 text-gray-500">
            {product.description}
          </p>
        )}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#111111] shadow-[0_2px_8px_rgb(0,0,0,0.04)] ring-1 ring-black/5 sm:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="mt-2 text-base font-medium text-gray-600">
          {product.price}
        </p>
      </div>
    </article>
  )
}
