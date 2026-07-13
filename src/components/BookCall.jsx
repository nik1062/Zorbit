import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function BookCall() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-16 pt-16 border-t border-slate-800/60"
    >
      <div className="text-center">
        {/* Label */}
        <p className="text-brand-blue-light uppercase tracking-widest font-mono text-sm mb-4">
          Ready to Start?
        </p>

        {/* Heading */}
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
          Let&apos;s Build Something Fast
        </h2>

        {/* Subtext */}
        <p className="text-white/50 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Book a free consultation and get a project blueprint within 24 hours
          &mdash; no commitment needed.
        </p>

        {/* CTA Button with pulsing glow ring */}
        <div className="relative inline-block">
          {/* Pulsing glow ring */}
          <span className="absolute inset-0 rounded-2xl bg-brand-blue/20 animate-pulse blur-xl scale-110 pointer-events-none" />

          <a
            href="mailto:zorbitweb@gmail.com"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-blue text-white font-display font-bold text-base md:text-lg hover:bg-brand-blue-light transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)]"
          >
            Book a Free Consultation
            <FiArrowRight className="text-lg" />
          </a>
        </div>

        {/* Note */}
        <p className="text-white/30 text-xs font-mono mt-4">
          // calendly integration coming soon
        </p>
      </div>
    </motion.div>
  );
}
