import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

const featuredFlavors = [
  {
    id: 1,
    name: 'Classic Chocolate',
    description: 'Rich chocolate cake with silky milk chocolate coating',
    price: '$2.00',
    color: '#4A3C31',
    image: '/chocolate_pop.png',
  },
  {
    id: 2,
    name: 'Birthday Cake',
    description: 'Vanilla cake, white chocolate & rainbow sprinkles',
    price: '$2.00',
    color: '#F3EDE7',
    image: '/birthday_pop.png',
  },
  {
    id: 3,
    name: 'Strawberry',
    description: 'Strawberry cake with pink chocolate coating',
    price: '$2.00',
    color: '#E8B4B4',
    image: '/strawberry_pop.png',
  },
]

function useInView(ref, threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const flavorsRef = useRef(null)
  const howItWorksRef = useRef(null)
  const ctaRef = useRef(null)

  const flavorsInView = useInView(flavorsRef)
  const howItWorksInView = useInView(howItWorksRef)
  const ctaInView = useInView(ctaRef)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="bg-off-white">
      {/* Grain overlay for texture */}
      <div className="grain-overlay" />

      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-dusty-rose/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terracotta/5 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left - Content */}
            <div
              className={`lg:col-span-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="section-tag mb-8 inline-block">Blalack Middle School</span>

              <h1 className="font-serif text-display-xl text-espresso mb-8 leading-tight">
                Handcrafted
                <br />
                <span className="text-terracotta">cake pops</span>
              </h1>

              <p className="text-warm-brown text-lg leading-relaxed mb-10 max-w-md">
                Fresh, made-to-order treats crafted with care at home. Every flavor, every bite —
                made with love.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/order" className="btn-primary">
                  Place an Order
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/menu" className="btn-secondary">
                  See the Menu
                </Link>
              </div>

              {/* Handwritten accent */}
              <p className="handwritten text-2xl text-dusty-rose">
                baked fresh for you
              </p>
            </div>

            {/* Right - Visual */}
            <div
              className={`lg:col-span-6 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative">
                {/* Main image container with organic shape */}
                <div className="relative aspect-[4/5] max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-cream to-soft-taupe rounded-[3rem] overflow-hidden shadow-lifted">
                    <img
                      src="/Hero_pop.png"
                      alt="Artisan cake pops arranged elegantly"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating card - Fresh badge */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-5 shadow-pillowy">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center">
                        <span className="text-xl">✨</span>
                      </div>
                      <div>
                        <p className="font-serif text-espresso">Fresh Daily</p>
                        <p className="text-sm text-warm-brown">Made to order</p>
                      </div>
                    </div>
                  </div>

                  {/* Price tag */}
                  <div className="absolute -top-3 -right-3 bg-terracotta text-white font-sans font-medium px-5 py-2.5 rounded-full shadow-medium">
                    From $2
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats - Editorial style */}
          <div
            className={`grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-soft-taupe max-w-2xl transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { value: '3', label: 'Flavors' },
              { value: '$2', label: 'Starting price' },
              { value: '2x', label: 'Weekly pickup' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-serif text-4xl text-espresso mb-1">{stat.value}</p>
                <p className="text-sm text-warm-brown">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Flavors - Magazine Grid */}
      <section ref={flavorsRef} className="py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ${
              flavorsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <span className="section-tag mb-4 inline-block">Flavors</span>
              <h2 className="font-serif text-display-md text-espresso">
                Fan favorites
              </h2>
            </div>
            <Link to="/menu" className="btn-ghost group">
              See all flavors
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Flavor cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {featuredFlavors.map((flavor, index) => (
              <Link
                key={flavor.id}
                to="/menu"
                className={`product-card group transition-all duration-700 ${
                  flavorsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Image area */}
                <div
                  className="aspect-[4/3] relative overflow-hidden img-zoom"
                  style={{ backgroundColor: `${flavor.color}15` }}
                >
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full">
                    <span className="font-sans font-medium text-espresso text-sm">
                      {flavor.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-espresso mb-2 group-hover:text-terracotta transition-colors">
                    {flavor.name}
                  </h3>
                  <p className="text-warm-brown text-sm leading-relaxed">
                    {flavor.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="py-20 bg-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="pull-quote border-l-0 border-none text-center">
            "Every cake pop is made with real ingredients and lots of love"
          </p>
          <p className="mt-6 text-warm-brown font-sans">— Layla, Founder</p>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-28 bg-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="section-tag mb-4 inline-block">Process</span>
            <h2 className="font-serif text-display-md text-espresso">
              How to order
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Pick your flavors',
                description: 'Browse the menu and choose from 3 delicious flavors.',
              },
              {
                step: '02',
                title: 'Place your order',
                description: 'Fill out our quick order form with your selections.',
              },
              {
                step: '03',
                title: 'Pick up in the cafeteria',
                description: 'Grab your fresh cake pops in the morning or after school.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl bg-white border border-soft-taupe hover:border-dusty-rose/50 hover:shadow-soft transition-all duration-500 ${
                  howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <span className="font-serif text-5xl text-soft-taupe">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-espresso mt-6 mb-3">
                  {item.title}
                </h3>
                <p className="text-warm-brown leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Warm & Inviting */}
      <section ref={ctaRef} className="py-28 bg-espresso relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div
          className={`relative max-w-3xl mx-auto px-6 lg:px-8 text-center transition-all duration-700 ${
            ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-serif text-display-lg text-white mb-6">
            Ready to try?
          </h2>
          <p className="text-latte text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Order now and pick up your handcrafted cake pops in the cafeteria.
            Cash, Venmo, Apple Pay, or CashApp accepted.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/order" className="btn-primary">
              Place Your Order
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/menu" className="btn-secondary border-white/20 text-white hover:bg-white hover:text-espresso">
              View Menu
            </Link>
          </div>

          {/* Handwritten accent */}
          <p className="handwritten text-2xl text-dusty-rose/80 mt-10">
            see you in the cafeteria!
          </p>
        </div>
      </section>
    </div>
  )
}
