import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  try {
    const { name = '', email = '', phone = '', comment = '' } = await request.json()

    if (!email || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { message: 'Missing required contact configuration.' },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: 'New Order/Inquiry from The Rits Baker Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111;">
          <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
          <p><strong>Comment:</strong></p>
          <p>${escapeHtml(comment || 'Not provided').replace(/\n/g, '<br />')}</p>
        </div>
      `,
    }

    try {
      await transporter.sendMail(mailOptions)
    } catch (error) {
      console.error('Nodemailer Error:', error)

      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : 'Failed to send email',
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 })
  } catch (error) {
    console.error('Nodemailer Error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to send email',
      },
      { status: 500 },
    )
  }
}
