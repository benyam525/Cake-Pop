import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const availableFlavors = [
  {
    id: 1,
    name: 'Classic Chocolate',
    description: 'Rich chocolate cake, milk chocolate coating, white chocolate drizzle',
    price: 2.00,
    popular: true,
    image: '/chocolate_pop.png',
  },
  {
    id: 2,
    name: 'Birthday Cake',
    description: 'Vanilla cake with sprinkles, white chocolate coating',
    price: 2.00,
    popular: true,
    image: '/birthday_pop.png',
  },
  {
    id: 3,
    name: 'Strawberry',
    description: 'Strawberry cake, pink chocolate coating',
    price: 2.00,
    popular: true,
    image: '/strawberry_pop.png',
  },
]

const comingSoonFlavors = [
  {
    id: 101,
    name: 'Strength Pop',
    description: '6-7g protein per pop — fuel your day deliciously',
    tag: 'New',
  },
  {
    id: 102,
    name: 'Red Velvet',
    description: 'Red velvet cake, cream cheese center, white chocolate',
  },
  {
    id: 103,
    name: 'Cookies & Cream',
    description: 'Chocolate cake with Oreo pieces, white chocolate coating',
  },
  {
    id: 104,
    name: 'Peanut Butter',
    description: 'Chocolate cake, peanut butter swirl, chocolate coating',
  },
  {
    id: 105,
    name: 'Lemon',
    description: 'Lemon cake, white chocolate, lemon glaze',
  },
  {
    id: 106,
    name: 'S\'mores',
    description: 'Graham cake, marshmallow center, chocolate coating',
  },
  {
    id: 107,
    name: 'Cotton Candy',
    description: 'Vanilla cake, swirled pink & blue coating',
  },
  {
    id: 108,
    name: 'Double Chocolate',
    description: 'Extra rich chocolate, dark chocolate coating',
  },
  {
    id: 109,
    name: 'Confetti',
    description: 'Funfetti cake, white chocolate, rainbow sprinkles',
  },
  {
    id: 110,
    name: 'Caramel Apple',
    description: 'Apple spice cake, caramel coating',
    tag: 'Seasonal',
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

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false)
  const labRef = useRef(null)
  const partyPacksRef = useRef(null)
  const labInView = useInView(labRef)
  const partyPacksInView = useInView(partyPacksRef)

  // Voting state
  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem('popshop-flavor-votes')
    return saved ? JSON.parse(saved) : {}
  })
  const [userVotes, setUserVotes] = useState(() => {
    const saved = localStorage.getItem('popshop-user-votes')
    return saved ? JSON.parse(saved) : []
  })

  // Persist votes to localStorage
  useEffect(() => {
    localStorage.setItem('popshop-flavor-votes', JSON.stringify(votes))
  }, [votes])

  useEffect(() => {
    localStorage.setItem('popshop-user-votes', JSON.stringify(userVotes))
  }, [userVotes])

  const handleVote = (flavorId) => {
    const hasVoted = userVotes.includes(flavorId)

    if (hasVoted) {
      // Remove vote
      setUserVotes(prev => prev.filter(id => id !== flavorId))
      setVotes(prev => ({
        ...prev,
        [flavorId]: Math.max((prev[flavorId] || 0) - 1, 0)
      }))
    } else {
      // Add vote
      setUserVotes(prev => [...prev, flavorId])
      setVotes(prev => ({
        ...prev,
        [flavorId]: (prev[flavorId] || 0) + 1
      }))
    }
  }

  // Sort coming soon flavors by votes (descending)
  const sortedComingSoonFlavors = [...comingSoonFlavors].sort((a, b) => {
    const votesA = votes[a.id] || 0
    const votesB = votes[b.id] || 0
    return votesB - votesA
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-off-white">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-off-white" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="section-tag mb-6 inline-block">Menu</span>
            <h1 className="font-serif text-display-lg text-espresso mb-6">
              Our flavors
            </h1>
            <p className="text-warm-brown text-lg leading-relaxed max-w-lg">
              Every cake pop is made fresh to order. Start with our signature flavors —
              more coming soon!
            </p>
          </div>

          {/* Info badges */}
          <div
            className={`flex flex-wrap gap-4 mt-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {[
              'Minimum 3 per order',
              'Cash, Venmo, Apple Pay, CashApp',
              'Party packs available',
            ].map((info, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-warm-brown bg-white px-4 py-2 rounded-full border border-soft-taupe">
                <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{info}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Flavors */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2
            className={`font-serif text-2xl text-espresso mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Available Now
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableFlavors.map((item, index) => (
              <div
                key={item.id}
                className={`group relative bg-white rounded-3xl overflow-hidden border border-soft-taupe hover:border-dusty-rose/50 hover:shadow-soft transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-cream">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Badge */}
                  {item.popular && (
                    <span className="inline-block px-3 py-1 text-xs font-sans font-medium bg-terracotta/10 text-terracotta rounded-full mb-3">
                      Popular
                    </span>
                  )}

                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-espresso mb-2 group-hover:text-terracotta transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-warm-brown text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="font-serif text-xl text-espresso">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In the Lab - Coming Soon */}
      <section ref={labRef} className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className={`mb-12 transition-all duration-700 ${
              labInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="section-tag">Coming Soon</span>
            </div>
            <h2 className="font-serif text-display-md text-espresso mb-3">
              In the Lab
            </h2>
            <p className="text-warm-brown max-w-lg">
              Vote for the flavors you want to see next! Most requested flavors get prioritized.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedComingSoonFlavors.map((item, index) => {
              const voteCount = votes[item.id] || 0
              const hasVoted = userVotes.includes(item.id)

              return (
                <div
                  key={item.id}
                  className={`relative bg-white/60 rounded-3xl p-6 border transition-all duration-700 ${
                    hasVoted
                      ? 'border-terracotta/30 bg-white/80'
                      : 'border-soft-taupe/50 hover:border-dusty-rose/50'
                  } ${
                    labInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Rank badge for top 3 */}
                  {index < 3 && voteCount > 0 && (
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center text-sm font-sans font-medium shadow-medium">
                      {index + 1}
                    </div>
                  )}

                  {/* Tag */}
                  <div className="flex items-center gap-2 mb-4">
                    {item.tag && (
                      <span className={`inline-block px-3 py-1 text-xs font-sans font-medium rounded-full ${
                        item.tag === 'New'
                          ? 'bg-terracotta/10 text-terracotta'
                          : 'bg-sage/20 text-sage'
                      }`}>
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-serif text-lg mb-2 transition-colors ${
                    hasVoted ? 'text-espresso' : 'text-espresso/70'
                  }`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    hasVoted ? 'text-warm-brown' : 'text-warm-brown/60'
                  }`}>
                    {item.description}
                  </p>

                  {/* Vote button */}
                  <button
                    onClick={() => handleVote(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                      hasVoted
                        ? 'bg-terracotta text-white hover:bg-terracotta/90'
                        : 'bg-white border border-soft-taupe text-warm-brown hover:border-terracotta hover:text-terracotta'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${hasVoted ? 'scale-110' : ''}`}
                      fill={hasVoted ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{voteCount} {voteCount === 1 ? 'vote' : 'votes'}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Party Packs */}
      <section ref={partyPacksRef} className="py-20 bg-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className={`bg-white rounded-[2rem] p-8 md:p-12 border border-soft-taupe shadow-soft transition-all duration-700 ${
              partyPacksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-tag mb-4 inline-block">Save More</span>
                <h2 className="font-serif text-display-md text-espresso mb-4">
                  Party packs
                </h2>
                <p className="text-warm-brown leading-relaxed mb-8">
                  Planning a party or want to share with friends? Order a party pack
                  and save on your favorites.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { qty: '6 Pack', price: '$11', desc: 'Mix any flavors' },
                    { qty: '12 Pack', price: '$20', desc: 'Perfect for parties' },
                    { qty: '24 Pack', price: '$36', desc: 'Class party size' },
                  ].map((pack, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-soft-taupe last:border-0">
                      <div>
                        <p className="font-serif text-lg text-espresso">{pack.qty}</p>
                        <p className="text-sm text-warm-brown">{pack.desc}</p>
                      </div>
                      <span className="font-serif text-xl text-terracotta">{pack.price}</span>
                    </div>
                  ))}
                </div>

                <Link to="/order" className="btn-primary">
                  Order a Pack
                </Link>
              </div>

              <div className="relative aspect-square bg-gradient-to-br from-cream to-soft-taupe rounded-3xl overflow-hidden">
                <img
                  src="/party_pack.png"
                  alt="Party pack of assorted cake pops"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-display-md text-espresso mb-4">
            Ready to order?
          </h2>
          <p className="text-warm-brown mb-8 leading-relaxed">
            Pick your favorites and fill out our order form. Pickup available mornings or after school in the cafeteria.
          </p>
          <Link to="/order" className="btn-primary">
            Place Your Order
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
