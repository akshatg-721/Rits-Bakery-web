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
      className="border-t border-gray-100 bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">

        {/* ── Left: Newsletter ── */}
        <div className="w-full sm:max-w-md">
          <p className="font-serif text-xl italic text-[#111111] sm:text-2xl">
            Subscribe to our newsletter
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Fresh bakes, new drops, and sweet stories — straight to your inbox.
          </p>

          {submitted ? (
            <p className="mt-5 text-sm font-medium text-[#006241]">
              ✓ You're subscribed! We'll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex items-center border-b border-gray-300 pb-1 focus-within:border-[#006241] transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#006241] text-white transition hover:bg-[#004F35] active:scale-[0.96]"
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Follow us
          </p>
          <div className="flex items-center gap-4">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow The Rits Baker on Facebook"
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 text-[#111111] transition hover:border-[#006241] hover:text-[#006241]"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow The Rits Baker on Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 text-[#111111] transition hover:border-[#006241] hover:text-[#006241]"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
