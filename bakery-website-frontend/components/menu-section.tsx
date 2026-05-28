'use client'

import { useCart } from '@/lib/cart-context'

/* ─── Product data type ─── */
interface Product {
  id: string
  name: string
  price: string
  numericPrice: number
  image: string
  tags?: string[]
}

interface Category {
  title: string
  slug: string
  products: Product[]
}

/* ─── Verified Unsplash image URLs ─── */

/* ─── All menu data organized by category ─── */
const menuCategories: Category[] = [
  {
    title: 'Signature Loaves',
    slug: 'signature-loaves',
    products: [
      {
        id: 'authentic-thai-banana-loaf',
        name: 'Authentic Thai Banana Loaf',
        price: '฿ 190',
        numericPrice: 190,
        image: 'https://images.unsplash.com/photo-1632931057788-645c49bc0db5?auto=format&fit=crop&w=800&q=80',
        tags: ['Best Seller'],
      },
      {
        id: 'fresh-orange-loaf',
        name: 'Fresh Orange Loaf',
        price: '฿ 220',
        numericPrice: 220,
        image: 'https://unsplash.com/photos/0RLZC3X1es4/download?force=true&w=800',
      },
      {
        id: 'classic-carrot-loaf',
        name: 'Classic Carrot Loaf',
        price: '฿ 220',
        numericPrice: 220,
        image: 'https://unsplash.com/photos/z2ZGrxKVNfs/download?force=true&w=800',
      },
      {
        id: 'vanilla-butter-loaf-cake',
        name: 'Vanilla Butter Loaf Cake',
        price: '฿ 250',
        numericPrice: 250,
        image: 'https://images.unsplash.com/photo-1632228930927-d95286a28b5c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'date-walnut-cake',
        name: 'Date & Walnut Cake',
        price: '฿ 290',
        numericPrice: 290,
        image: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?auto=format&fit=crop&w=800&q=80',
        tags: ['Best Seller', 'No Sugar', 'Contains Nuts'],
      },
      {
        id: 'rich-chocolate-loaf',
        name: 'Rich Chocolate Loaf',
        price: '฿ 290',
        numericPrice: 290,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
        tags: ['Top Seller'],
      },
    ],
  },
  {
    title: 'Artisanal Brownies',
    slug: 'artisanal-brownies',
    products: [
      {
        id: 'fudge-brownies-box-of-8',
        name: 'Fudge Brownies (Box of 8)',
        price: '฿ 245',
        numericPrice: 245,
        image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=800&q=80',
        tags: ['Best Seller'],
      },
      {
        id: 'nuts-biscoff-brownies-box-of-8',
        name: 'Nuts & Biscoff Brownies (Box of 8)',
        price: '฿ 350',
        numericPrice: 350,
        image: 'https://images.unsplash.com/photo-1612886623637-a999ab01c498?auto=format&fit=crop&w=800&q=80',
        tags: ['Contains Nuts'],
      },
      {
        id: 'nutella-oreo-brownies-box-of-8',
        name: 'Nutella Oreo Brownies (Box of 8)',
        price: '฿ 290',
        numericPrice: 290,
        image: 'https://images.unsplash.com/photo-1590841609987-4ac211afdde1?auto=format&fit=crop&w=800&q=80',
        tags: ['Top Seller'],
      },
      {
        id: 'mocha-brownies',
        name: 'Mocha Brownies (Box of 8)',
        price: '฿ 270',
        numericPrice: 270,
        image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    title: 'Tea-Time Classics',
    slug: 'tea-time-classics',
    products: [
      {
        id: 'classical-nankhatai',
        name: 'Classical Nankhatai',
        price: '฿ 195',
        numericPrice: 195,
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
        tags: ['Top Seller'],
      },
      {
        id: 'osamania-biscuits',
        name: 'Osamania Biscuits',
        price: '฿ 250',
        numericPrice: 250,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'premium-cheesecakes',
        name: 'Premium Cheesecakes',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
        tags: ['Best Seller'],
      },
      {
        id: 'basbousa',
        name: 'Basbousa',
        price: '฿ 550 / lb',
        numericPrice: 550,
        image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'traditional-mawa-cake',
        name: 'Traditional Mawa Cake',
        price: '฿ 390 / lb',
        numericPrice: 390,
        image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    title: 'Cookies & Biscuits',
    slug: 'cookies-biscuits',
    products: [
      {
        id: 'coconut-cookies',
        name: 'Coconut Cookies',
        price: '฿ 195',
        numericPrice: 195,
        image: 'https://images.unsplash.com/photo-1590080876351-941da357a43c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'almond-oats-choco-chip-cookies',
        name: 'Almond & Oats Choco Chip Cookies',
        price: '฿ 240',
        numericPrice: 240,
        image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=800&q=80',
        tags: ['Contains Nuts'],
      },
      {
        id: 'assorted-biscoff-truffles-pack-of-12',
        name: 'Assorted Biscoff Truffles (12 pcs)',
        price: '฿ 400',
        numericPrice: 400,
        image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'double-choco-cookies',
        name: 'Double Choco Cookies',
        price: '฿ 220',
        numericPrice: 220,
        image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    title: 'Middle Eastern Indulgence',
    slug: 'middle-eastern',
    products: [
      {
        id: 'kunafa-dates-pack-of-6',
        name: 'Kunafa Dates (Pack of 6)',
        price: '฿ 300',
        numericPrice: 300,
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80',
        tags: ['Top Seller'],
      },
      {
        id: 'baklava',
        name: 'Baklava',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?auto=format&fit=crop&w=800&q=80',
        tags: ['Contains Nuts'],
      },
      {
        id: 'dubai-chocolates',
        name: 'Dubai Chocolates (10 pieces)',
        price: '฿ 690',
        numericPrice: 690,
        image: 'https://images.unsplash.com/photo-1549007994-cb92caefdcce?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'rose-pistachio-cake',
        name: 'Rose & Pistachio Cake',
        price: '฿ 450',
        numericPrice: 450,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
        tags: ['Contains Nuts'],
      },
    ],
  },
  {
    title: 'Savory Bites',
    slug: 'savory-bites',
    products: [
      {
        id: 'muffins-pack-of-6',
        name: 'Savoury Muffins (Pack of 6)',
        price: '฿ 195',
        numericPrice: 195,
        image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80',
        tags: ['Top Seller'],
      },
      {
        id: 'cheesy-cashews',
        name: 'Cheesy Cashews (125g)',
        price: '฿ 240',
        numericPrice: 240,
        image: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?auto=format&fit=crop&w=800&q=80',
        tags: ['Contains Nuts'],
      },
      {
        id: '7-seed-mukhwas',
        name: '7 Seed Mukhwas (125g)',
        price: '฿ 160',
        numericPrice: 160,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'cheese-straws',
        name: 'Cheese Straws (Pack of 12)',
        price: '฿ 210',
        numericPrice: 210,
        image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
]

export function MenuSection() {
  const { addItem, setCartOpen } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      displayPrice: product.price,
      image: product.image,
    })
    setCartOpen(true)
  }

  return (
    <section id="menu" className="bg-[#FAFAF8] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-16 sm:py-24">
        {menuCategories.map((category, catIdx) => (
          <div
            key={category.slug}
            id={category.slug}
            className={catIdx > 0 ? 'mt-20 sm:mt-28' : ''}
            /* Offset scroll target so heading isn't hidden behind sticky header */
            style={{ scrollMarginTop: '6rem' }}
          >
            {/* ── Category Heading ── */}
            <div className="mb-10 sm:mb-14">
              <h3 className="font-serif text-3xl text-[#1a1a1a] sm:text-4xl">
                {category.title}
              </h3>
              <div className="mt-3 h-px w-16 bg-[#006241]/40" />
            </div>

            {/* ── Product Grid ── */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
              {category.products.map((product) => (
                <article key={product.id} className="group">
                  {/* Image Container with hover reveals */}
                  <div className="relative overflow-hidden rounded-sm bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Add-to-cart bar — bottom */}
                    <button
                      type="button"
                      className="absolute bottom-0 left-0 w-full translate-y-full bg-[#111111]/90 py-2.5 text-center transition-transform duration-300 group-hover:translate-y-0 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2 sm:py-3"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
                        Add to Cart
                      </span>
                    </button>

                  </div>

                  {/* Text beneath image */}
                  <div className="mt-4 flex flex-col items-center text-center">
                    <span className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                      Eggless
                    </span>
                    <h4 className="text-sm font-medium leading-snug text-gray-900 sm:text-[15px]">
                      {product.name}
                    </h4>
                    {product.tags && product.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-block rounded-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider sm:text-[10px] ${
                              tag === 'Best Seller' || tag === 'Top Seller'
                                ? 'bg-[#006241] text-white'
                                : 'bg-white text-[#111111]'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {product.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* Footer note */}
        <p className="mx-auto mt-20 max-w-2xl text-center text-xs leading-6 text-gray-400 sm:text-sm">
          All items are 100% eggless. Vegan, fasting-friendly, and monk fruit
          sweetener options available upon request. Prices may vary.
          <br />
          Open Every Day · Delivery Only · Pre-order 24hrs before.
        </p>
      </div>
    </section>
  )
}
