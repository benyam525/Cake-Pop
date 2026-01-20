import { useState, useEffect, useMemo } from 'react'

const menuItems = [
  { id: 1, name: 'Classic Chocolate', price: 2.00 },
  { id: 2, name: 'Birthday Cake', price: 2.00 },
  { id: 3, name: 'Strawberry', price: 2.00 },
]

const grades = ['6th Grade', '7th Grade', '8th Grade', 'Teacher/Staff']

// Pickup days: Tuesday (2) and Thursday (4)
const PICKUP_DAYS = {
  TUESDAY: 2,
  THURSDAY: 4,
}

// Cutoff: 2 days before pickup at 11:59 PM
// Tuesday pickup -> order by Sunday (day 0)
// Thursday pickup -> order by Tuesday (day 2)
const CUTOFF_DAYS = {
  [PICKUP_DAYS.TUESDAY]: 0,   // Sunday
  [PICKUP_DAYS.THURSDAY]: 2,  // Tuesday
}

/**
 * Get available pickup dates based on current date and 2-day cutoff rule
 * @returns {Array} Array of available pickup date objects
 */
const getAvailablePickupDates = () => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  // Check if we're past 11:59 PM (basically end of day)
  const isPastCutoff = currentHour === 23 && currentMinute >= 59

  const availableDates = []

  // Check next 14 days for available pickup dates
  for (let daysAhead = 0; daysAhead <= 14; daysAhead++) {
    const checkDate = new Date(now)
    checkDate.setDate(now.getDate() + daysAhead)
    const checkDay = checkDate.getDay()

    // Only consider Tuesday (2) and Thursday (4)
    if (checkDay !== PICKUP_DAYS.TUESDAY && checkDay !== PICKUP_DAYS.THURSDAY) {
      continue
    }

    // Calculate the cutoff day for this pickup date
    const cutoffDay = CUTOFF_DAYS[checkDay]

    // If today is after the cutoff day for this pickup, skip it
    // For Tuesday pickup: cutoff is Sunday (2 days before)
    // For Thursday pickup: cutoff is Tuesday (2 days before)
    if (daysAhead < 2) {
      // Less than 2 days away - already past cutoff
      continue
    }

    if (daysAhead === 2 && isPastCutoff) {
      // Exactly 2 days away but past 11:59 PM - too late
      continue
    }

    // This pickup date is available
    const dayName = checkDay === PICKUP_DAYS.TUESDAY ? 'Tuesday' : 'Thursday'
    const formatted = checkDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })

    // Calculate cutoff info for display
    const cutoffDayName = cutoffDay === 0 ? 'Sunday' : 'Tuesday'

    availableDates.push({
      date: checkDate,
      dayName,
      formatted,
      cutoffDay: cutoffDayName,
      value: formatted,
    })

    // Only return the next 2 available dates
    if (availableDates.length >= 2) {
      break
    }
  }

  return availableDates
}

