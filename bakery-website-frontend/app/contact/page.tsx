import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '66972932849'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-6 py-24 sm:px-8 sm:py-32">
      <section className="mx-auto max-w-2xl">
        {/* ── Page Heading ── */}
        <h1 className="text-center font-serif text-5xl italic text-[#111111] sm:text-6xl">
          Contact us
        </h1>
        <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-gray-500">
          Have a question or want to place a custom order? Fill in the form
          below and we&apos;ll get back to you shortly.
        </p>

        {/* ── Thin decorative rule ── */}
        <div className="mx-auto mt-10 mb-14 h-px w-16 bg-[#111111]/20" />

        {/* ── Email Form ── */}
        <form
          action="https://formsubmit.co/theritsbaker@gmail.com"
          method="POST"
          className="space-y-6"
        >
          {/* Honeypot + disable captcha */}
          <input type="text" name="_honey" className="hidden" />
          <input type="hidden" name="_captcha" value="false" />

          {/* Row 1: Name + Email */}
          <div className="grid gap-6 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Name"
              autoComplete="name"
              className="w-full border border-gray-400 bg-transparent p-4 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#111111] focus:outline-none focus:ring-0"
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email *"
              autoComplete="email"
              className="w-full border border-gray-400 bg-transparent p-4 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#111111] focus:outline-none focus:ring-0"
            />
          </div>

          {/* Row 2: Phone */}
          <input
            name="phone"
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            className="w-full border border-gray-400 bg-transparent p-4 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#111111] focus:outline-none focus:ring-0"
          />

          {/* Row 3: Comment */}
          <textarea
            name="message"
            required
            placeholder="Comment"
            rows={6}
            className="w-full resize-none border border-gray-400 bg-transparent p-4 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#111111] focus:outline-none focus:ring-0"
          />

          {/* Submit */}
          <button
            id="contact-email-submit"
            type="submit"
            className="bg-[#111111] px-10 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#333333] active:bg-black"
          >
            Send
          </button>
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
          <h2 className="font-serif text-2xl italic text-[#111111] sm:text-3xl">
            Prefer to chat?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
            Skip the form — message us directly on WhatsApp for the fastest
            response. We typically reply within minutes.
          </p>
          <a
            id="contact-whatsapp-cta"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 border border-[#111111] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
          >
            <MessageCircle className="size-4" />
            WhatsApp Us
          </a>
        </div>
      </section>
    </main>
  )
}
