import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const storyRef = useRef(null)
  const valuesRef = useRef(null)
  const factsRef = useRef(null)

  const storyInView = useInView(storyRef)
  const valuesInView = useInView(valuesRef)
  const factsInView = useInView(factsRef)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-off-white">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Hero */}
      <section className="relative pt-32 pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-off-white" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="section-tag mb-6 inline-block">About</span>
              <h1 className="font-serif text-display-lg text-espresso mb-8">
                Hey, I'm Layla
              </h1>
              <p className="text-warm-brown text-lg leading-relaxed mb-6">
                I'm a 7th grader at Blalack Middle School with a passion for baking.
                What started as making treats for family and friends turned into
                my own cake pop business.
              </p>
              <p className="text-warm-brown leading-relaxed mb-8">
                Every cake pop is handmade by me — from mixing the batter to
                hand-dipping each one. I put real effort into making something
                that tastes as good as it looks.
              </p>

              {/* Handwritten accent */}
              <p className="handwritten text-2xl text-dusty-rose mb-8">
                baking is my happy place
              </p>

              {/* School badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-soft-taupe">
                <span className="w-2.5 h-2.5 bg-maroon rounded-full" />
                <span className="w-2.5 h-2.5 bg-gold rounded-full" />
                <span className="font-sans text-sm text-espresso">
                  Blalack Bears
                </span>
              </div>
            </div>

            {/* Photo */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="relative max-w-md mx-auto">
                <div className="aspect-[4/5] bg-gradient-to-br from-cream to-soft-taupe rounded-[2.5rem] overflow-hidden shadow-lifted">
                  <img
                    src="/layla_about section.png"
                    alt="Layla in her kitchen"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Accent badge */}
                <div className="absolute -bottom-4 -right-4 bg-terracotta text-white px-6 py-3 rounded-2xl font-serif shadow-medium">
                  Est. 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              storyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="section-tag mb-4 inline-block">The Story</span>
            <h2 className="font-serif text-display-md text-espresso">
              How it started
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Started baking',
                desc: 'Began making cake pops at home for family and friends. They kept asking for more.',
              },
              {
                num: '02',
                title: 'Perfected recipes',
                desc: 'Spent months testing flavors and techniques to get every recipe just right.',
              },
              {
                num: '03',
                title: 'Launched at school',
                desc: 'Started taking orders at Blalack Middle School. Word spread fast.',
              },
              {
                num: '04',
                title: 'Growing the business',
                desc: 'Now serving dozens of happy customers every week with new flavors coming soon.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-8 border border-soft-taupe transition-all duration-700 ${
                  storyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <span className="font-serif text-5xl text-soft-taupe">{item.num}</span>
                <h3 className="font-serif text-xl text-espresso mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-warm-brown leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="section-tag mb-4 inline-block">Values</span>
              <h2 className="font-serif text-display-md text-espresso mb-6">
                What I care about
              </h2>
              <p className="text-warm-brown leading-relaxed mb-10">
                Running a business at 13 has taught me a lot. Here's what matters most to me.
              </p>

              <div className="space-y-8">
                {[
                  {
                    title: 'Quality ingredients',
                    desc: 'I only use real butter, quality chocolate, and fresh ingredients. You can taste the difference.',
                  },
                  {
                    title: 'Made to order',
                    desc: 'Every order is made fresh. No sitting around for days — you get cake pops at their best.',
                  },
                  {
                    title: 'Customer satisfaction',
                    desc: 'If something\'s not right, let me know. I want every order to be worth it.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex gap-5 transition-all duration-700 ${
                      valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                  >
                    <div className="shrink-0 w-12 h-12 bg-terracotta/10 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-espresso mb-2">{item.title}</h3>
                      <p className="text-warm-brown text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div
              className={`bg-espresso rounded-[2rem] p-10 text-white transition-all duration-700 delay-300 ${
                valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <svg className="w-12 h-12 text-dusty-rose mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="font-serif text-2xl leading-relaxed mb-8">
                I started this because I love baking. Now I get to share that with
                my whole school. It's pretty cool running my own thing.
              </p>
              <p className="text-dusty-rose font-sans">
                — Layla
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section ref={factsRef} className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              factsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-serif text-display-md text-espresso">
              Quick facts
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { stat: '3', label: 'Flavors' },
              { stat: '7th', label: 'Grade' },
              { stat: '2024', label: 'Started' },
              { stat: '100%', label: 'Handmade' },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-8 text-center border border-soft-taupe transition-all duration-700 ${
                  factsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <p className="font-serif text-4xl text-espresso mb-2">{item.stat}</p>
                <p className="text-sm text-warm-brown">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-espresso relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-display-md text-white mb-6">
            Ready to try them?
          </h2>
          <p className="text-latte mb-10 leading-relaxed">
            Order now and taste the difference handmade makes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/order" className="btn-primary">
              Place Your Order
            </Link>
            <Link to="/menu" className="btn-secondary border-white/20 text-white hover:bg-white hover:text-espresso">
              View Menu
            </Link>
          </div>

          {/* Handwritten accent */}
          <p className="handwritten text-2xl text-dusty-rose/80 mt-10">
            can't wait to bake for you!
          </p>
        </div>
      </section>
    </div>
  )
}
