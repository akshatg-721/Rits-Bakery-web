import { Mail, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const WHATSAPP_NUMBER = '66972932849'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9] px-6 py-20 sm:px-8">
      <section className="mx-auto max-w-3xl">
        {/* ── Page Header ── */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#006241]">
            Get in touch
          </p>
          <h1 className="mt-3 font-serif text-5xl italic text-[#111111] sm:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 mb-14 max-w-lg text-base leading-relaxed text-gray-500">
            Have a question or want to place a custom order? Reach us by email
            or chat with us directly on WhatsApp.
          </p>
        </div>

        {/* ── Contact Cards ── */}
        <div className="mb-14 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:Theritsbaker@gmail.com"
            className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#006241]/40 hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#006241]/10">
              <Mail className="size-5 text-[#006241]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-[#111111] transition group-hover:text-[#006241]">
                Theritsbaker@gmail.com
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-[#006241]/40 hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#006241]/10">
              <MessageCircle className="size-5 text-[#006241]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                WhatsApp
              </p>
              <p className="text-sm font-medium text-[#111111] transition group-hover:text-[#006241]">
                +66-972932849
              </p>
            </div>
          </a>
        </div>

        {/* ── Email Form ── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <h2 className="mb-1 text-xl font-semibold text-[#111111]">
            Send us an email
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Fill in the form below and we&apos;ll get back to you as soon as possible.
          </p>

          {/* Standard HTML form — FormSubmit handles submission server-side */}
          <form
            action="https://formsubmit.co/theritsbaker@gmail.com"
            method="POST"
            className="space-y-5"
          >
            {/* Honeypot + disable captcha */}
            <input type="text" name="_honey" className="hidden" />
            <input type="hidden" name="_captcha" value="false" />

            {/* Row 1: Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </span>
                <Input
                  name="name"
                  required
                  placeholder="Your full name"
                  autoComplete="name"
                  className="h-11 rounded-xl border-gray-200 bg-[#F9F9F9] px-4 text-[#111111] shadow-none placeholder:text-gray-300 focus-visible:border-[#006241] focus-visible:ring-2 focus-visible:ring-[#006241]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </span>
                <Input
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 rounded-xl border-gray-200 bg-[#F9F9F9] px-4 text-[#111111] shadow-none placeholder:text-gray-300 focus-visible:border-[#006241] focus-visible:ring-2 focus-visible:ring-[#006241]/20"
                />
              </label>
            </div>

            {/* Row 2: Phone */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Phone number{' '}
                <span className="font-normal text-gray-400">(optional)</span>
              </span>
              <Input
                name="phone"
                type="tel"
                placeholder="+66 XXX XXX XXXX"
                autoComplete="tel"
                className="h-11 rounded-xl border-gray-200 bg-[#F9F9F9] px-4 text-[#111111] shadow-none placeholder:text-gray-300 focus-visible:border-[#006241] focus-visible:ring-2 focus-visible:ring-[#006241]/20"
              />
            </label>

            {/* Row 3: Message */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Message
              </span>
              <Textarea
                name="message"
                required
                placeholder="Tell us what you'd like to order or ask…"
                rows={5}
                className="min-h-32 resize-none rounded-xl border-gray-200 bg-[#F9F9F9] px-4 py-3 text-[#111111] shadow-none placeholder:text-gray-300 focus-visible:border-[#006241] focus-visible:ring-2 focus-visible:ring-[#006241]/20"
              />
            </label>

            <Button
              id="contact-email-submit"
              type="submit"
              className="h-12 w-full rounded-xl bg-[#006241] text-base font-semibold text-white shadow-sm transition-all hover:bg-[#004F35] hover:shadow-md active:scale-[0.98] sm:w-auto sm:px-10"
            >
              <Mail className="size-4" />
              Send Message
            </Button>
          </form>
        </div>

        {/* ── Divider ── */}
        <div className="relative my-10 flex items-center">
          <div className="flex-1 border-t border-gray-200" />
          <span className="mx-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
            or
          </span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* ── WhatsApp CTA ── */}
        <div className="rounded-2xl border border-[#006241]/20 bg-[#006241] px-8 py-10 text-center shadow-md">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/15">
            <MessageCircle className="size-7 text-white" />
          </div>
          <h2 className="font-serif text-2xl italic text-white sm:text-3xl">
            Prefer to chat?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            Skip the form — message us directly on WhatsApp for the fastest
            response. We typically reply within minutes.
          </p>
          <a
            id="contact-whatsapp-cta"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#006241] shadow-sm transition-all hover:bg-white/90 hover:shadow-md active:scale-[0.98]"
          >
            <MessageCircle className="size-5" />
            Chat directly on WhatsApp 💬
          </a>
        </div>
      </section>
    </main>
  )
}
