'use client'

interface ProductCardProps {
  name: string
  price: string
  image?: string
}

export function ProductCard({ name, price }: ProductCardProps) {
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
        {name}
      </h3>

      {/* Price */}
      <p className="text-base font-medium text-gray-700">
        {price}
      </p>
    </div>
  )
}
