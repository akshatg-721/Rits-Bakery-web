import { Curations } from '@/components/curations'
import { HeroSlider } from '@/components/hero-slider'
import { MenuSection } from '@/components/menu-section'
import { NewsletterBar } from '@/components/newsletter-bar'

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F9F9F9]">
      {/* 1. Full-bleed hero image slider */}
      <HeroSlider />

      {/* 2. Circular category curations (anchored to menu sections) */}
      <Curations />

      {/* 3. Unified continuous-scroll menu */}
      <MenuSection />

      {/* 4. Minimalist newsletter + social bar */}
      <NewsletterBar />
    </main>
  )
}
