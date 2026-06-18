import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiHome, FiCpu, FiMessageSquare, FiActivity, FiPhone,
  FiMapPin, FiEye, FiSend, FiCheckCircle,
  FiMessageCircle, FiArrowUp, FiChevronDown, FiSearch, FiUser
} from 'react-icons/fi';

// ─── DATA ────────────────────────────────────────────────────────────────────

const REVIEWS = [
  { id: 1, name: 'Md. Shahnawaz', category: 'MacBook', rating: 5, review: 'Fantastic chip-level diagnostics! The technician repaired my dead MacBook Pro motherboard right in front of my eyes at the MG Road bench. Unmatched transparency in Bhagalpur.', date: 'Just now' },
  { id: 2, name: 'Alok Ranjan', category: 'Home Visit', rating: 5, review: 'Highly recommend their home visit service. The technician came to my flat near Sandis Compound, diagnosed the startup registry loop, and resolved it in an hour. Extremely good behavior and fair charges.', date: '3 days ago' },
  { id: 3, name: 'Sumit Bajpayee', category: 'Gaming', rating: 5, review: 'Got my Acer Predator gaming rig repasted with premium liquid-metal and cooling fans serviced. They showed me the old thermal paste condition and explained the heat sync logic. Best repair shop near Bhikhanpur.', date: '1 week ago' },
  { id: 4, name: 'Shrishti Kumari', category: 'Screens', rating: 5, review: 'Replaced my shattered Dell Inspiron touch-display within 3 hours. Real genuine parts and original color output. Affordable pricing compared to other service hubs.', date: '2 weeks ago' },
  { id: 5, name: 'Rahul Mishra', category: 'Data Recovery', rating: 5, review: 'Saved all my engineering design files from a liquid-damaged SSD. Very honest and professional owner. Will always recommend.', date: '3 weeks ago' },
];

const SERVICES = [
  {
    id: 'macbook',
    title: 'MacBook Logic Board Microsoldering',
    sla: '24–48 Hours',
    price: 'From ₹2,500',
    desc: 'Restoration of liquid-damaged MacBooks, shorted capacitors, logic board IC replacements (PMIC, backlight controllers, USB-C controller chips), and charging faults.',
    symptoms: 'Device not turning on, no backlight, liquid spill, boot loops, or battery not charging.',
    device: 'Apple MacBook Pro/Air',
  },
  {
    id: 'gaming',
    title: 'Gaming Laptop Tuning & Optimization',
    sla: '2–4 Hours',
    price: 'From ₹1,200',
    desc: 'GPU/CPU thermal re-pasting using high-performance liquid metal or thermal grease, cooling fan system overhaul, and copper cooling pipeline alignments.',
    symptoms: 'Frame drops, overheating shutdowns, high fan noise, thermal throttling, or screen artifacts.',
    device: 'Windows Premium Gaming System',
  },
  {
    id: 'screens',
    title: 'Retina Screens & Hinge Replacement',
    sla: '3 Hours',
    price: 'From ₹4,500',
    desc: 'Original replacement matrix panels, flexgate resolution, and precise mechanical alignment repairs for damaged hinge supports.',
    symptoms: 'Cracked glass, vertical lines, flickering pixels, loose hinge, or sound from lid opening.',
    device: 'Standard Professional Laptop',
  },
  {
    id: 'data',
    title: 'Forensic Storage & Data Recovery',
    sla: '2–5 Days',
    price: 'From ₹1,800',
    desc: 'Component-level data extraction, recovery from water-damaged storage nodes, and solid-state data reconstruction.',
    symptoms: 'Deleted directories, water-damaged SSD, drive requesting format, or corrupted system files.',
    device: 'Data Storage Unit',
  },
];

const LANDMARKS = {
  'Bhagalpur Junction': '1.2 km — approx. 5 mins via MG Road',
  'Sandis Compound': '800 m — approx. 3 mins drive',
  'Zero Mile Chowk': '4.5 km — approx. 15 mins drive',
  'BCE Bhagalpur': '6.5 km — approx. 20 mins drive',
};

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(scrolled * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
        style={{ width: `${progress}%` }}
        transition={{ ease: 'linear' }}
      />
    </div>
  );
}

