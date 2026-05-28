import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | The Rits Baker",
  description:
    "Discover the story behind The Rits Baker — a warm artisanal kitchen in Bangkok creating premium handcrafted desserts with love and quality ingredients.",
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8] px-4 py-20 sm:px-8 sm:py-32">
      <article className="mx-auto max-w-2xl">
        {/* ── Page Heading ── */}
        <h1 className="text-center font-serif text-4xl italic leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
          Our Story
        </h1>

        {/* ── Thin decorative rule ── */}
        <div className="mx-auto mb-12 mt-8 h-px w-16 bg-[#111111]/20 sm:mb-16 sm:mt-10" />

        <div className="mb-12 overflow-hidden rounded-md bg-gray-100 shadow-[0_12px_34px_rgb(0,0,0,0.08)] ring-1 ring-black/5 sm:mb-16">
          <img
            src="/gallery/IMG_8022.JPG"
            alt="Freshly baked desserts from The Rits Baker kitchen"
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
          />
        </div>

        {/* ── Story Body ── */}
        <div className="space-y-7 text-center text-base leading-8 text-[#444444] sm:text-lg sm:leading-9">
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

          <p className="font-medium text-[#111111]">
            Our goal is simple: To make food that feels like home.
          </p>

          <p>
            Whether you&apos;re celebrating something special or enjoying a
            quiet sweet moment, we&apos;re happy to have you here.
          </p>

          <p className="mt-12 font-serif text-xl italic leading-8 text-[#111111]">
            With warmth,
            <br />
            The Team at The Rits Baker BKK
          </p>
        </div>

        {/* ── Minimalist Contact Sign-off ── */}
        <div className="mt-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#555555]">
            Get in Touch
          </p>

          <div className="mx-auto mt-8 h-px w-8 bg-[#111111]/15" />

          <div className="mt-8 space-y-4">
            <div>
              <a
                href="mailto:theritsbaker@gmail.com"
                className="inline-flex min-h-11 items-center text-base text-[#111111] decoration-[#111111]/30 decoration-1 underline-offset-4 transition-colors hover:underline hover:decoration-[#111111] sm:text-sm"
              >
                theritsbaker@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://wa.me/66972932849"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-base text-[#111111] decoration-[#111111]/30 decoration-1 underline-offset-4 transition-colors hover:underline hover:decoration-[#111111] sm:text-sm"
              >
                +66-972932849
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
