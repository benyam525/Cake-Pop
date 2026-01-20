import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-off-white/95 backdrop-blur-md shadow-soft py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <span className="font-serif text-2xl text-espresso tracking-tight">
              PopShop
            </span>
            <span className="hidden sm:inline-block h-4 w-px bg-soft-taupe" />
            <span className="hidden sm:inline-block text-sm font-sans text-warm-brown">
              by Layla
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-sans text-sm tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-terracotta'
                    : 'text-warm-brown hover:text-espresso'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-terracotta/40 rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/order"
              className="btn-primary py-2.5 px-6 text-sm"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-cream transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-espresso rounded-full transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-espresso rounded-full transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-espresso rounded-full transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-off-white/98 backdrop-blur-lg border-t border-soft-taupe transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block font-sans text-base py-3 px-4 rounded-2xl transition-all ${
                location.pathname === link.path
                  ? 'text-terracotta bg-terracotta/5'
                  : 'text-espresso hover:bg-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link to="/order" className="btn-primary w-full justify-center">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
