'use client'

import { useState } from 'react'

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
                  className="w-full rounded-none border border-black/30 bg-transparent p-3 text-sm focus:border-black focus:outline-none"
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  className="w-full rounded-none border border-black/30 bg-transparent p-3 text-sm focus:border-black focus:outline-none"
                />
              </div>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full rounded-none border border-black/30 bg-transparent p-3 text-sm focus:border-black focus:outline-none"
              />

              <textarea
                id="contact-comment"
                name="comment"
                rows={5}
                value={formData.comment}
                onChange={handleChange}
                placeholder="Comment"
                className="w-full rounded-none border border-black/30 bg-transparent p-3 text-sm focus:border-black focus:outline-none"
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
