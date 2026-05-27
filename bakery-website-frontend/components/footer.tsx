import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-[#1E3932] px-6 py-14 text-stone-100 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 text-center md:grid-cols-3 md:text-left">
        <div className="mx-auto max-w-sm md:mx-0">
          <Link href="/" className="font-serif text-3xl italic text-white">
            The Rits Baker
          </Link>
          <p className="mt-4 text-sm leading-6 text-stone-300">
            Premium handcrafted desserts made with a homemade heart.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
            Quick Links
          </h2>
          <div className="mt-4 flex flex-col items-center gap-3 md:items-start">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-stone-200 transition hover:text-white hover:underline hover:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
            Contact Info
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-stone-300">
            <p><a href="mailto:Theritsbaker@gmail.com" className="transition hover:text-white hover:underline hover:underline-offset-4">Theritsbaker@gmail.com</a></p>
            <p><a href="tel:+66972932849" className="transition hover:text-white hover:underline hover:underline-offset-4">+66-972932849</a></p>
            <p>Bangkok, Thailand</p>
          </address>
        </div>
      </div>
    </footer>
  )
}
