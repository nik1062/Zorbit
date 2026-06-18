import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import Button from './Button'
import { api } from '../services/api'

const initialReviews = [
  {
    id: 1,
    name: 'Management Team',
    company: 'Metro Mirchi 2.0',
    rating: 5,
    text: 'Zorbit completely overhauled Metro Mirchi 2.0. They delivered our web interface in 5 days, but the custom offline-first POS integration was the real game-changer—zero scanner lag under rush hours.',
    date: 'June 2026',
    approved: true,
  },
  {
    id: 2,
    name: 'Lab Owner',
    company: 'Fast Laptop Solution',
    rating: 5,
    text: 'Our Bhagalpur lab had 1,020+ reviews online but zero digital leads. Zorbit built our Instant Diagnosis Desk in 3 days, routing MacBook and gaming laptop service tickets directly to our WhatsApp bench.',
    date: 'June 2026',
    approved: true,
  },
  {
    id: 3,
    name: 'Hackathon Coordinator',
    company: 'TN-GeoGuard GIS',
    rating: 5,
    text: 'The speed at which this team mapped coordinate boundaries and built geofencing alerts was outstanding. Their Leaflet GIS MVP won 1st Place at Niral Thiruvizha 3.0.',
    date: 'May 2026',
    approved: true,
  },
  {
    id: 4,
    name: 'Tech Infrastructure Lead',
    company: 'Campus Resources',
    rating: 5,
    text: 'The velocity of this team is incredible. Our campus platform went from concept note to a stable working version in just 2 weeks. Clean code and zero latency.',
    date: 'May 2026',
    approved: true,
  },
]

export default function ReviewSystem() {
  const [reviews, setReviews] = useState(initialReviews)
  const [form, setForm] = useState({ name: '', company: '', text: '' })
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    api.getReviews().then((data) => {
      if (data.length > 0) {
        setReviews(data)
      } else {
        // Initialize reviews with defaults
        api.updateReviews(initialReviews).then((seeded) => {
          setReviews(seeded)
        })
      }
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.text) return

    const newReview = {
      id: Date.now(),
      name: form.name,
      company: form.company || 'Independent Client',
      rating,
      text: form.text,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      approved: false, // Starts as pending approval
    }

    const updated = await api.createReview(newReview)
    setReviews(updated)
    setForm({ name: '', company: '', text: '' })
    setRating(5)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  const approvedReviews = reviews.filter((r) => r.approved === true)
  // Fallback to initial reviews if no approved reviews are found in database
  const displayReviews = approvedReviews.length > 0 ? approvedReviews : initialReviews

  return (
    <div className="grid lg:grid-cols-3 gap-12 mt-12">
      {/* Review list */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <h3 className="font-display font-bold text-2xl mb-2 text-white">What Our Partners Say</h3>
        {displayReviews.length === 0 ? (
          <p className="text-slate-300 text-sm md:text-base font-medium">No reviews featured at the moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {displayReviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-brand-dark-2 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < rev.rating ? 'fill-brand-blue-glow text-brand-blue-glow' : 'text-white/20'}
                        size={14}
                      />
                    ))}
                  </div>
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-4 italic">"{rev.text}"</p>
                </div>
                <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-center text-xs md:text-sm">
                  <div>
                    <p className="text-white font-semibold tracking-wide">{rev.name}</p>
                    <p className="text-brand-blue-light font-medium tracking-wide mt-0.5">{rev.company}</p>
                  </div>
                  <span className="text-slate-300 text-[10px] md:text-xs font-mono">{rev.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="p-8 rounded-2xl bg-brand-dark-3 border border-brand-blue/20 glow-blue self-start">
        <h3 className="font-display font-semibold text-xl mb-4 text-white">Leave Feedback</h3>
        {success ? (
          <div className="text-center py-8">
            <p className="text-brand-blue-glow font-bold text-sm md:text-base mb-1">Feedback Submitted!</p>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">Thank you. Your review has been sent to our developer workspace for pending moderator approval.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wide mb-1.5">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <FiStar
                      size={20}
                      className={
                        star <= (hoverRating || rating)
                          ? 'fill-brand-blue-glow text-brand-blue-glow'
                          : 'text-white/20'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wide mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 text-sm rounded-lg bg-brand-dark border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wide mb-1.5">Company / Project</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Metro Mirchi 2.0"
                className="w-full px-3 py-2 text-sm rounded-lg bg-brand-dark border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/30"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wide mb-1.5">Review</label>
              <textarea
                required
                rows={3}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="How was your experience working with Zorbit?"
                className="w-full px-3 py-2 text-sm rounded-lg bg-brand-dark border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/30 resize-none"
              />
            </div>

            <Button type="submit" variant="primary" className="py-2.5 text-xs w-full font-bold uppercase tracking-wider">
              Submit Review
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
