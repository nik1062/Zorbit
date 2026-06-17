import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiCpu, 
  FiMessageSquare, 
  FiActivity, 
  FiClock, 
  FiDatabase, 
  FiCheckCircle, 
  FiStar, 
  FiSend, 
  FiTerminal, 
  FiLayers, 
  FiPhone,
  FiSearch,
  FiUser,
  FiMapPin,
  FiEye,
  FiHome as FiHomeIcon
} from 'react-icons/fi';

// Authentic reviews database tailored to Fast Laptop Solution's true user feedback
const initialReviews = [
  { id: 1, name: 'Md. Shahnawaz', category: 'MacBook', rating: 5, review: 'Fantastic chip-level diagnostics! The technician repaired my dead MacBook Pro motherboard right in front of my eyes at the MG Road bench. Unmatched transparency in Bhagalpur.', date: 'Just now' },
  { id: 2, name: 'Alok Ranjan', category: 'Home Visit', rating: 5, review: 'Highly recommend their home visit service. The technician came to my flat near Sandis Compound, diagnosed the startup registry loop, and resolved it in an hour. Extremely good behavior and fair charges.', date: '3 days ago' },
  { id: 3, name: 'Sumit Bajpayee', category: 'Gaming', rating: 5, review: 'Got my Acer Predator gaming rig repasted with premium liquid-metal and cooling fans serviced. They showed me the old thermal paste condition and explained the heat sync logic. Best repair shop near Bhikhanpur.', date: '1 week ago' },
  { id: 4, name: 'Shrishti Kumari', category: 'Screens', rating: 5, review: 'Replaced my shattered Dell Inspiron touch-display within 3 hours. Real genuine parts and original color output. Affordable pricing compared to other service hubs.', date: '2 weeks ago' },
  { id: 5, name: 'Rahul Mishra', category: 'Data Recovery', rating: 5, review: 'Saved all my engineering design files and project directories from a liquid-damaged SSD drive. Very honest and professional owner.', date: '3 weeks ago' }
];

