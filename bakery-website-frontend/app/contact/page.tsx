'use client'

import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/lib/data'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const phoneNumber = siteConfig.whatsappNumber.replace(/\D/g, '')
    const message = [
      'New Web Inquiry:',
      `Name: ${encodeURIComponent(name)}`,
      `Email: ${encodeURIComponent(email)}`,
      `Phone: ${encodeURIComponent(phone)}`,
      `Message: ${encodeURIComponent(comment)}`,
    ].join('%0A')

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#FDF2F4] px-6 py-20 text-gray-900 sm:px-8">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-14 text-center font-serif text-5xl italic tracking-normal text-gray-950 sm:text-6xl">
          Contact us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </span>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-12 rounded-none border-gray-300 bg-white/35 px-4 shadow-none focus-visible:border-gray-500 focus-visible:ring-0"
                autoComplete="name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">
                Email *
              </span>
              <Input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-none border-gray-300 bg-white/35 px-4 shadow-none focus-visible:border-gray-500 focus-visible:ring-0"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Phone number
            </span>
            <Input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-12 rounded-none border-gray-300 bg-white/35 px-4 shadow-none focus-visible:border-gray-500 focus-visible:ring-0"
              autoComplete="tel"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Comment
            </span>
            <Textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className="min-h-36 resize-none rounded-none border-gray-300 bg-white/35 px-4 py-3 shadow-none focus-visible:border-gray-500 focus-visible:ring-0"
              rows={5}
            />
          </label>

          <Button
            type="submit"
            className="h-11 rounded-none bg-black px-9 text-white hover:bg-gray-800"
          >
            Send
          </Button>
        </form>
      </section>
    </main>
  )
}
