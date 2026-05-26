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
    <div className="group">
      {/* Image Placeholder */}
      <div className="mb-6 bg-gray-200 aspect-square rounded-lg overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Product Image</span>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-serif italic text-gray-800 mb-2">
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-base font-medium text-gray-700">{product.displayPrice}</p>

      {product.description && (
        <p className="mt-2 min-h-10 text-sm leading-5 text-gray-600">
          {product.description}
        </p>
      )}

      <Button
        className="mt-5 w-full bg-gray-900 text-white hover:bg-gray-800"
        onClick={() => onAddToCart(product)}
      >
        <ShoppingBag className="size-4" />
        Add to Cart
      </Button>
    </div>
  )
}
