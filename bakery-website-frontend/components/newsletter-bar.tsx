'use client'

import { useState } from 'react'
import { ArrowRight, Facebook, Instagram } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/theritsbaker/'
const FACEBOOK_URL = 'https://www.facebook.com/theritsbaker'

export function NewsletterBar() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // In production, wire this to a mailing list provider
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section
      aria-label="Newsletter and social links"
      className="overflow-hidden border-t border-gray-100 bg-white px-4 py-11 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-9 sm:flex-row sm:items-center sm:justify-between">

        {/* ── Left: Newsletter ── */}
        <div className="w-full sm:max-w-md">
          <p className="font-serif text-2xl italic leading-tight text-[#111111] sm:text-2xl">
            Subscribe to our newsletter
          </p>
          <p className="mt-2 text-base leading-7 text-gray-500 sm:text-sm sm:leading-6">
            Fresh bakes, new drops, and sweet stories — straight to your inbox.
          </p>

          {submitted ? (
            <p className="mt-5 rounded-md border border-[#006241]/15 bg-[#006241]/5 px-4 py-3 text-base font-medium text-[#006241] sm:text-sm">
              ✓ You're subscribed! We'll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex min-h-14 items-center rounded-full border border-gray-200 bg-[#FAFAF8] px-4 py-1 shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all duration-200 focus-within:border-[#006241]/40 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#006241]/10">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="min-h-12 min-w-0 flex-1 bg-transparent text-base text-[#111111] placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="ml-3 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#006241] text-white shadow-[0_8px_20px_rgb(0,98,65,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#004F35] active:translate-y-0 active:scale-[0.96]"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </div>

        {/* ── Divider (desktop) ── */}
        <div className="hidden h-16 w-px bg-gray-200 sm:block" aria-hidden="true" />

        {/* ── Right: Social Icons ── */}
        <div className="flex flex-col items-center gap-4 sm:items-end">
          <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-gray-400">
            Follow us
          </p>
          <div className="flex items-center gap-4">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow The Rits Baker on Facebook"
              className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] shadow-[0_4px_16px_rgb(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#006241]/40 hover:text-[#006241] active:translate-y-0 active:scale-[0.96]"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow The Rits Baker on Instagram"
              className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] shadow-[0_4px_16px_rgb(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#006241]/40 hover:text-[#006241] active:translate-y-0 active:scale-[0.96]"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
