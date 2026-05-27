'use client'

import { useState, type FormEvent } from 'react'
import { Mail, MessageCircle, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const WHATSAPP_NUMBER = '66972932849'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const message = [
      'New Web Inquiry:',
      `Name: ${encodeURIComponent(name)}`,
      `Email: ${encodeURIComponent(email)}`,
      `Phone: ${encodeURIComponent(phone)}`,
      `Message: ${encodeURIComponent(comment)}`,
    ].join('%0A')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] px-6 py-20 sm:px-8">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-center font-serif text-5xl italic text-[#111111] sm:text-6xl">
          Contact Us
        </h1>
        <p className="mx-auto mb-14 max-w-lg text-center text-base leading-relaxed text-gray-500">
          Have a question or want to place a custom order? Drop us a message and
          we&apos;ll get back to you soon.
        </p>

        {/* ── Contact Cards ── */}
        <div className="mb-14 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:Theritsbaker@gmail.com"
            className="group flex items-center gap-4 rounded-md border border-gray-200 bg-white p-5 transition hover:border-[#006241]/30 hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#006241]/10">
              <Mail className="size-5 text-[#006241]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-[#111111] group-hover:text-[#006241]">
                Theritsbaker@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/66972932849"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-md border border-gray-200 bg-white p-5 transition hover:border-[#006241]/30 hover:shadow-sm"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#006241]/10">
              <MessageCircle className="size-5 text-[#006241]" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                WhatsApp
              </p>
              <p className="text-sm font-medium text-[#111111] group-hover:text-[#006241]">
                +66-972932849
              </p>
            </div>
          </a>
        </div>

        {/* ── Contact Form ── */}
        <div className="rounded-md border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-[#111111]">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-600">
                  Name
                </span>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-11 rounded-md border-gray-200 bg-[#F9F9F9] px-4 shadow-none focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
                  autoComplete="name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-600">
                  Email *
                </span>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 rounded-md border-gray-200 bg-[#F9F9F9] px-4 shadow-none focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-600">
                Phone number
              </span>
              <Input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-11 rounded-md border-gray-200 bg-[#F9F9F9] px-4 shadow-none focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
                autoComplete="tel"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-600">
                Message
              </span>
              <Textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="min-h-32 resize-none rounded-md border-gray-200 bg-[#F9F9F9] px-4 py-3 shadow-none focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
                rows={5}
              />
            </label>

            <Button
              type="submit"
              className="h-11 rounded-md bg-[#006241] px-8 text-white hover:bg-[#004F35]"
            >
              <Send className="size-4" />
              Send via WhatsApp
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
