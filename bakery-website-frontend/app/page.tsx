import { Curations } from '@/components/curations'
import { HeroSlider } from '@/components/hero-slider'
import { MenuSection } from '@/components/menu-section'
import { Newsletter } from '@/components/newsletter'

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Bakery',
            name: 'The Rits Baker',
            url: 'https://theritsbaker.com',
            telephone: '+66-972932849',
            email: 'theritsbaker@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bangkok',
              addressCountry: 'TH',
            },
            servesCuisine: 'Eggless Bakery',
          }),
        }}
      />
      <main className="min-h-screen overflow-x-hidden bg-[#F9F9F9]">
        <HeroSlider />
        <Curations />
        <MenuSection />
        <Newsletter />
      </main>
    </>
  )
}
