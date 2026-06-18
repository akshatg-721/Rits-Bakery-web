import { ExternalLink, MessageCircle } from 'lucide-react'

const instagramImages = [
  '/gallery/Fuzzy_Brownie.webp',
  '/gallery/Banana_cake.webp',
  '/gallery/Kunafa_Dates.webp',
  '/gallery/Pizza_Spanish_muffins.webp',
]

const INSTAGRAM_URL = 'https://www.instagram.com/theritsbaker/'
const FACEBOOK_PAGE_URL = 'https://www.facebook.com/share/18rW9vZvKp/?mibextid=wwXIfr'

export function SocialHub() {
  return (
    <section className="overflow-hidden border-t border-gray-200 bg-[#F9F9F9] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl italic leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Connect With Us
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-gray-500">
            Follow along for fresh bakes, behind-the-scenes moments, and sweet
            updates from our kitchen in Bangkok.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ── Column 1: Facebook Feed ── */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[#006241] lg:text-left">
              Latest on Facebook
            </h3>
            <div className="flex-1 overflow-hidden rounded-md border border-gray-100 bg-white shadow-[0_8px_24px_rgb(0,0,0,0.05)]">
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_PAGE_URL)}&tabs=timeline&width=400&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                width="100%"
                height="500"
                style={{ border: 'none', overflow: 'hidden' }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="The Rits Baker on Facebook"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Column 2: Instagram Showcase ── */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[#006241] lg:text-left">
              Follow @TheRitsBaker
            </h3>
            <div className="flex flex-1 flex-col rounded-md border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgb(0,0,0,0.05)]">
              {/* 2×2 image grid */}
              <div className="grid grid-cols-2 gap-2">
                {instagramImages.map((src) => (
                  <a
                    key={src}
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden rounded-md transition-transform duration-200 active:scale-[0.98]"
                  >
                    <img
                      src={src}
                      alt="The Rits Baker on Instagram"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#006241]/0 transition duration-300 group-hover:bg-[#006241]/30">
                      <ExternalLink className="size-5 text-white opacity-0 transition duration-300 group-hover:opacity-100" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Follow button */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#006241] px-5 py-2.5 text-sm font-medium text-[#006241] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006241] hover:text-white active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Follow on Instagram
              </a>
            </div>
          </div>

          {/* ── Column 3: Scan to Order ── */}
          <div className="flex flex-col">
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[#006241] lg:text-left">
              Scan to Order
            </h3>
            <div className="flex flex-1 flex-col rounded-md border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgb(0,0,0,0.05)]">
              <p className="mb-4 text-base leading-7 text-gray-500 sm:text-sm sm:leading-6">
                Scan a QR code below to place your order directly via WhatsApp or
                LINE.
              </p>

              <div className="grid flex-1 grid-cols-2 gap-4">
                {/* WhatsApp QR */}
                <div className="flex flex-col items-center gap-3 rounded-md border border-gray-200 bg-[#F9F9F9] p-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#111111]">
                    <MessageCircle className="size-4 text-[#006241]" />
                    WhatsApp
                  </div>
                  <div className="aspect-square w-full overflow-hidden rounded-md border border-gray-200 bg-white">
                    <img
                      src="/whatsapp-qr.jpg"
                      alt="Scan to order via WhatsApp"
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                </div>

                {/* LINE QR */}
                <div className="flex flex-col items-center gap-3 rounded-md border border-gray-200 bg-[#F9F9F9] p-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#111111]">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-[#06C755]"
                      fill="currentColor"
                    >
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                    LINE
                  </div>
                  <div className="aspect-square w-full overflow-hidden rounded-md border border-gray-200 bg-white">
                    <img
                      src="/line-qr.jpg"
                      alt="Scan to order via LINE"
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
