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
    <article className="group flex h-full flex-col rounded-md border border-gray-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Image Placeholder */}
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <span className="text-sm text-gray-400">Product Image</span>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="mt-6 min-h-14 font-serif text-xl italic leading-7 text-[#111111]">
        {product.name}
      </h3>

      {/* Price */}
      <p className="mt-3 text-base font-semibold text-[#111111]">
        {product.displayPrice}
      </p>

      {product.description && (
        <p className="mt-2 min-h-14 text-sm leading-6 text-gray-500">
          {product.description}
        </p>
      )}

      <Button
        className="mt-auto w-full rounded-md bg-[#006241] text-white hover:bg-[#004F35]"
        onClick={() => onAddToCart(product)}
      >
        <ShoppingBag className="size-4" />
        Add to Cart
      </Button>
    </article>
  )
}
