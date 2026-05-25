'use client'

import { ProductCard } from './product-card'

export function ShopSection() {
  const products = [
    { name: 'Fudge Brownie', price: '$6.50' },
    { name: 'Croissant Butter', price: '$4.25' },
    { name: 'Chocolate Tart', price: '$7.00' },
    { name: 'Raspberry Macaron', price: '$3.50' },
    { name: 'Soufflé Vanilla', price: '$5.75' },
    { name: 'Pistachio Éclair', price: '$5.25' },
  ]

  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">
          Our Exquisite Collection
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-12">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
