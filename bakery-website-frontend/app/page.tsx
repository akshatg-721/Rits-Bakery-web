import { Curations } from '@/components/curations'
import { HeroSlider } from '@/components/hero-slider'
import { NewsletterBar } from '@/components/newsletter-bar'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      {/* 1. Full-bleed hero image slider */}
      <HeroSlider />

      {/* 2. Circular category curations */}
      <Curations />

      {/* 3. Minimalist newsletter + social bar */}
      <NewsletterBar />
    </main>
  )
}
