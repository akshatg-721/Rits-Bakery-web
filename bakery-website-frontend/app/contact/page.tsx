'use client'

import { useState } from 'react'

import { LINE_ORDER_URL, WHATSAPP_ORDER_URL } from '@/lib/checkout'

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
      <path d="M19.1 4.9A9.94 9.94 0 0 0 12.04 2C6.52 2 2.03 6.48 2.03 12c0 1.76.46 3.49 1.34 5.02L2 22l5.14-1.35A9.95 9.95 0 0 0 12.04 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.94-7.1Zm-7.06 15.4c-1.52 0-3.01-.41-4.31-1.2l-.31-.19-3.05.8.82-2.98-.2-.31A8.2 8.2 0 0 1 3.8 12a8.24 8.24 0 0 1 8.24-8.24 8.2 8.2 0 0 1 5.83 2.42A8.19 8.19 0 0 1 20.28 12a8.24 8.24 0 0 1-8.24 8.3Zm4.52-6.17c-.25-.13-1.46-.72-1.69-.81-.23-.08-.39-.13-.56.13-.17.26-.64.81-.79.98-.15.17-.3.2-.55.07-.25-.13-1.06-.39-2.01-1.25-.74-.66-1.24-1.48-1.39-1.73-.15-.26-.02-.39.11-.52.12-.12.25-.3.38-.45.13-.15.17-.26.25-.43.08-.17.04-.33-.02-.46-.07-.13-.56-1.35-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.45.07-.68.33-.23.26-.88.86-.88 2.1s.9 2.45 1.02 2.62c.13.17 1.77 2.7 4.29 3.78.6.26 1.08.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.46-.6 1.67-1.19.21-.59.21-1.09.14-1.19-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

function LineLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
      <path d="M20.94 10.57c0-4.3-4.3-7.8-9.59-7.8s-9.6 3.5-9.6 7.8c0 3.85 3.4 7.07 7.99 7.67l-.33 2.12c-.03.18.15.32.31.22l2.44-1.67c.39.03.79.05 1.19.05 5.3 0 9.59-3.49 9.59-7.79Zm-13.3 2.08H5.73a.36.36 0 0 1-.36-.36V8.5c0-.2.16-.36.36-.36s.36.16.36.36v3.43h1.55c.2 0 .36.16.36.36s-.16.36-.36.36Zm1.59-.36a.36.36 0 0 1-.72 0V8.5c0-.2.16-.36.36-.36s.36.16.36.36v3.79Zm4.03 0a.36.36 0 0 1-.65.21l-1.84-2.5v2.29a.36.36 0 0 1-.72 0V8.5a.36.36 0 0 1 .65-.21l1.84 2.5V8.5c0-.2.16-.36.36-.36s.36.16.36.36v3.79Zm3.26-3.43h-1.55v1.07h1.55c.2 0 .36.16.36.36s-.16.36-.36.36h-1.55v1.07h1.55c.2 0 .36.16.36.36s-.16.36-.36.36h-1.91a.36.36 0 0 1-.36-.36V8.5c0-.2.16-.36.36-.36h1.91c.2 0 .36.16.36.36s-.16.36-.36.36Z" />
    </svg>
  )
}

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] stroke-current" fill="none" strokeWidth="1.8">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.25" cy="6.75" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
      <path d="M13.64 21v-7.3h2.45l.37-2.84h-2.82V9.04c0-.82.23-1.38 1.42-1.38h1.52V5.12c-.26-.03-1.16-.12-2.2-.12-2.17 0-3.66 1.32-3.66 3.76v2.1H8.67v2.84h2.45V21h2.52Z" />
    </svg>
  )
}

