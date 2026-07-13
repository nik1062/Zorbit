import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Founder, NexGenPay',
    quote:
      'Working with Zorbit Studio was seamless — they delivered our platform 2 weeks ahead of schedule.',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, UrbanStack',
    quote:
      "Their technical depth is unmatched. They rebuilt our entire backend in 10 days and it hasn't gone down since.",
  },
  {
    name: 'Rahul Verma',
    role: 'CEO, CloudSync India',
    quote:
      "From MVP to production in under 3 weeks. Zorbit's speed and code quality exceeded every expectation.",
  },
];

export default function Testimonials() {
  return (
    <div className="mt-16 pt-16 border-t border-slate-800/60">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <p className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest font-mono mb-3">
          Client Feedback
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          Trusted By Builders
        </h2>
      </motion.div>

      {/* Testimonial cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="border-beam-container rounded-3xl"
          >
            <div className="border-beam-effect" />
            <div className="border-beam-content rounded-3xl bg-brand-dark-2/95 p-6 md:p-8 flex flex-col h-full">
              {/* Quote */}
              <p className="text-slate-300 text-sm md:text-base leading-relaxed flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Star rating */}
              <div className="flex items-center gap-1 mt-5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-brand-blue-glow w-4 h-4 fill-current"
                  />
                ))}
              </div>

              {/* Separator */}
              <div className="border-t border-slate-800/60 pt-5">
                {/* Client info */}
                <p className="font-display font-bold text-white">
                  {testimonial.name}
                </p>
                <p className="text-brand-blue-light/50 text-xs font-mono mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
