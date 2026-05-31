import { Suspense } from 'react'

import { ShopSection } from '@/components/shop-section'
import { Newsletter } from '@/components/newsletter'

interface MenuPageProps {
  searchParams?: {
    q?: string
  }
}

export default function MenuPage({ searchParams }: MenuPageProps) {
  const searchQuery = searchParams?.q ?? ''

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
      <Suspense fallback={null}>
        <ShopSection initialSearchQuery={searchQuery} />
      </Suspense>
      <Newsletter />
    </main>
  )
}
