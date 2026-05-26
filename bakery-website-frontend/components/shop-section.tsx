'use client'

import { ProductCard } from './product-card'
import { useCart, type CartProduct } from '@/lib/cart-context'

const menuItems: CartProduct[] = [
  {
    id: '1',
    name: 'Signature Fudge Brownie',
    price: 150,
    displayPrice: '₹150',
    description: 'Rich, gooey, and made with dark Belgian chocolate.',
    image: '/brownie.jpg',
  },
  {
    id: '2',
    name: 'Classic Butter Croissant',
    price: 120,
    displayPrice: '₹120',
    description: 'Flaky, buttery, and freshly baked every morning.',
    image: '/croissant.jpg',
  },
]

export function ShopSection() {
  const { addItem } = useCart()

  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">
          Our Exquisite Collection
        </h2>

        {/* Product Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