const socialContactLinks = [
  {
    label: 'WhatsApp',
    href: WHATSAPP_ORDER_URL,
    ariaLabel: 'Contact The Rits Baker on WhatsApp',
    cardClassName:
      'border-[#B9A28D]/24 bg-[#F7EFE4] shadow-[0_6px_18px_rgba(74,93,71,0.08)]',
    iconWrapperClassName:
      'border-[#7CB186]/18 bg-[linear-gradient(180deg,rgba(238,248,240,0.98),rgba(227,243,232,0.93))] text-[#2C6E49] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_5px_14px_rgba(82,128,96,0.10)]',
    Icon: WhatsAppLogo,
  },
  {
    label: 'LINE',
    href: LINE_ORDER_URL,
    ariaLabel: 'Contact The Rits Baker on LINE',
    cardClassName:
      'border-[#B9A28D]/20 bg-[#FBF6EF] shadow-[0_6px_18px_rgba(62,44,35,0.055)]',
    iconWrapperClassName:
      'border-[#91C19D]/16 bg-[linear-gradient(180deg,rgba(242,251,244,0.98),rgba(231,246,235,0.94))] text-[#2F8F50]',
    Icon: LineLogo,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/theritsbaker/',
    ariaLabel: 'Open The Rits Baker Instagram profile',
    cardClassName:
      'border-[#B9A28D]/20 bg-[#FBF6EF] shadow-[0_6px_18px_rgba(62,44,35,0.055)]',
    iconWrapperClassName:
      'border-[#C9A9A1]/18 bg-[linear-gradient(180deg,rgba(255,247,243,0.98),rgba(247,234,241,0.95)_48%,rgba(244,229,221,0.95))] text-[#9A4F68]',
    Icon: InstagramLogo,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18rW9vZvKp/?mibextid=wwXIfr',
    ariaLabel: 'Open The Rits Baker Facebook page',
    cardClassName:
      'border-[#B9A28D]/20 bg-[#FBF6EF] shadow-[0_6px_18px_rgba(62,44,35,0.055)]',
    iconWrapperClassName:
      'border-[#A7BDD8]/18 bg-[linear-gradient(180deg,rgba(244,248,253,0.98),rgba(232,241,251,0.94))] text-[#476B9A]',
    Icon: FacebookLogo,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (
    e: Parameters<NonNullable<React.ComponentProps<'form'>['onSubmit']>>[0],
  ) => {
    e.preventDefault()
    if (!formData.email.trim()) return

    setIsSending(true)
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        const nextErrorMessage =
          errorData?.error || errorData?.message || 'Failed to send email.'
        setErrorMessage(nextErrorMessage)
        alert(nextErrorMessage)
        return
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', comment: '' })
    } catch {
      const nextErrorMessage = 'Failed to send email.'
      setErrorMessage(nextErrorMessage)
      alert(nextErrorMessage)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FDF9F9] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl italic leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Contact us
          </h1>
        </div>

        <div className="mt-8 max-w-3xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {socialContactLinks.map(({
              label,
              href,
              ariaLabel,
              cardClassName,
              iconWrapperClassName,
              Icon,
            }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={`group flex min-h-[72px] items-center gap-3 overflow-hidden rounded-2xl border px-3.5 py-3 text-left text-[#3E2C23] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#8E7566]/32 hover:shadow-[0_12px_26px_rgba(62,44,35,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E2C23]/18 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF9F9] md:min-h-[76px] ${cardClassName}`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-[1.03] ${iconWrapperClassName} md:size-10`}
                >
                  <Icon />
                </span>
                <span className="block min-w-0 text-[14px] font-medium tracking-[0.01em] text-[#3E2C23] md:text-[15px]">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
          {isSubmitted ? (
            <p className="text-sm text-[#111111]">
              Email received, our team will revert you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full rounded-none border border-black/30 bg-transparent p-3 text-base focus:border-black focus:outline-none"
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  className="w-full rounded-none border border-black/30 bg-transparent p-3 text-base focus:border-black focus:outline-none"
                />
              </div>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full rounded-none border border-black/30 bg-transparent p-3 text-base focus:border-black focus:outline-none"
              />

              <textarea
                id="contact-comment"
                name="comment"
                rows={5}
                value={formData.comment}
                onChange={handleChange}
                placeholder="Comment"
                className="w-full rounded-none border border-black/30 bg-transparent p-3 text-base focus:border-black focus:outline-none"
              />

              <button
                type="submit"
                disabled={isSending}
                className="mt-2 rounded-none bg-[#111] px-10 py-3 text-sm tracking-wide text-white transition-colors hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
              {errorMessage && <p>{errorMessage}</p>}
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
