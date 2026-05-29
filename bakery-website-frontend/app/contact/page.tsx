import { Newsletter } from '@/components/newsletter'

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8] px-4 py-20 sm:px-8 sm:py-32">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl italic leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
          Contact us
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-500">
          Follow The Rits Baker for fresh drops, order updates, and
          behind-the-scenes bakes.
        </p>
        <div className="mx-auto mb-8 mt-8 h-px w-16 bg-[#111111]/20 sm:mb-10 sm:mt-10" />
        <Newsletter socialOnly />
      </section>
    </main>
  )
}
