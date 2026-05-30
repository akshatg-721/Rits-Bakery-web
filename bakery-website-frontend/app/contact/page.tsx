'use client'

import { useState } from 'react'

import { Newsletter } from '@/components/newsletter'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setIsSending(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch {
      // silently handle
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8] px-4 py-20 sm:px-8 sm:py-32">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl italic leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
          Contact us
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-500">
          Have a question or special order? Reach out and we&apos;ll get back to
          you as soon as possible.
        </p>
        <div className="mx-auto mb-8 mt-8 h-px w-16 bg-[#111111]/20 sm:mb-10 sm:mt-10" />

        {/* ── Contact Form ── */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md space-y-5 text-left"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="min-h-11 w-full border-b border-black/20 bg-transparent px-0 pb-2.5 text-[15px] text-[#111111] placeholder:text-black/30 transition-colors duration-200 focus:border-black focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="min-h-11 w-full border-b border-black/20 bg-transparent px-0 pb-2.5 text-[15px] text-[#111111] placeholder:text-black/30 transition-colors duration-200 focus:border-black focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your order or question..."
              className="w-full resize-none border-b border-black/20 bg-transparent px-0 pb-2.5 pt-1 text-[15px] leading-7 text-[#111111] placeholder:text-black/30 transition-colors duration-200 focus:border-black focus:outline-none"
            />
          </div>

          {/* Submit / Success */}
          {isSubmitted ? (
            <p className="mt-4 text-center text-sm font-medium text-[#006241]">
              Email received, our team will revert you soon.
            </p>
          ) : (
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-black py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSending ? 'Sending…' : 'Send'}
            </button>
          )}
        </form>

        {/* Divider before social section */}
        <div className="mx-auto mb-8 mt-12 h-px w-16 bg-[#111111]/20 sm:mb-10 sm:mt-14" />

        {/* Follow Us — social only (newsletter subscription hidden) */}
        <Newsletter socialOnly />
      </section>
    </main>
  )
}
