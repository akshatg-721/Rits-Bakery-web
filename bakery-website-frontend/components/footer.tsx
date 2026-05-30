import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#1E3932] px-4 py-12 text-stone-100 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        {/* ── 3-column grid ── */}
        <div className="grid gap-10 text-center md:grid-cols-3 md:text-left">

          {/* Col 1: Brand */}
          <div className="mx-auto max-w-xs md:mx-0">
            <Link href="/" className="inline-flex min-h-11 items-center font-serif text-3xl italic text-white transition hover:text-stone-200 active:scale-[0.99]">
              The Rits Baker
            </Link>
            <p className="mt-4 text-base leading-7 text-stone-300 sm:text-sm">
              Premium handcrafted desserts made with a homemade heart. 100% eggless, made fresh in Bangkok.
            </p>
            {/* Small badge */}
            <span className="mt-5 inline-block rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-emerald-100">
              100% Eggless
            </span>
          </div>

          {/* Col 2: Quick Links */}
          <nav aria-label="Footer quick links" className="flex flex-col items-center md:items-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Quick Links
            </h2>
            <ul className="mt-5 flex flex-col items-center gap-3 md:items-start">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-stone-300 transition hover:text-white hover:underline hover:underline-offset-4 sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Contact Info
            </h2>
            <address className="mt-5 flex flex-col items-center gap-3 not-italic md:items-start">
              <a
                href="mailto:theritsbaker@gmail.com"
                className="flex min-h-11 items-center gap-2.5 text-base text-stone-300 transition hover:text-white sm:text-sm"
              >
                <Mail className="size-4 shrink-0 text-[#006241]" />
                theritsbaker@gmail.com
              </a>
              <a
                href="tel:+66972932849"
                className="flex min-h-11 items-center gap-2.5 text-base text-stone-300 transition hover:text-white sm:text-sm"
              >
                <Phone className="size-4 shrink-0 text-[#006241]" />
                +66-972932849
              </a>
              <p className="flex min-h-11 items-center gap-2.5 text-base text-stone-300 sm:text-sm">
                <MapPin className="size-4 shrink-0 text-[#006241]" />
                Bangkok, Thailand
              </p>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 border-t border-stone-700 pt-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} The Rits Baker. All rights reserved. · Delivery only · Pre-order 24 hrs in advance.
        </div>
      </div>
    </footer>
  )
}
