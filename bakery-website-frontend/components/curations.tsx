import Link from 'next/link'

const curations = [
  {
    label: 'Signature Loaves',
    image: '/menu/curation_loaves.png',
    href: '#signature-loaves',
  },
  {
    label: 'Artisanal Brownies',
    image: '/menu/curation_brownies.png',
    href: '#artisanal-brownies',
  },
  {
    label: 'Tea-Time Classics',
    image: '/menu/curation_teatime.png',
    href: '#tea-time-classics',
  },
  {
    label: 'Cookies & Biscuits',
    image: '/menu/curation_cookies.png',
    href: '#cookies-biscuits',
  },
  {
    label: 'Middle Eastern Indulgence',
    image: '/menu/curation_middleeastern.png',
    href: '#middle-eastern',
  },
  {
    label: 'Savory Bites',
    image: '/menu/curation_savory.png',
    href: '#savory-bites',
  },
]

export function Curations() {
  return (
    <section
      id="curations"
      aria-label="Handcrafted curations"
      className="overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-9 text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#006241]">
            Browse by category
          </p>
          <h2 className="mt-2 font-serif text-3xl italic leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Handcrafted Curations
          </h2>
        </div>

        {/* Horizontal scrollable row on mobile, centered flex on desktop */}
        <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0">
          <div className="flex w-max snap-x snap-mandatory gap-5 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-6 lg:gap-10">
            {curations.map((curation) => (
              <Link
                key={curation.label}
                href={curation.href}
                className="group flex min-w-[112px] snap-start flex-col items-center gap-3 rounded-md py-1 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006241]/30 active:scale-[0.98] sm:min-w-0"
                aria-label={`Browse ${curation.label}`}
              >
                {/* Circle image */}
                <div className="relative size-24 overflow-hidden rounded-full shadow-[0_10px_26px_rgb(0,0,0,0.06)] ring-1 ring-black/5 ring-offset-2 ring-offset-white transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-[#006241]/60 lg:size-32">
                  <img
                    src={curation.image}
                    alt={curation.label}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {/* Subtle green tint on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#006241]/0 transition duration-300 group-hover:bg-[#006241]/10" />
                </div>

                {/* Label */}
                <span className="max-w-[108px] text-center text-sm font-semibold leading-tight text-[#111111] transition group-hover:text-[#006241] sm:max-w-[120px] lg:max-w-[128px]">
                  {curation.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