// ─── FLOATING WHATSAPP BUTTON ─────────────────────────────────────────────────

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919472151451?text=Hi%20Fast%20Laptop%20Solution%2C%20I%20need%20help%20with%20my%20laptop."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95"
    >
      <FiMessageCircle className="w-4 h-4" />
      <span>WhatsApp Us</span>
    </a>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          <FiArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function FastLaptopSolution() {
  const [activeTab, setActiveTab] = useState('home');

  // Diagnosis form
  const [selectedDevice, setSelectedDevice] = useState('Apple MacBook Pro/Air');
  const [severity, setSeverity] = useState('Moderate');
  const [serviceType, setServiceType] = useState('In-Store Bench Assessment');
  const [issue, setIssue] = useState('');

  // Services
  const [expandedService, setExpandedService] = useState(null);

  // Reviews
  const [reviews, setReviews] = useState(REVIEWS);
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewFilter, setReviewFilter] = useState('All');
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState('MacBook');
  const [newText, setNewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Location
  const [selectedLandmark, setSelectedLandmark] = useState('Bhagalpur Junction');

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const text = `Hi Fast Laptop Solution, I need a repair quote.%0A%0A*--- DIAGNOSTIC DISPATCH ---*%0A*Device:* ${selectedDevice}%0A*Severity:* ${severity}%0A*Assessment:* ${serviceType}%0A*Issue:* ${issue}`;
    window.open(`https://wa.me/919472151451?text=${text}`, '_blank');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newText) return;
    setReviews([{ id: Date.now(), name: newName, category: newCategory, rating: Number(newRating), review: newText, date: 'Just now' }, ...reviews]);
    setNewName(''); setNewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleInjectService = (srv) => {
    setSelectedDevice(srv.device);
    setIssue(`Inquiry for: ${srv.title}. Please check and provide estimation.`);
    setActiveTab('diagnosis');
  };

  const filteredReviews = reviews.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(reviewSearch.toLowerCase()) || r.review.toLowerCase().includes(reviewSearch.toLowerCase());
    const matchFilter = reviewFilter === 'All' || r.category === reviewFilter;
    return matchSearch && matchFilter;
  });

  const TABS = [
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'services', label: 'Services', icon: FiCpu },
    { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
    { id: 'diagnosis', label: 'Diagnosis Desk', icon: FiActivity },
  ];

  return (
    <div className="bg-[#05070B] text-slate-100 min-h-screen font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950">

      <ScrollProgressBar />
      <FloatingWhatsApp />
      <BackToTop />

      {/* Top strip */}
      <div className="bg-[#080c15] border-b border-slate-900 text-[10px] text-slate-500 py-2 px-6 hidden md:block font-mono">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <FiMapPin className="text-emerald-400 w-3 h-3" />
            C.S. Compound, MG Road, Bhikhanpur, Bhagalpur — 812001 (In front of Royal Darbar)
          </span>
          <span>Mon–Sat: 10:00 AM – 8:00 PM &nbsp;|&nbsp; <span className="text-amber-400">Sunday Closed</span></span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#05070B]/90 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-950 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.25)]">
              <FiCpu className="text-emerald-400 w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <span className="font-black text-sm tracking-wider text-white block">
                FAST LAPTOP <span className="text-emerald-400">SOLUTION</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">Laptop Repair Hub · Bhagalpur</span>
            </div>
          </button>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-900 p-1 rounded-xl">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {active && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-400' : ''}`} />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Call button */}
          <a href="tel:+919472151451" className="hidden lg:flex items-center gap-2 border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-white hover:border-emerald-500/40 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
            <FiPhone className="text-emerald-400 w-3.5 h-3.5" />
            +91 94721 51451
          </a>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-24 min-h-[85vh]">
        <AnimatePresence mode="wait">

          {/* ── HOME ── */}
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-20">

              {/* Hero (Replaced Terminal with Trust & Quality Panel) */}
              <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#10B981_0%,_transparent_60%)]" />

                <div className="lg:col-span-7 space-y-7">
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-amber-400">★★★★★</span>
                    5.0 · 1,020+ Verified Google Reviews
                  </motion.div>

                  <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
                    Bhagalpur's Premier<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      Component-Level<br />Repair Experts
                    </span>
                  </motion.h1>

                  <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
                    We diagnose at chip level — not guesswork. Precision microsoldering for liquid damage, GPU faults, and dead systems, with full transparency at every step.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="grid grid-cols-2 gap-4 max-w-md">
                    <div className="flex items-start gap-3 bg-slate-950/70 border border-slate-900 p-3.5 rounded-xl">
                      <FiEye className="text-emerald-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-white block">Live Bench Repair</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">Watch your device repaired in front of you.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-slate-950/70 border border-slate-900 p-3.5 rounded-xl">
                      <FiHome className="text-cyan-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-white block">Home Visit Service</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">Technician at your location in Bhagalpur.</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
                    <button onClick={() => setActiveTab('diagnosis')} className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:brightness-110 hover:-translate-y-0.5 transition-all">
                      Get Instant Quote
                    </button>
                    <button onClick={() => setActiveTab('services')} className="border border-slate-800 bg-slate-950/50 text-slate-300 font-semibold px-8 py-4 rounded-xl hover:border-slate-700 hover:text-white transition-all">
                      View Services
                    </button>
                  </motion.div>
                </div>

                {/* Right Side Quality Assurance Graphic Card instead of Terminal */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5 bg-gradient-to-b from-[#0b1324] to-[#060913] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-5 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="border-b border-slate-800/60 pb-3 flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Zorbit Architecture Matrix</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">100% Verified</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">✓ No Fixed No Fee Policy</div>
                      <p className="text-[11px] text-slate-400 leading-normal">Agar aapka device standard protocol ke tahat motherboard level par fix nahi ho paata, toh hum zero setup fees charge karte hain.</p>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                      <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">✓ Original Hardware Mapping</div>
                      <p className="text-[11px] text-slate-400 leading-normal">Displays, battery circuits, aur chip arrays hamesha multi-tested genuine source validation ke sath hi replace kiye jaate hain.</p>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                      <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">✓ Live Status Tracking</div>
                      <p className="text-[11px] text-slate-400 leading-normal">Aapka device processing state me hai ya testing pool me, iski reporting seedhe aapke registered WhatsApp network par di jaati hai.</p>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* Stats */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Success Ratio', value: 99.2, suffix: '%', color: 'text-emerald-400', desc: 'Component-level recovery rate' },
                  { label: 'Avg. Turnaround', value: 2.5, suffix: ' hrs', color: 'text-amber-400', desc: 'For thermal upgrades' },
                  { label: 'Google Reviews', value: 1020, suffix: '+', color: 'text-cyan-400', desc: 'Verified local ratings' },
                  { label: 'Rating', value: 5.0, suffix: '★', color: 'text-purple-400', desc: 'Perfect score on Google' },
                ].map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-slate-950/60 border border-slate-900 p-5 rounded-2xl space-y-1.5 hover:border-slate-800 transition-colors">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{m.label}</span>
                    <span className={`text-4xl font-extrabold tracking-tight ${m.color}`}>
                      <AnimatedCounter target={m.value} suffix={m.suffix} />
                    </span>
                    <p className="text-xs text-slate-500">{m.desc}</p>
                  </motion.div>
                ))}
              </section>

              {/* Location widget */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-950/40 border border-slate-900 p-8 rounded-2xl items-center text-left">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400">Find Us</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white">Our Service Hub</h3>
                  <div className="flex items-start gap-3 bg-slate-950 border border-slate-900 p-4 rounded-xl">
                    <FiMapPin className="text-emerald-400 w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-white block">C.S. Compound, MG Road, Bhikhanpur</span>
                      <span className="text-slate-300 block">Bhagalpur, Bihar — 812001</span>
                      <span className="text-slate-500 italic text-[11px] block mt-1">In front of Royal Darbar Restaurant</span>
                    </div>
                  </div>
                  <a href="tel:+919472151451" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                    <FiPhone className="w-4 h-4" /> +91 94721 51451
                  </a>
                </div>

                <div className="bg-slate-950 border border-slate-900 p-6 rounded-xl space-y-4">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Distance from your location</label>
                  <select
                    value={selectedLandmark}
                    onChange={e => setSelectedLandmark(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    {Object.keys(LANDMARKS).map(lm => <option key={lm}>{lm}</option>)}
                  </select>
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Estimated Distance</span>
                      <span className="text-emerald-400 font-semibold text-sm">{LANDMARKS[selectedLandmark]}</span>
                    </div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ── SERVICES ── */}
          {activeTab === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-12">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <p className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400">What We Fix</p>
                <h2 className="text-3xl md:text-5xl font-black text-white">Specialized Repair Portfolio</h2>
                <p className="text-xs text-slate-400">Click any card to see pricing, symptoms, and book instantly.</p>
              </div>

              {/* Pricing comparison */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SERVICES.map((srv, i) => (
                  <motion.div key={srv.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl text-center space-y-1 hover:border-emerald-500/30 transition-colors">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{srv.sla}</p>
                    <p className="text-emerald-400 font-extrabold text-lg">{srv.price}</p>
                    <p className="text-xs text-slate-300 font-medium leading-tight">{srv.title.split(' ').slice(0, 3).join(' ')}</p>
                  </motion.div>
                ))}
              </div>

              {/* Accordion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SERVICES.map((srv, i) => {
                  const isOpen = expandedService === srv.id;
                  return (
                    <motion.div key={srv.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`bg-slate-950 border rounded-2xl p-6 transition-all duration-300 text-left ${isOpen ? 'border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.08)]' : 'border-slate-900 hover:border-slate-800'}`}>
                      <button className="w-full flex justify-between items-start gap-4 text-left" onClick={() => setExpandedService(isOpen ? null : srv.id)}>
                        <div className="space-y-1.5">
                          <h3 className="font-extrabold text-base text-white">{srv.title}</h3>
                          <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{srv.sla} SLA</span>
                        </div>
                        <FiChevronDown className={`text-slate-500 w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <p className="text-xs text-slate-400 mt-4 leading-relaxed">{srv.desc}</p>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                            <div className="mt-5 pt-5 border-t border-slate-900 space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Starting Price</span>
                                  <span className="text-emerald-400 font-bold text-sm">{srv.price}</span>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Common Symptoms</span>
                                  <span className="text-slate-300 text-xs leading-snug">{srv.symptoms}</span>
                                </div>
                              </div>
                              <button onClick={() => handleInjectService(srv)} className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 text-slate-400 font-bold py-2.5 rounded-xl text-xs transition-all">
                                <FiSend className="w-3.5 h-3.5" /> Book this service
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── TESTIMONIALS ── */}
          {activeTab === 'testimonials' && (
            <motion.div key="testimonials" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-12">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <p className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400">Customer Feedback</p>
                <h2 className="text-3xl md:text-5xl font-black text-white">Real Reviews from Bhagalpur</h2>
              </div>

              {/* Score panel */}
              <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                <div className="flex items-center gap-5">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-center min-w-[110px]">
                    <span className="text-4xl font-black text-white block">5.0</span>
                    <div className="text-amber-400 text-sm my-1">★★★★★</div>
                    <span className="text-[10px] text-slate-500 font-mono">1,020+ Reviews</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200 mb-1">Verified Bhagalpur Customers</h4>
                    <p className="text-xs text-slate-400 max-w-xs">Every review represents a real service experience at our MG Road workshop.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['All', 'MacBook', 'Gaming', 'Home Visit', 'Screens', 'Data Recovery'].map(cat => (
                    <button key={cat} onClick={() => setReviewFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${reviewFilter === cat ? 'bg-emerald-400 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">

                {/* Reviews list */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                    <input type="text" placeholder="Search reviews..." value={reviewSearch} onChange={e => setReviewSearch(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                  <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                    {filteredReviews.length ? filteredReviews.map(rev => (
                      <motion.div key={rev.id} layout className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-3 hover:border-slate-800 transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                              <FiUser className="w-3 h-3 text-slate-400" />
                            </div>
                            <span className="font-bold text-white text-sm">{rev.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">{rev.category}</span>
                            <span className="text-[10px] text-slate-500">{rev.date}</span>
                          </div>
                        </div>
                        <div className="text-amber-400 text-xs">{'★'.repeat(rev.rating)}</div>
                        <p className="text-xs text-slate-400 italic leading-relaxed">"{rev.review}"</p>
                      </motion.div>
                    )) : (
                      <div className="text-center py-12 text-slate-500 text-sm">No reviews match your search.</div>
                    )}
                  </div>
                </div>

                {/* Write review */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-5">
                  <div>
                    <h4 className="font-extrabold text-sm text-white mb-1">Write a Review</h4>
                    <p className="text-xs text-slate-400">Share your experience with other Bhagalpur customers.</p>
                  </div>
                  <AnimatePresence>
                    {reviewSubmitted && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-lg flex items-center gap-2">
                        <FiCheckCircle /> Review published successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">Your Name</label>
                      <input type="text" required placeholder="e.g. Rahul Mishra" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">Service Type</label>
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors">
                          {['MacBook', 'Gaming', 'Screens', 'Home Visit', 'Data Recovery'].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">Rating</label>
                        <select value={newRating} onChange={e => setNewRating(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors">
                          {[5, 4, 3].map(r => <option key={r} value={r}>{r} Stars</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">Your Review</label>
                      <textarea rows={4} required placeholder="Describe your experience..." value={newText} onChange={e => setNewText(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-400 transition-colors resize-none" />
                    </div>
                    <button type="submit" className="w-full bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-300 transition-colors">
                      Publish Review
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DIAGNOSIS DESK ── */}
          {activeTab === 'diagnosis' && (
            <motion.div key="diagnosis" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-12">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <p className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400">Get a Quote</p>
                <h2 className="text-3xl md:text-5xl font-black text-white">Instant Diagnosis Desk</h2>
                <p className="text-xs text-slate-400">Fill in your device details — we'll send a formatted quote via WhatsApp instantly.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
                <form onSubmit={handleQuoteSubmit} className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-6 md:p-8 space-y-7">

                  {/* Device */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Device Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Apple MacBook Pro/Air', 'Windows Premium Gaming System', 'Standard Professional Laptop', 'Data Storage Unit'].map(d => (
                        <button type="button" key={d} onClick={() => setSelectedDevice(d)} className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${selectedDevice === d ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-slate-900 bg-slate-900/50 text-slate-400 hover:border-slate-800 hover:text-slate-200'}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Severity */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Severity</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { level: 'Minor', active: 'bg-cyan-500/10 border-cyan-500 text-white' },
                        { level: 'Moderate', active: 'bg-amber-500/10 border-amber-500 text-white' },
                        { level: 'Critical', active: 'bg-red-500/10 border-red-500 text-white' },
                      ].map(s => (
                        <button type="button" key={s.level} onClick={() => setSeverity(s.level)} className={`py-3 rounded-xl border text-center text-xs font-bold transition-all ${severity === s.level ? s.active : 'border-slate-900 bg-slate-900/50 text-slate-400 hover:border-slate-800'}`}>
                          {s.level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Assessment Mode */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assessment Mode</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['In-Store Bench Assessment', 'Home Service Visit Request'].map(m => (
                        <button type="button" key={m} onClick={() => setServiceType(m)} className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${serviceType === m ? 'border-emerald-500 bg-emerald-500/10 text-white' : 'border-slate-900 bg-slate-900/50 text-slate-400 hover:border-slate-800 hover:text-slate-200'}`}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Describe the Issue</label>
                    <textarea rows={4} required placeholder="e.g. MacBook completely dead after water spill. Charger LED is orange but screen stays black." value={issue} onChange={e => setIssue(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-600 resize-none" />
                  </div>

                  <button type="submit" className="w-full bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2.5">
                    <FiSend className="w-3.5 h-3.5" /> Send to WhatsApp
                  </button>
                </form>

                {/* WhatsApp Preview */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-5">
                  <div className="w-24 h-5 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
                    <div className="w-10 h-1 bg-slate-800 rounded-full" />
                  </div>
                  <div className="w-full bg-[#070b13] border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-[#128C7E] px-4 py-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">F</div>
                        <div>
                          <span className="font-bold text-xs text-white block">Fast Laptop Solution</span>
                          <span className="text-[9px] text-white/60">+91 94721 51451</span>
                        </div>
                      </div>
                      <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded font-mono text-white">ONLINE</span>
                    </div>
                    <div className="p-4 min-h-[200px] space-y-3 bg-[#0a0e1a]">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 max-w-[85%] rounded-xl p-3 text-[10px] text-emerald-400">
                        Configure the form on the left — your message will appear here.
                      </div>
                      <div className="bg-slate-800/60 border border-slate-700/40 max-w-[90%] ml-auto rounded-xl p-3 font-mono text-[10px] text-slate-200 space-y-1 leading-relaxed whitespace-pre-wrap">
                        {`Hi Fast Laptop Solution, I need a repair quote.\n\n*--- DIAGNOSTIC DISPATCH ---*\n*Device:* ${selectedDevice}\n*Severity:* ${severity}\n*Assessment:* ${serviceType}\n*Issue:* ${issue || '(describe your issue above)'}`}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 text-center">Message will be sent to +91 94721 51451</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <FiCpu className="text-emerald-400 w-4 h-4" />
            <span className="font-bold text-slate-300">Fast Laptop Solution</span>
          </div>
          <p className="font-mono text-[10px] text-center">C.S. Compound, MG Road, Bhikhanpur, Bhagalpur — 812001</p>
          <p>© 2026 Fast Laptop Solution. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}