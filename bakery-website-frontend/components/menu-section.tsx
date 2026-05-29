'use client'

import { MenuProductCard } from '@/components/menu-product-card'
import { useCart } from '@/lib/cart-context'
import { menuCategories, type MenuProduct } from '@/lib/menu-data'

export function MenuSection() {
  const { addItem, setCartOpen } = useCart()

  const handleAddToCart = (product: MenuProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      displayPrice: product.price,
      description: product.description,
      image: product.image,
    })
    setCartOpen(true)
  }

  return (
    <section id="menu" className="overflow-hidden bg-[#FAFAF8] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-14 sm:py-24">
        {menuCategories.map((category, catIdx) => (
          <div
            key={category.slug}
            id={category.slug}
            className={catIdx > 0 ? 'mt-16 sm:mt-28' : ''}
            style={{ scrollMarginTop: '6rem' }}
          >
            <div className="mb-8 sm:mb-14">
              <h3 className="font-serif text-3xl leading-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
                {category.title}
              </h3>
              <div className="mt-3 h-px w-16 bg-[#006241]/30" />
            </div>

            {category.products.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
                {category.products.map((product) => (
                  <MenuProductCard
                    key={product.id}
                    product={product}
                    headingLevel="h4"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-[#006241]/25 bg-white px-6 py-10 text-center text-base leading-7 text-gray-500 shadow-[0_8px_24px_rgb(0,0,0,0.04)] sm:text-sm">
                Vegan selection coming soon.
              </div>
            )}
          </div>
        ))}

        <p className="mx-auto mt-16 max-w-2xl text-center text-base leading-7 text-gray-500 sm:mt-20 sm:text-sm sm:leading-6">
          All items are 100% eggless. Vegan, fasting-friendly, and monk fruit
          sweetener options available upon request. Prices may vary.
          <br />
          Open Every Day · Delivery Only · Pre-order 24hrs before.
        </p>
      </div>
    </section>
  )
}
