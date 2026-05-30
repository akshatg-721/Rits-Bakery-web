'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { MenuSection } from '@/components/menu-section'
import { Newsletter } from '@/components/newsletter'

function MenuContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') ?? ''

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
      <MenuSection initialSearchQuery={searchQuery} />
      <Newsletter />
    </main>
  )
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
          <div className="flex min-h-[50vh] items-center justify-center">
            <span className="size-8 animate-spin rounded-full border-4 border-[#006241]/20 border-t-[#006241]" />
          </div>
        </main>
      }
    >
      <MenuContent />
    </Suspense>
  )
}
