import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ShopSection } from '@/components/shop-section'
import { Newsletter } from '@/components/newsletter'
import { getMenuProductsSchema, createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Menu | The Rits Baker',
  description:
    'Explore brownies, cheesecakes, cakes, cookies, vegan desserts, and chef specials from The Rits Baker.',
  path: '/menu',
  keywords: [
    'The Rits Baker menu',
    'eggless brownies Bangkok',
    'cheesecakes Bangkok',
    'vegan desserts Bangkok',
    'bakery menu Bangkok',
  ],
})

interface MenuPageProps {
  searchParams?: Promise<{
    q?: string
    category?: string
  }>
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const resolvedParams = await searchParams
  const searchQuery = resolvedParams?.q ?? ''
  const initialCategorySlug = resolvedParams?.category ?? ''
  const menuProductsSchema = getMenuProductsSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuProductsSchema) }}
      />
      <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
        <Suspense fallback={null}>
          <ShopSection
            initialSearchQuery={searchQuery}
            initialCategorySlug={initialCategorySlug}
          />
        </Suspense>
        <Newsletter />
      </main>
    </>
  )
}
