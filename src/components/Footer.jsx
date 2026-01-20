import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-soft-taupe">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif text-2xl text-espresso">
                PopShop by Layla
              </span>
            </Link>
            <p className="text-warm-brown leading-relaxed mb-6 max-w-sm">
              Handcrafted cake pops made fresh at home with love.
              Every bite is made with care.
            </p>
            <p className="handwritten text-2xl text-dusty-rose">
              made with love
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-espresso text-lg mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/menu', label: 'Our Flavors' },
                { path: '/order', label: 'Order Now' },
                { path: '/about', label: 'About Layla' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-warm-brown hover:text-terracotta transition-colors font-sans text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-espresso text-lg mb-6">
              Info
            </h4>
            <ul className="space-y-4 text-warm-brown">
              <li className="flex items-start gap-3">
                <span className="text-dusty-rose mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <a href="mailto:layla@thepopshop.co" className="text-sm hover:text-terracotta transition-colors">
                  layla@thepopshop.co
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-dusty-rose mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-sm">Blalack Middle School</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-dusty-rose mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-sm">Pickup: Morning or After School</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-dusty-rose mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-sm">Cash, Venmo, Apple Pay, CashApp</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-soft-taupe flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-brown/60 text-sm font-sans">
            © {new Date().getFullYear()} PopShop by Layla
          </p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-maroon rounded-full" />
            <span className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-warm-brown/60 text-sm font-sans">Blalack Bears</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
