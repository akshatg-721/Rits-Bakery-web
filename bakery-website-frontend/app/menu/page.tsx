import { Suspense } from 'react'

import { ShopSection } from '@/components/shop-section'
import { Newsletter } from '@/components/newsletter'

interface MenuPageProps {
  searchParams?: Promise<{
    q?: string
  }>
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const resolvedParams = await searchParams
  const searchQuery = resolvedParams?.q ?? ''

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
      <Suspense fallback={null}>
        <ShopSection initialSearchQuery={searchQuery} />
      </Suspense>
      <Newsletter />
    </main>
  )
}
