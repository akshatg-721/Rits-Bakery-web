const reviews = [
  {
    id: 1,
    stars: '⭐⭐⭐⭐⭐',
    body: 'Absolutely incredible. The fudge brownies are the best I\'ve had in the city. The fact that they are eggless is mind-blowing.',
    author: 'Sarah T.',
    initials: 'ST',
  },
  {
    id: 2,
    stars: '⭐⭐⭐⭐⭐',
    body: 'My go-to for gifting. The packaging is beautiful and the Date & Walnut cake feels so homemade and comforting.',
    author: 'Priya M.',
    initials: 'PM',
  },
  {
    id: 3,
    stars: '⭐⭐⭐⭐⭐',
    body: 'So easy to order via WhatsApp and it arrives perfectly fresh every time. The Nankhatai takes me straight back home!',
    author: 'Rahul K.',
    initials: 'RK',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="overflow-hidden bg-[#F9F9F9] px-4 py-12 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-[#006241]">
            Happy Customers
          </p>
          <h2 className="mt-3 font-serif text-3xl italic leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            What Bangkok is saying
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
            Real words from real customers who keep coming back for more.
          </p>
        </div>

        {/* Review cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="relative flex flex-col gap-5 rounded-md border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgb(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgb(0,0,0,0.08)] sm:p-7"
            >
              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-7 top-6 font-serif text-6xl leading-none text-[#006241]/10 select-none"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <p className="text-lg leading-none" aria-label="5 stars">
                {review.stars}
              </p>

              {/* Review text */}
              <blockquote className="flex-1 text-base leading-7 text-gray-600">
                &ldquo;{review.body}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3 border-t border-gray-100 pt-5">
                {/* Avatar initial circle */}
                <div
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#006241]/10 text-xs font-semibold text-[#006241]"
                >
                  {review.initials}
                </div>
                <span className="text-sm font-semibold text-[#111111]">
                  {review.author}
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  Verified customer
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
