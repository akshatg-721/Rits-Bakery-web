import Link from 'next/link'

const curations = [
  {
    label: 'Signature Loaves',
    image: '/images/curation_loaves.png',
    href: '/#menu',
    filter: 'Signature Loaves',
  },
  {
    label: 'Artisanal Brownies',
    image: '/images/curation_brownies.png',
    href: '/#menu',
    filter: 'Desserts',
  },
  {
    label: 'Tea-Time Classics',
    image: '/images/curation_teatime.png',
    href: '/#menu',
    filter: 'Desserts',
  },
  {
    label: 'Cookies & Biscuits',
    image: '/images/curation_cookies.png',
    href: '/#menu',
    filter: 'Cookies',
  },
  {
    label: 'Middle Eastern Indulgence',
    image: '/images/curation_middleeastern.png',
    href: '/#menu',
    filter: 'Desserts',
  },
  {
    label: 'Savory Bites',
    image: '/images/curation_savory.png',
    href: '/#menu',
    filter: 'Savories & Gifting',
  },
]

export function Curations() {
  return (
    <section
      id="curations"
      aria-label="Handcrafted curations"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#006241]">
            Browse by category
          </p>
          <h2 className="mt-2 font-serif text-3xl italic text-[#111111] sm:text-4xl">
            Handcrafted Curations
          </h2>
        </div>

        {/* Horizontal scrollable row on mobile, centered flex on desktop */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-6 sm:w-auto sm:flex-wrap sm:justify-center lg:gap-10">
            {curations.map((curation) => (
              <Link
                key={curation.label}
                href={curation.href}
                className="group flex flex-col items-center gap-3 focus:outline-none"
                aria-label={`Browse ${curation.label}`}
              >
                {/* Circle image */}
                <div className="relative size-24 overflow-hidden rounded-full ring-2 ring-transparent ring-offset-2 transition duration-300 group-hover:ring-[#006241] lg:size-32">
                  <img
                    src={curation.image}
                    alt={curation.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  {/* Subtle green tint on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#006241]/0 transition duration-300 group-hover:bg-[#006241]/10" />
                </div>

                {/* Label */}
                <span className="max-w-[100px] text-center text-xs font-semibold leading-tight text-[#111111] transition group-hover:text-[#006241] sm:max-w-[120px] sm:text-sm lg:max-w-[128px]">
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
