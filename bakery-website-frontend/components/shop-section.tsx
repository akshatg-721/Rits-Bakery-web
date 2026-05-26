'use client'

import { ProductCard } from './product-card'
import { useCart, type CartProduct } from '@/lib/cart-context'

const menuItems: CartProduct[] = [
  {
    id: '1',
    name: 'Signature Fudge Brownie',
    price: 150,
    displayPrice: '฿150',
    description: 'Rich, gooey, and finished with deep Belgian chocolate.',
    image: '/brownie.jpg',
  },
  {
    id: '2',
    name: 'Classic Butter Croissant',
    price: 120,
    displayPrice: '฿120',
    description: 'Flaky, golden layers baked fresh with pure butter.',
    image: '/croissant.jpg',
  },
  {
    id: '3',
    name: 'Dark Chocolate Tart',
    price: 180,
    displayPrice: '฿180',
    description: 'A crisp tart shell filled with silky dark chocolate ganache.',
    image: '/chocolate-tart.jpg',
  },
  {
    id: '4',
    name: 'Vanilla Bean Éclair',
    price: 140,
    displayPrice: '฿140',
    description: 'Light choux pastry with vanilla cream and a glossy glaze.',
    image: '/vanilla-eclair.jpg',
  },
]

export function ShopSection() {
  const { addItem } = useCart()

  return (
    <section id="menu" className="px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">
          Our Exquisite Collection
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