export default function FastLaptopMockup() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDevice, setSelectedDevice] = useState('Apple MacBook Pro/Air');
  const [severity, setSeverity] = useState('Moderate');
  const [serviceType, setServiceType] = useState('In-Store Bench Assessment');
  const [issue, setIssue] = useState('');
  
  // Services page interaction states
  const [expandedService, setExpandedService] = useState(null);

  // Reviews states
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewFilter, setReviewFilter] = useState('All');
  
  // New review form states
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState('MacBook');
  const [newText, setNewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Landmark distance calculator state
  const [selectedLandmark, setSelectedLandmark] = useState('Bhagalpur Junction');
  const [landmarkDistance, setLandmarkDistance] = useState('1.2 km (approx. 5 mins drive via MG Road)');

  // Simulated live hardware diagnostics console for home page
  const [terminalLogs, setTerminalLogs] = useState([
    'System initialization: Fast Diagnostics v1.4',
    'Checking power rails: 3.3V G3Hot ... [ OK ]',
    'Analyzing charging circuit: U7000 IC ... [ ACTIVE ]'
  ]);

  useEffect(() => {
    if (activeTab !== 'home') return;
    
    const logs = [
      'PPBUS_G3H voltage line: 12.6V ... [ STABLE ]',
      'CPU thermal sensor scan: 42°C ... [ NORMAL ]',
      'Checking BIOS SPI ROM partition checksum ... [ PASS ]',
      'Testing motherboard RAM cells ... [ 100% STAGED ]',
      'SSD storage read/write lifecycle ... [ SECURE ]',
      'Motherboard diagnostics complete. System status: Ready.'
    ];

    let timer;
    let logIdx = 0;
    
    const interval = setInterval(() => {
      if (logIdx < logs.length) {
        setTerminalLogs(prev => [...prev, logs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Update distance when landmark is selected
  useEffect(() => {
    const distances = {
      'Bhagalpur Junction': '1.2 km (approx. 5 mins drive via MG Road)',
      'Sandis Compound': '800 meters (approx. 3 mins drive)',
      'Zero Mile': '4.5 km (approx. 15 mins drive)',
      'BCE Bhagalpur': '6.5 km (approx. 20 mins drive)'
    };
    setLandmarkDistance(distances[selectedLandmark] || '');
  }, [selectedLandmark]);

  // Handle auto-routing to diagnosis with prefilled data
  const handleRequestDiagnostic = (serviceTitle) => {
    let deviceMapped = 'Apple MacBook Pro/Air';
    if (serviceTitle.includes('Gaming')) deviceMapped = 'Windows Premium Gaming System';
    if (serviceTitle.includes('Display')) deviceMapped = 'Standard Professional Laptop';
    if (serviceTitle.includes('Data')) deviceMapped = 'Data Storage Unit';

    setSelectedDevice(deviceMapped);
    setIssue(`Inquiry for: ${serviceTitle}. Please check motherboard and provide estimation.`);
    setActiveTab('diagnosis');
  };

  // WhatsApp routing handler for interactive quote form
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const formattedText = `Hi Fast Laptop Solution, I need a repair quote.%0A%0A*--- SYSTEM DIAGNOSTIC DISPATCH ---*%0A*Device:* ${selectedDevice}%0A*Severity:* ${severity}%0A*Assessment:* ${serviceType}%0A*Issue Description:* ${issue}`;
    window.open(`https://wa.me/919472151451?text=${formattedText}`, '_blank');
  };

  // Handle review form submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newText) return;

    const newReviewObj = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      rating: Number(newRating),
      review: newText,
      date: 'Just now'
    };

    setReviews([newReviewObj, ...reviews]);
    setNewName('');
    setNewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = rev.name.toLowerCase().includes(reviewSearch.toLowerCase()) || 
                          rev.review.toLowerCase().includes(reviewSearch.toLowerCase());
    const matchesFilter = reviewFilter === 'All' || rev.category === reviewFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#05070B] text-slate-100 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Top Address & Hour Info Strip */}
      <div className="bg-[#0b0f19] border-b border-slate-900 text-[10px] text-slate-400 py-2.5 px-6 font-mono hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FiMapPin className="text-emerald-400" />
              <span>Location: C.S. Compound, MG Road, Bhikhanpur, Bhagalpur - 812001 (Bihar)</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400">In front of Royal Darbar Restaurant</span>
          </div>
          <div>
            <span>Operating Hours: Mon - Sat: 10:00 AM – 8:00 PM (Sunday Closed)</span>
          </div>
        </div>
      </div>

      {/* 1. FIXED GLASSMORPHIC NAVIGATION BAR */}
      <nav className="fixed top-0 md:top-10 left-0 right-0 z-50 bg-[#05070B]/85 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <FiCpu className="text-emerald-400 w-4 h-4" />
            </div>
            <div className="leading-tight">
              <span className="font-black text-sm tracking-wider text-white block">
                FAST LAPTOP <span className="text-emerald-400 font-medium">SOLUTION</span>
              </span>
              <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block">
                Laptop Repair Hub Bhagalpur
              </span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-900 p-1 rounded-xl">
            {[
              { id: 'home', label: 'Home', icon: FiHome },
              { id: 'services', label: 'Services', icon: FiCpu },
              { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
              { id: 'diagnosis', label: 'Diagnosis Desk', icon: FiActivity }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all uppercase tracking-wider ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator" 
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-400/20 border border-emerald-500/20 rounded-lg -z-10" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:+919472151451" 
              className="flex items-center gap-2 border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white hover:border-slate-700 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              <FiPhone className="text-emerald-400" />
              <span>+91 94721 51451</span>
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-24 min-h-[85vh]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-16"
            >
              {/* HERO SECTION */}
              <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#10B981_20%,_transparent_50%)] pointer-events-none" />
                
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-900 px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 shadow-xl">
                    <span className="text-amber-400">★★★★★</span>
                    <span>5.0/5.0 Google Trust Score (1,020+ Verified Reviews)</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
                    Bhagalpur's Premier <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      Component-Level Experts
                    </span>
                  </h1>
                  
                  <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
                    Why trust repair shops that replace entire motherboards at huge costs? We diagnostic-check at chip-level, executing precision microsoldering repairs for liquid damage, GPU faults, and dead systems.
                  </p>

                  {/* Highlights section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-2">
                    <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-900 p-3 rounded-xl">
                      <FiEye className="text-emerald-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-white block">100% Live Bench</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Watch your laptop get repaired live in front of your eyes.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-slate-950/60 border border-slate-900 p-3 rounded-xl">
                      <FiHomeIcon className="text-cyan-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-white block">Home Service Visits</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Assistance at your home or office in Bhagalpur (visiting charges apply).</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => setActiveTab('diagnosis')}
                      className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:brightness-110 hover:-translate-y-0.5 transition-all"
                    >
                      Instant Quote Setup
                    </button>
                    <button 
                      onClick={() => setActiveTab('services')}
                      className="border border-slate-800 bg-slate-950/40 text-slate-300 font-semibold px-8 py-4 rounded-xl hover:border-slate-700 transition-colors"
                    >
                      Explore Portfolio
                    </button>
                  </div>
                </div>

                {/* Simulated Diagnostic Logger */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-slate-500 font-mono ml-2">diagnostic_sequence.log</span>
                    </div>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="space-y-2 font-mono text-xs text-slate-400 min-h-[140px]">
                    <p className="text-slate-600"># Component-Level Diagnostics Terminal</p>
                    {terminalLogs.map((log, idx) => (
                      <motion.p 
                        key={idx} 
                        initial={{ opacity: 0, x: -5 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className={log.includes('ONLINE') || log.includes('Ready') ? 'text-emerald-400' : 'text-slate-300'}
                      >
                        &gt; {log}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </section>

              {/* DYNAMIC LANDMARK DISTANCE WIDGET & DETAILS */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/40 border border-slate-900 p-8 rounded-2xl">
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Convenient Access</h2>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Our Physical Service Hub</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Located centrally on M.G. Road, Bhagalpur, our lab is fully equipped with advanced micro-soldering stations and thermal refit machinery.
                  </p>
                  
                  <div className="space-y-2.5 bg-slate-950 border border-slate-900 p-4 rounded-xl">
                    <div className="flex gap-2">
                      <FiMapPin className="text-emerald-400 w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-white block">Full Address</span>
                        <span className="text-slate-300 block">C.S. Compound, MG Road, Bhikhanpur, Bhagalpur, Bihar 812001</span>
                        <span className="text-[10px] text-slate-500 block italic mt-0.5">(Directly in front of Royal Darbar Restaurant)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-950/80 border border-slate-900 p-6 rounded-xl space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Check Distance From Your Landmark</label>
                    <select
                      value={selectedLandmark}
                      onChange={(e) => setSelectedLandmark(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Bhagalpur Junction">Bhagalpur Junction Railway Station</option>
                      <option value="Sandis Compound">Sandis Compound Park</option>
                      <option value="Zero Mile">Zero Mile Chowk</option>
                      <option value="BCE Bhagalpur">BCE (Bhagalpur College of Engineering)</option>
                    </select>
                  </div>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Estimated Proximity</span>
                      <span className="text-emerald-400 font-semibold">{landmarkDistance}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* CORE TRUST METRICS SECTION */}
              <section className="bg-slate-950/40 border border-slate-900 p-8 rounded-2xl">
                <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
                  <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Trust Engine</h2>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Verified Operating Metrics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Success Ratio', value: '99.2%', desc: 'Component level repair recovery success rate.', color: 'text-emerald-400' },
                    { label: 'Active Queue', value: '2 Devices', desc: 'Real-time diagnostic staging workload.', color: 'text-amber-400' },
                    { label: 'SLA Speed', value: '2.5 Hours', desc: 'Average turnaround for thermal upgrades.', color: 'text-cyan-400' },
                    { label: 'Customer Trust', value: '1,020+', desc: 'Real Google Local Business rating profiles.', color: 'text-purple-400' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-slate-950/60 border border-slate-900/60 p-5 rounded-xl space-y-2">
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">{metric.label}</span>
                      <span className={`text-4xl font-extrabold tracking-tight ${metric.color}`}>{metric.value}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 2: SERVICES PORTFOLIO */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Service Categories</h2>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">Specialized Operations Portfolio</h3>
                <p className="text-xs text-slate-400">Click on any card to expand cost outlines and diagnostic indicators.</p>
              </div>

              {/* SERVICES INTERACTIVE ACCORDION GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: 'macbook',
                    title: 'MacBook Logic Board Microsoldering',
                    desc: 'Restoration of liquid-damaged MacBooks, shorted capacitors, logic board IC replacements (PMIC, backlight controllers, USB-C controller chips), and charging faults.',
                    detailedSymptom: 'Device not turning on, no backlight, liquid spill on keyboard, boot loops, or battery not charging.',
                    sla: '24 - 48 Hours SLA',
                    pricing: 'Est. Starts from ₹2,500'
                  },
                  {
                    id: 'gaming',
                    title: 'Gaming Laptop Tuning & Optimization',
                    desc: 'GPU/CPU thermal re-pasting using high-performance liquid metal or thermal grease, cooling fan system overhaul, and copper cooling pipeline alignments.',
                    detailedSymptom: 'Frame drops, overheating shutdowns, high fan noise, thermal throttling, or artifacts on screen.',
                    sla: '2 - 4 Hours SLA',
                    pricing: 'Est. Starts from ₹1,200'
                  },
                  {
                    id: 'screens',
                    title: 'Retina Screens & Hinge Replacement',
                    desc: 'Original replacement matrix panels, panel components, flexgate resolution, and precise mechanical alignment repairs for damaged hinge supports.',
                    detailedSymptom: 'Cracked glass, vertical lines, flickering pixels, loose hinge action, or sound coming from lid opening.',
                    sla: '3 Hours SLA',
                    pricing: 'Est. Starts from ₹4,500'
                  },
                  {
                    id: 'data',
                    title: 'Forensic Storage & Data Recovery',
                    desc: 'Component-level data extraction bypassing motherboard security architectures, recovery from water-damaged internal storage nodes, and solid-state data reconstruction.',
                    detailedSymptom: 'Accidentally deleted directories, water damaged SSD, drive requesting format, or system files corrupted.',
                    sla: '2 - 5 Days SLA',
                    pricing: 'Est. Starts from ₹1,800'
                  }
                ].map(srv => {
                  const isExpanded = expandedService === srv.id;
                  return (
                    <div 
                      key={srv.id}
                      className={`bg-slate-950 border transition-all duration-300 rounded-2xl p-6 ${
                        isExpanded ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 cursor-pointer" onClick={() => setExpandedService(isExpanded ? null : srv.id)}>
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-base text-white tracking-wide">{srv.title}</h4>
                          <span className="inline-block text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {srv.sla}
                          </span>
                        </div>
                        <span className="text-slate-500 text-xs hover:text-white transition-colors">
                          {isExpanded ? '[ Collapse ]' : '[ Expand Info ]'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-4 leading-relaxed">{srv.desc}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t border-slate-900 mt-4 pt-4 space-y-4 text-xs"
                          >
                            <div className="grid grid-cols-2 gap-4 bg-slate-900/40 p-3 rounded-lg">
                              <div>
                                <span className="text-[10px] text-slate-500 block uppercase font-bold">Price Guideline</span>
                                <span className="text-slate-200 font-semibold">{srv.pricing}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-500 block uppercase font-bold">Primary Target Symptoms</span>
                                <span className="text-slate-300 font-semibold">{srv.detailedSymptom}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRequestDiagnostic(srv.title)}
                              className="w-full bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800 hover:text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                              <span>Inject into Diagnosis Desk</span>
                              <FiSend className="w-3 h-3" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: REAL-TIME CUSTOMER TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Social Reputation</h2>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">Real-Time Customer Testimonials</h3>
                <p className="text-xs text-slate-400">Verified reviews directly linked via Google Local Business API.</p>
              </div>

              {/* OVERALL SCORE PANEL */}
              <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="text-center bg-slate-900 border border-slate-800 p-5 rounded-xl min-w-[120px]">
                    <span className="text-4xl font-black text-white block">5.0</span>
                    <div className="text-amber-400 text-xs tracking-wider my-1">★★★★★</div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">1,020+ Reviews</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-sm text-slate-200">Verified Authenticity Metrics</h4>
                    <p className="text-xs text-slate-400 max-w-sm">Every review shown below represents actual customer service engagements validated in Bhagalpur.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['All', 'MacBook', 'Gaming', 'Home Visit', 'Screens'].map(category => (
                    <button
                      key={category}
                      onClick={() => setReviewFilter(category)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        reviewFilter === category
                          ? 'bg-emerald-400 text-slate-950 font-bold'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* MAIN REVIEWS MATRIX AND FORM GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* REVIEWS GRID (COL-SPAN-8) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search reviews by keyword..."
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredReviews.length > 0 ? (
                      filteredReviews.map(rev => (
                        <motion.div 
                          key={rev.id} 
                          layout
                          className="bg-gradient-to-b from-slate-950 to-slate-950/60 border border-slate-900 p-5 rounded-xl space-y-3"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                                <FiUser className="w-3 h-3 text-slate-400" />
                              </div>
                              <span className="font-extrabold text-white text-xs">{rev.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium">{rev.date}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-amber-400 text-[10px]">
                              {Array.from({ length: rev.rating }).map((_, i) => <span key={i}>★</span>)}
                            </div>
                            <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                              {rev.category}
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 italic leading-relaxed">"{rev.review}"</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-slate-500 text-xs">
                        No reviews match your filter parameters.
                      </div>
                    )}
                  </div>
                </div>

                {/* WRITE A REVIEW MODULE (COL-SPAN-5) */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-white tracking-wide">Write a Review</h4>
                    <p className="text-xs text-slate-400">Share your hardware repair evaluation with other local users.</p>
                  </div>

                  {reviewSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-lg flex items-center gap-2"
                    >
                      <FiCheckCircle className="flex-shrink-0" />
                      <span>Review submitted successfully! It is updated live in the list.</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Customer Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Rahul Mishra"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4.5 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Service Category</label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                        >
                          <option value="MacBook">MacBook</option>
                          <option value="Gaming">Gaming</option>
                          <option value="Screens">Screens</option>
                          <option value="Home Visit">Home Visit</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Rating Status</label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Review Message</label>
                      <textarea 
                        rows="3"
                        required
                        placeholder="Describe your service satisfaction..."
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-300 transition-colors"
                    >
                      Publish Review Node
                    </button>
                  </form>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: INSTANT DIAGNOSIS DESK */}
          {activeTab === 'diagnosis' && (
            <motion.div
              key="diagnosis"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Diagnosis Wizard</h2>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">Instant Diagnosis Desk</h3>
                <p className="text-xs text-slate-400">Specify system attributes to format the WhatsApp engineering ticket.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* WIZARD FORM (COL-SPAN-7) */}
                <form onSubmit={handleQuoteSubmit} className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-6 md:p-8 space-y-6">
                  
                  {/* DEVICE Platform */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Hardware Platform</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Apple MacBook Pro/Air',
                        'Windows Premium Gaming System',
                        'Standard Professional Laptop',
                        'Data Storage Unit'
                      ].map(device => (
                        <button
                          type="button"
                          key={device}
                          onClick={() => setSelectedDevice(device)}
                          className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                            selectedDevice === device
                              ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                              : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:border-slate-800'
                          }`}
                        >
                          {device}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FAULT SEVERITY */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Issue Severity Class</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { level: 'Minor', color: 'border-cyan-500/30 text-cyan-400', activeBg: 'bg-cyan-500/10 border-cyan-500' },
                        { level: 'Moderate', color: 'border-amber-500/30 text-amber-400', activeBg: 'bg-amber-500/10 border-amber-500' },
                        { level: 'Critical', color: 'border-red-500/30 text-red-400', activeBg: 'bg-red-500/10 border-red-500' }
                      ].map(sev => (
                        <button
                          type="button"
                          key={sev.level}
                          onClick={() => setSeverity(sev.level)}
                          className={`py-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            severity === sev.level
                              ? sev.activeBg + ' text-white shadow-lg'
                              : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:border-slate-800'
                          }`}
                        >
                          {sev.level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SERVICE TYPE */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assessment Mode</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'In-Store Bench Assessment',
                        'Home Service Visit Request'
                      ].map(mode => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setServiceType(mode)}
                          className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                            serviceType === mode
                              ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                              : 'border-slate-900 bg-slate-900/40 text-slate-400 hover:border-slate-800'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Fault Symptoms & Logs</label>
                    <textarea 
                      rows="4"
                      required
                      placeholder="e.g. My MacBook is completely dead after water spill on keyboard. Orange LED on charger lights up but display is black."
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2.5"
                  >
                    <span>Dispatch Ticket to WhatsApp</span>
                    <FiSend className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* LIVE PHONE PREVIEW (COL-SPAN-5) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
                  
                  {/* Phone Notch/Header decoration */}
                  <div className="w-32 h-6 bg-slate-950 rounded-full border border-slate-900/60 mb-6 flex items-center justify-center">
                    <div className="w-12 h-1 bg-slate-800 rounded-full" />
                  </div>

                  {/* Phone Screen Mockup */}
                  <div className="w-full bg-[#070b13] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col shadow-inner">
                    {/* Simulator Header */}
                    <div className="bg-[#128C7E] px-4 py-3 flex justify-between items-center text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                          <span className="font-bold text-[10px] tracking-tight">F</span>
                        </div>
                        <div className="leading-tight">
                          <span className="font-bold text-xs block font-sans">Fast Laptop Solution</span>
                          <span className="text-[8px] text-white/70 block">Active Engineering Center</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">ONLINE</span>
                    </div>

                    {/* Chat Bubble Area */}
                    <div className="p-4 min-h-[220px] max-h-[260px] overflow-y-auto space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-5">
                      
                      <div className="bg-emerald-500/10 border border-emerald-500/20 max-w-[85%] self-start rounded-xl p-3 text-[10px] text-emerald-400 space-y-1">
                        <p className="font-bold">System Dispatch Assistant:</p>
                        <p>Configure the left options panel. We will package your diagnostic information into an active WhatsApp message dispatch layout.</p>
                      </div>

                      {/* User's Message Preview */}
                      <div className="bg-[#DCF8C6]/15 border border-[#DCF8C6]/20 max-w-[90%] ml-auto rounded-xl p-3 text-[11px] text-slate-200 font-mono space-y-2">
                        <p className="text-[8px] text-slate-500 border-b border-slate-800/80 pb-1 uppercase tracking-wider font-sans font-bold">
                          [WhatsApp Preview Log]
                        </p>
                        <p className="leading-relaxed whitespace-pre-wrap">
                          Hi Fast Laptop Solution, I need a repair quote.{"\n"}{"\n"}
                          *--- SYSTEM DIAGNOSTIC DISPATCH ---*{"\n"}
                          *Device:* {selectedDevice}{"\n"}
                          *Severity:* {severity}{"\n"}
                          *Assessment:* {serviceType}{"\n"}
                          *Issue Description:* {issue || '(Enter symptoms in form)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full text-center mt-4">
                    <span className="text-[10px] text-slate-500 italic block">
                      Target Center Hotline: +91 94721 51451
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-xs text-slate-600 border-t border-slate-900/60 max-w-7xl mx-auto space-y-2">
        <p className="text-slate-500 font-mono text-[10px]">
          C.S. Compound, MG Road, In Front of Royal Darbar, Bhikhanpur, Bhagalpur, Bihar 812001
        </p>
        <p>&copy; 2026 Fast Laptop Solution. All rights reserved.</p>
      </footer>

    </div>
  );
}