'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CartProduct } from '@/lib/cart-context'

interface ProductCardProps {
  product: CartProduct
  onAddToCart: (product: CartProduct) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)
    setIsAdded(true)
    window.setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <article className="group flex h-full flex-col rounded-md border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgb(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgb(0,0,0,0.08)] active:scale-[0.985]">
      {/* Image Placeholder */}
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100 ring-1 ring-black/5">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <span className="text-base text-gray-400">Product Image</span>
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
        className={`mt-auto w-full rounded-md text-white shadow-[0_8px_20px_rgb(0,98,65,0.16)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(0,98,65,0.2)] ${
          isAdded
            ? 'bg-[#2a3c24] hover:bg-[#2a3c24]'
            : 'bg-[#006241] hover:bg-[#004F35]'
        }`}
        onClick={handleAddToCart}
      >
        <ShoppingBag className="size-4" />
        {isAdded ? 'Added ✓' : 'Add to Cart'}
      </Button>
    </article>
  )
}
