import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'Project costs vary based on complexity, features, and timeline. A basic website starts around ₹15,000–₹30,000, while full-stack platforms with custom backends can range from ₹50,000 to ₹2,00,000+. We provide detailed estimates after the discovery call.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Landing pages and MVPs ship in 3–7 days. Standard websites take 2–3 weeks. Complex platforms with custom APIs and dashboards typically run 4–8 weeks depending on scope.',
  },
  {
    question: 'Do you offer post-launch support?',
    answer:
      'Yes. We offer monthly maintenance retainers that include bug fixes, feature updates, performance monitoring, and priority SLA support. Most clients stay on after launch.',
  },
  {
    question: "What's your development process?",
    answer:
      'We follow a 4-phase sprint model: Discovery & Blueprinting → Figma & Design Tokens → High-Velocity Build Sprints → Deployment & SLA Monitoring. Each phase has clear deliverables and timeline commitments.',
  },
  {
    question: 'Can you work with an existing codebase?',
    answer:
      'Absolutely. We regularly onboard onto existing React, Next.js, Flutter, and Node.js projects. We start with a codebase audit, then integrate into your Git workflow with clean PRs and documentation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-16 pt-16 border-t border-slate-800/60">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left column — heading & description */}
        <div className="lg:col-span-5">
          <span className="text-brand-blue-light text-sm font-semibold uppercase tracking-widest font-mono">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">
            Common Questions
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
            Everything you need to know before working with us. Can&apos;t find
            what you&apos;re looking for? Reach out directly.
          </p>
        </div>

        {/* Right column — accordion */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-brand-dark-3/30 border-brand-blue/30 glow-blue'
                    : 'bg-brand-dark-3/10 border-slate-800/60'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm md:text-base text-white hover:text-brand-blue-glow focus:outline-none transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="text-white/40 flex-shrink-0 ml-4"
                  >
                    <FiChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-slate-800/40">
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
