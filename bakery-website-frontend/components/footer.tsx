import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────
const quickLinks = [
  { label: 'Home',               href: '/'        },
  { label: 'Menu',               href: '/#menu'   },
  { label: 'Gallery',            href: '/gallery' },
  { label: 'Our Story',          href: '/about'   },
  { label: 'Contact',            href: '/contact' },
  { label: 'FAQ',                href: '/faq'     },
  { label: 'Terms & Conditions', href: '/terms'   },
  { label: 'Privacy Policy',     href: '/privacy' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/theritsbaker',
    Icon:  Instagram,
  },
  {
    label: 'Facebook',
    href:  'https://www.facebook.com/share/18rW9vZvKp/?mibextid=wwXIfr',
    Icon:  Facebook,
  },
  {
    label: 'WhatsApp',
    href:  'https://wa.me/66972932849',
    Icon:  MessageCircle,
  },
]

// ── Component ─────────────────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="overflow-hidden bg-[#1E3932] text-stone-100">

      {/* ════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
      ════════════════════════════════════════ */}
      <div className="md:hidden">
        <div className="mx-auto max-w-lg px-5 pb-8 pt-10">

          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="font-serif text-2xl italic text-white transition-opacity hover:opacity-75"
            >
              The Rits Baker
            </Link>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-stone-400">
              Handcrafted desserts made with premium ingredients in Bangkok.
            </p>
            {/* Social icons */}
            <div className="mt-4 flex gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-400 transition hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Thin rule */}
          <div className="my-6 h-px bg-white/[0.07]" />

          {/* Quick links — 2-column compact grid */}
          <div className="flex flex-col items-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-stone-500">
              Quick Links
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-center">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex items-center py-1 text-[12.5px] text-stone-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thin rule */}
          <div className="my-6 h-px bg-white/[0.07]" />

          {/* Contact — compact inline list */}
          <div className="flex flex-col items-center gap-2.5">
            <a
              href="mailto:theritsbaker@gmail.com"
              className="flex items-center gap-2 text-[12.5px] text-stone-400 transition-colors hover:text-white"
            >
              <Mail className="size-3.5 shrink-0 text-[#4ade80]" />
              theritsbaker@gmail.com
            </a>
            <a
              href="https://wa.me/66972932849"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[12.5px] text-stone-400 transition-colors hover:text-white"
            >
              <MessageCircle className="size-3.5 shrink-0 text-[#4ade80]" />
              +66-972932849
            </a>
            <p className="flex items-center gap-2 text-[12.5px] text-stone-500">
              <MapPin className="size-3.5 shrink-0 text-[#4ade80]" />
              Bangkok, Thailand
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 text-center">
            <p className="text-[11px] text-stone-600">
              © {year} The Rits Baker
            </p>
            <p className="mt-1 text-[10.5px] text-stone-700">
              Delivery Only&ensp;•&ensp;Pre-Order 24 Hours in Advance
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ════════════════════════════════════════ */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-6xl px-8 py-16 lg:px-8 lg:py-20">

          {/* 3-column grid */}
          <div className="grid gap-10 md:grid-cols-3 lg:gap-16">

            {/* Col 1: Brand */}
            <div className="flex flex-col">
              <Link
                href="/"
                className="font-serif text-3xl italic text-white transition-opacity duration-200 hover:opacity-80"
              >
                The Rits Baker
              </Link>

              <p className="mt-4 text-[13.5px] leading-relaxed text-stone-400">
                Handcrafted desserts, thoughtfully baked in Bangkok. Premium
                ingredients, timeless flavours, and made-to-order indulgence.
              </p>

              <div className="mt-4 flex flex-col gap-0.5">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-500">
                  Bangkok, Thailand
                </p>
                <p className="text-[10.5px] tracking-[0.14em] text-stone-600">
                  Est. 2025
                </p>
              </div>

              {/* Social icons */}
              <div className="mt-6 flex gap-2.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-400 transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <nav aria-label="Footer quick links">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-500">
                Quick Links
              </h2>
              <ul className="mt-5 flex flex-col gap-2.5">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-flex items-center text-[13.5px] text-stone-400 transition-colors duration-150 hover:text-white"
                    >
                      <span className="relative">
                        {label}
                        <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-white/40 transition-transform duration-200 group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3: Contact */}
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-500">
                Contact
              </h2>
              <address className="mt-5 flex flex-col gap-5 not-italic">

                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 shrink-0 text-[#4ade80]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Email
                    </span>
                  </div>
                  <a
                    href="mailto:theritsbaker@gmail.com"
                    className="mt-1 block text-[13.5px] text-stone-300 transition-colors duration-150 hover:text-white"
                  >
                    theritsbaker@gmail.com
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="size-3.5 shrink-0 text-[#4ade80]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      WhatsApp
                    </span>
                  </div>
                  <a
                    href="https://wa.me/66972932849"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[13.5px] text-stone-300 transition-colors duration-150 hover:text-white"
                  >
                    +66-972932849
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 shrink-0 text-[#4ade80]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Location
                    </span>
                  </div>
                  <p className="mt-1 text-[13.5px] text-stone-400">
                    Bangkok, Thailand
                  </p>
                </div>

              </address>
            </div>
          </div>

          {/* Premium ornamental divider */}
          <div className="mt-14 flex items-center gap-5">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <div className="h-1 w-1 rounded-full bg-white/10" />
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Bottom bar */}
          <div className="mt-7 flex flex-col items-center gap-1.5 text-center">
            <p className="text-[12px] text-stone-500">
              © {year} The Rits Baker&ensp;·&ensp;Crafted with care in Bangkok
            </p>
            <p className="text-[11px] tracking-wide text-stone-600">
              Delivery Only&ensp;•&ensp;Pre-Order 24 Hours in Advance
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}
