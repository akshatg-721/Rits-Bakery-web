import type { Metadata } from "next";
import { MessageCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | The Rits Baker",
  description:
    "Discover the story behind The Rits Baker — a warm artisanal kitchen in Bangkok creating premium handcrafted desserts with love and quality ingredients.",
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9] font-sans text-[#111111]">
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Page Heading */}
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tight">
          Our Story
        </h1>

        {/* Story Content */}
        <section className="space-y-6 text-center text-lg leading-relaxed">
          <p>
            At The Rits Baker, we believe great baking begins with love, quality
            ingredients, and beautiful flavors.
          </p>

          <p>
            What started as a passion for baking has grown into a warm artisanal
            kitchen in Bangkok, where we create premium handcrafted desserts made
            with care and a homemade touch.
          </p>

          <p>
            From our signature fudge brownies and classic Nankhatai to freshly
            baked loaves and rich chocolate treats, everything is made using pure
            butter, fine-quality chocolate, and carefully selected ingredients we
            truly love.
          </p>

          <p className="font-semibold">
            Our goal is simple: To make food that feels like home.
          </p>

          <p>
            Whether you&apos;re celebrating something special or enjoying a
            quiet sweet moment, we&apos;re happy to have you here.
          </p>

          <p className="mt-10 italic">
            With warmth,
            <br />
            The Team at The Rits Baker BKK
          </p>
        </section>

        {/* Get in Touch Card */}
        <section className="mt-16 rounded-md border border-gray-200 bg-white p-8 text-center">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Get in Touch
          </h2>

          <div className="space-y-5">
            {/* Email */}
            <div className="flex items-center justify-center gap-2 text-[#111111]">
              <Mail className="h-5 w-5" />
              <a
                href="mailto:Theritsbaker@gmail.com"
                className="underline underline-offset-4 transition-colors hover:text-[#006241]"
              >
                Theritsbaker@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-center">
              <a
                href="https://wa.me/66972932849"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#006241] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                +66-972932849
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
