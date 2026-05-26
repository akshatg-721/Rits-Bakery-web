'use client'

import { ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CartProduct } from '@/lib/cart-context'

interface ProductCardProps {
  product: CartProduct
  onAddToCart: (product: CartProduct) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-stone-200/70 bg-white/35 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)]">
      {/* Image Placeholder */}
      <div className="aspect-square overflow-hidden rounded-md bg-stone-200">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-300">
          <span className="text-sm text-stone-400">Product Image</span>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="mt-6 min-h-14 font-serif text-xl italic leading-7 text-stone-900">
        {product.name}
      </h3>

      {/* Price */}
      <p className="mt-3 text-base font-semibold text-stone-800">
        {product.displayPrice}
      </p>

      {product.description && (
        <p className="mt-2 min-h-14 text-sm leading-6 text-stone-500">
          {product.description}
        </p>
      )}

      <Button
        className="mt-auto w-full rounded-none bg-stone-900 text-white hover:bg-stone-800"
        onClick={() => onAddToCart(product)}
      >
        <ShoppingBag className="size-4" />
        Add to Cart
      </Button>
    </article>
  )
}