export default function Order() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    pickupDate: '',
    pickupTime: '',
    notes: '',
  })

  // Calculate available pickup dates (memoized to prevent recalculation on every render)
  const availablePickupDates = useMemo(() => getAvailablePickupDates(), [])
  const [quantities, setQuantities] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const updateQuantity = (itemId, delta) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0
      const newValue = Math.max(0, current + delta)
      if (newValue === 0) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: newValue }
    })
  }

  const getTotalItems = () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0)

  const getTotalPrice = () => {
    return Object.entries(quantities).reduce((sum, [itemId, qty]) => {
      const item = menuItems.find((m) => m.id === parseInt(itemId))
      return sum + (item?.price || 0) * qty
    }, 0)
  }

  const getOrderSummary = () => {
    return Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, qty]) => {
        const item = menuItems.find((m) => m.id === parseInt(itemId))
        return `${item?.name} x${qty}`
      })
      .join(', ')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (getTotalItems() < 3) {
      alert('Minimum order is 3 cake pops')
      return
    }

    setIsSubmitting(true)

    const submitData = {
      name: formData.name,
      grade: formData.grade,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      orderDetails: getOrderSummary(),
      totalItems: getTotalItems(),
      totalPrice: `$${getTotalPrice().toFixed(2)}`,
      notes: formData.notes || 'None',
    }

    try {
      // TODO: Replace with your Formspree form ID
      // 1. Go to https://formspree.io and create a free account
      // 2. Create a new form and copy the form ID (e.g., "xyzabcde")
      // 3. Replace "YOUR_FORM_ID" below with your actual form ID
      const FORMSPREE_ID = 'YOUR_FORM_ID'
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', grade: '', pickupDate: '', pickupTime: '', notes: '' })
        setQuantities({})
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }

    setIsSubmitting(false)
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-6">
        <div className="grain-overlay" />
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-sage/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-display-md text-espresso mb-4">Order received</h1>
          <p className="text-warm-brown mb-8 leading-relaxed">
            Thanks for your order! Your cake pops will be ready for pickup in the cafeteria.
          </p>
          <div className="bg-cream rounded-3xl p-6 mb-8 text-left border border-soft-taupe">
            <p className="font-serif text-espresso mb-1">Pickup Location</p>
            <p className="text-warm-brown text-sm">Blalack Middle School</p>
          </div>
          <button onClick={() => setSubmitStatus(null)} className="btn-primary">
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-off-white" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="section-tag mb-6 inline-block">Order</span>
            <h1 className="font-serif text-display-lg text-espresso mb-4">
              Place your order
            </h1>
            <p className="text-warm-brown text-lg leading-relaxed">
              Fill out the form below. Minimum 3 cake pops per order.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Your Info */}
            <div className="bg-white rounded-3xl p-8 border border-soft-taupe">
              <h2 className="font-serif text-xl text-espresso mb-6">
                Your info
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-sans text-espresso mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-sans text-espresso mb-2">
                    Grade
                  </label>
                  <select
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Flavors */}
            <div className="bg-white rounded-3xl p-8 border border-soft-taupe">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-espresso">
                  Select flavors
                </h2>
                <span className="text-sm text-warm-brown bg-cream px-3 py-1 rounded-full">Min. 3</span>
              </div>

              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                      quantities[item.id]
                        ? 'border-terracotta/40 bg-terracotta/5'
                        : 'border-soft-taupe hover:border-dusty-rose/50'
                    }`}
                  >
                    <div>
                      <p className="font-serif text-espresso">
                        {item.name}
                      </p>
                      <p className="text-sm text-warm-brown">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!quantities[item.id]}
                        className="w-9 h-9 rounded-full border border-soft-taupe flex items-center justify-center text-warm-brown hover:border-espresso hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-serif text-lg text-espresso">
                        {quantities[item.id] || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-9 h-9 rounded-full bg-espresso text-white flex items-center justify-center hover:bg-terracotta transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordering Info Banner */}
            <div className="bg-cream rounded-3xl p-6 border border-soft-taupe">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-serif text-espresso mb-1">Order ahead notice</p>
                  <p className="text-sm text-warm-brown leading-relaxed">
                    Orders must be placed <span className="font-medium text-espresso">2 days in advance</span>.
                    For Tuesday pickup, order by Sunday night. For Thursday pickup, order by Tuesday night.
                  </p>
                </div>
              </div>
            </div>

            {/* Pickup Day */}
            <div className="bg-white rounded-3xl p-8 border border-soft-taupe">
              <h2 className="font-serif text-xl text-espresso mb-6">
                Pickup day
              </h2>
              {availablePickupDates.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {availablePickupDates.map((pickupDate) => (
                    <button
                      key={pickupDate.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, pickupDate: pickupDate.value })}
                      className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                        formData.pickupDate === pickupDate.value
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-soft-taupe hover:border-dusty-rose/50'
                      }`}
                    >
                      <p className="font-serif text-lg text-espresso">{pickupDate.formatted}</p>
                      <p className="text-sm text-warm-brown">Order by {pickupDate.cutoffDay} night</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-warm-brown text-sm">No pickup dates available at this time. Please check back later.</p>
              )}
            </div>

            {/* Pickup Time */}
            <div className="bg-white rounded-3xl p-8 border border-soft-taupe">
              <h2 className="font-serif text-xl text-espresso mb-6">
                Pickup time
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 'morning', label: 'Morning', desc: 'Before school in cafeteria' },
                  { id: 'afternoon', label: 'After School', desc: 'In the cafeteria' }
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, pickupTime: option.label })}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                      formData.pickupTime === option.label
                        ? 'border-terracotta bg-terracotta/5'
                        : 'border-soft-taupe hover:border-dusty-rose/50'
                    }`}
                  >
                    <p className="font-serif text-lg text-espresso">{option.label}</p>
                    <p className="text-sm text-warm-brown">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-3xl p-8 border border-soft-taupe">
              <h2 className="font-serif text-xl text-espresso mb-2">
                Notes
              </h2>
              <p className="text-sm text-warm-brown mb-4">Optional - allergies, special requests, etc.</p>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requests?"
                rows={3}
                className="form-input resize-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-espresso rounded-3xl p-8 text-white">
              <h2 className="font-serif text-xl mb-6">Order summary</h2>

              {getTotalItems() > 0 ? (
                <div className="space-y-3 mb-6">
                  {Object.entries(quantities)
                    .filter(([_, qty]) => qty > 0)
                    .map(([itemId, qty]) => {
                      const item = menuItems.find((m) => m.id === parseInt(itemId))
                      return (
                        <div key={itemId} className="flex justify-between text-latte">
                          <span>{item?.name} x {qty}</span>
                          <span>${((item?.price || 0) * qty).toFixed(2)}</span>
                        </div>
                      )
                    })}
                </div>
              ) : (
                <p className="text-latte mb-6">No items selected</p>
              )}

              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-2xl">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                {getTotalItems() > 0 && getTotalItems() < 3 && (
                  <p className="text-terracotta text-sm mt-3">
                    Add {3 - getTotalItems()} more to meet minimum
                  </p>
                )}
              </div>

              {submitStatus === 'error' && (
                <div className="bg-terracotta/30 rounded-2xl p-4 mb-4">
                  <p className="text-sm">Something went wrong. Please try again.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || getTotalItems() < 3 || !formData.name || !formData.grade || !formData.pickupDate || !formData.pickupTime}
                className="w-full bg-terracotta text-white font-sans font-medium py-4 rounded-2xl hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Place Order'}
              </button>

              <p className="text-latte text-xs text-center mt-5">
                Pay at pickup: Cash, Venmo, Apple Pay, or CashApp
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
