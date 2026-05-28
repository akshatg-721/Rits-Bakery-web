'use client'

import { FormEvent, useState } from 'react'
import { Loader2, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '66972932849'
const FORM_SUBMIT_URL = 'https://formsubmit.co/theritsbaker@gmail.com'
const FIELD_LIMITS = {
  name: 80,
  email: 254,
  phone: 32,
  message: 1500,
  honeypot: 80,
} as const

function readBoundedField(
  formData: FormData,
  field: keyof typeof FIELD_LIMITS,
) {
  const value = String(formData.get(field) ?? '').trim()

  if (value.length > FIELD_LIMITS[field]) {
    throw new Error('Please shorten your message and try again.')
  }

  return value
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    if (isSubmitting) return

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    setSubmitError('')

    setIsSubmitting(true)

    try {
      const name = readBoundedField(formData, 'name')
      const email = readBoundedField(formData, 'email')
      const phone = readBoundedField(formData, 'phone')
      const message = readBoundedField(formData, 'message')

      if (!name || !email || !message) {
        throw new Error('Please complete all required fields.')
      }

      formData.set('name', name)
      formData.set('email', email)
      formData.set('phone', phone)
      formData.set('message', message)

      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setIsSubmitted(true)
      form.reset()
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or message us on WhatsApp.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8] px-4 py-20 sm:px-8 sm:py-32">
      <section className="mx-auto max-w-2xl">
        {/* ── Page Heading ── */}
        <h1 className="text-center font-serif text-4xl italic leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
          Contact us
        </h1>
        <p className="mx-auto mt-5 max-w-md text-center text-base leading-7 text-gray-500">
          Have a question or want to place a custom order? Fill in the form
          below and we&apos;ll get back to you shortly.
        </p>

        {/* ── Thin decorative rule ── */}
        <div className="mx-auto mb-12 mt-8 h-px w-16 bg-[#111111]/20 sm:mb-14 sm:mt-10" />

        {/* ── Email Form ── */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
          aria-busy={isSubmitting}
        >
          {/* Honeypot + disable captcha */}
          <input
            type="text"
            name="_honey"
            className="hidden"
            maxLength={FIELD_LIMITS.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <input type="hidden" name="_captcha" value="false" />

          {/* Row 1: Name + Email */}
          <div className="grid gap-6 sm:grid-cols-2">
            <input
              name="name"
              required
              minLength={2}
              maxLength={FIELD_LIMITS.name}
              placeholder="Name"
              autoComplete="name"
              className="min-h-12 w-full rounded-md border border-gray-200 bg-white/70 px-4 py-3 text-base text-[#111111] shadow-[0_4px_18px_rgb(0,0,0,0.04)] transition-all duration-200 placeholder:text-gray-400 focus:border-[#006241]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#006241]/10"
            />
            <input
              name="email"
              required
              type="email"
              maxLength={FIELD_LIMITS.email}
              placeholder="Email *"
              autoComplete="email"
              inputMode="email"
              className="min-h-12 w-full rounded-md border border-gray-200 bg-white/70 px-4 py-3 text-base text-[#111111] shadow-[0_4px_18px_rgb(0,0,0,0.04)] transition-all duration-200 placeholder:text-gray-400 focus:border-[#006241]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#006241]/10"
            />
          </div>

          {/* Row 2: Phone */}
          <input
            name="phone"
            type="tel"
            maxLength={FIELD_LIMITS.phone}
            pattern="^[+()\\d\\s-]{7,32}$"
            placeholder="Phone number"
            autoComplete="tel"
            inputMode="tel"
            className="min-h-12 w-full rounded-md border border-gray-200 bg-white/70 px-4 py-3 text-base text-[#111111] shadow-[0_4px_18px_rgb(0,0,0,0.04)] transition-all duration-200 placeholder:text-gray-400 focus:border-[#006241]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#006241]/10"
          />

          {/* Row 3: Comment */}
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={FIELD_LIMITS.message}
            placeholder="Comment"
            rows={6}
            className="w-full resize-none rounded-md border border-gray-200 bg-white/70 px-4 py-3 text-base leading-7 text-[#111111] shadow-[0_4px_18px_rgb(0,0,0,0.04)] transition-all duration-200 placeholder:text-gray-400 focus:border-[#006241]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#006241]/10"
          />

          {submitError && (
            <p
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-base leading-6 text-red-700"
              role="alert"
            >
              {submitError}
            </p>
          )}

          {/* Submit */}
          {isSubmitted ? (
            <p className="mt-4 rounded-md border border-[#006241]/15 bg-[#006241]/5 px-4 py-3 text-base font-medium text-[#006241]">
              Email received, our team will revert you soon.
            </p>
          ) : (
            <button
              id="contact-email-submit"
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#111111] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_10px_24px_rgb(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#333333] hover:shadow-[0_14px_34px_rgb(0,0,0,0.16)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isSubmitting ? 'Sending' : 'Send'}
            </button>
          )}
        </form>

        {/* ── Divider ── */}
        <div className="relative my-16 flex items-center">
          <div className="flex-1 border-t border-gray-300" />
          <span className="mx-5 text-[11px] font-medium uppercase tracking-widest text-gray-400">
            or
          </span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* ── WhatsApp CTA (flat editorial style) ── */}
        <div className="text-center">
          <h2 className="font-serif text-3xl italic leading-tight text-[#111111] sm:text-3xl">
            Prefer to chat?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-gray-500 sm:text-sm sm:leading-6">
            Skip the form — message us directly on WhatsApp for the fastest
            response. We typically reply within minutes.
          </p>
          <a
            id="contact-whatsapp-cta"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-md border border-[#111111] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111111] hover:text-white hover:shadow-[0_12px_28px_rgb(0,0,0,0.12)] active:translate-y-0 active:scale-[0.98]"
          >
            <MessageCircle className="size-4" />
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  )
}
