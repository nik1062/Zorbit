import React, { useState } from 'react';

export default function FastLaptopMockup() {
  const [selectedDevice, setSelectedDevice] = useState('General Laptop');
  const [issue, setIssue] = useState('');

  // WhatsApp routing handler for interactive quote form
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const message = `Hi Fast Laptop Solution, I need a repair quote.%0A*Device:* ${selectedDevice}%0A*Issue Description:* ${issue}`;
    window.open(`https://wa.me/919472151451?text=${message}`, '_blank');
  };

  return (
    <div className="bg-[#090D16] text-slate-100 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 1. FIXED PREMIUM NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090D16]/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-emerald-400">
              <span className="text-white font-bold text-sm tracking-tighter">Z</span>
            </div>
            <span className="font-black text-sm tracking-wider text-white">FAST LAPTOP <span className="text-emerald-400 font-medium">SOLUTION</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
            <a href="#reviews" className="hover:text-emerald-400 transition-colors">Testimonials</a>
            <a href="#quote" className="hover:text-emerald-400 transition-colors">Instant Quote</a>
          </div>
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-mono">
              Zorbit Active Demo
            </span>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#10B981_20%,_transparent_50%)] pointer-events-none" />
        
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 shadow-xl">
            <span className="text-amber-400 text-sm">★★★★★</span>
            <span>5.0/5.0 Trust Score (1,020+ Real Google Reviews)</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
            Bhagalpur’s No.1 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              MacBook & Laptop Specialist
            </span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
            Don't trust amateurs with your expensive hardware. Get certified component-level repair, motherboard troubleshooting, fluid damage recovery, and high-speed storage upgrades today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#quote" className="bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-center shadow-lg shadow-emerald-500/10 hover:bg-emerald-300 transition-all transform hover:-translate-y-0.5">
              Book Diagnosis Slot
            </a>
            <a href="tel:+919472151451" className="border border-slate-800 bg-slate-950/40 text-slate-300 font-semibold px-8 py-4 rounded-xl text-center hover:border-slate-700 transition-colors">
              Call Hotline: +91 94721 51451
            </a>
          </div>
        </div>

        {/* Floating Stat Terminal Display */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-slate-600 font-mono ml-2">system_diagnostics.sh</span>
          </div>
          <div className="space-y-3 font-mono text-xs text-slate-400">
            <p className="text-emerald-400">&gt; npm run fetch-reputation</p>
            <p className="text-white">Result: 1,020+ Verified Local Map Customer Nodes Found.</p>
            <p className="text-yellow-400">&gt; core_metrics --load-optimization</p>
            <p className="text-white">Platform loading footprint initialized at: <span className="text-cyan-400">0.72s</span> (Serverless React Grids).</p>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE VERTICALS */}
      <section id="services" className="py-20 bg-slate-950/40 border-y border-slate-900 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Premium Operations</h2>
            <p className="text-2xl md:text-3xl font-black text-white tracking-tight">Specialized Hardware Engineering</p>
            <p className="text-sm text-slate-400">We fix problems other repair labs declare unfixable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'MacBook Chip-Level', desc: 'Logic board level microsoldering, IC routing, and premium Apple system fault rectifications.', icon: '💻' },
              { title: 'Gaming Laptop Tuning', desc: 'GPU thermal structural repasting, component reflow repairs, and full structural stress tests.', icon: '⚡' },
              { title: 'Display & Hinges Replacement', desc: 'Original replacement matrix panels, panel components, and precise mechanical alignment repairs.', icon: '🖥️' },
              { title: 'Secure Data Recovery', desc: 'Advanced storage forensic recovery fields from crashed storage drives and solid state modules.', icon: '💾' }
            ].map((srv, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-900 p-6 rounded-xl hover:border-slate-800 transition-all group">
                <div className="text-3xl mb-4 bg-slate-900 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-800 group-hover:border-emerald-500/20 transition-colors">
                  {srv.icon}
                </div>
                <h3 className="font-bold text-base text-white normal-case tracking-normal mb-1">{srv.title}</h3>
                <p class="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REPUTATION VERIFICATION */}
      <section id="reviews" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Social Proof System</h2>
            <p className="text-2xl md:text-3xl font-black text-white tracking-tight">Unmatched 5-Star Local Reputation</p>
          </div>
          <div className="bg-slate-950 border border-slate-900 px-5 py-3 rounded-xl text-xs flex items-center gap-3">
            <span className="font-bold text-white text-base">1,020+ Users</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-medium font-mono">Verified via Google Business API</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Ravi Kumar', review: 'Best chip level service center for MacBooks in Bhagalpur. Handled my dead logic board perfectly. Extremely fast and professional handling.', rating: '★★★★★' },
            { name: 'Amit Singh', review: 'My high-end ASUS ROG laptop had severe thermal overheating issues. They cleaned, repasted, and fixed component diagnostics in single afternoon. Fully recommended.', rating: '★★★★★' },
            { name: 'Priya Sharma', review: 'Recovered vital corporate structural analytics data from fluid damaged external module. Trustworthy technicians and highly reasonable price.', rating: '★★★★★' }
          ].map((rev, idx) => (
            <div key={idx} className="bg-gradient-to-b from-slate-950/60 to-slate-950 border border-slate-900 p-6 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">{rev.name}</span>
                <span className="text-amber-400 text-xs tracking-tight">{rev.rating}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic">"{rev.review}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE LEAD CAPTURE FORM MAP */}
      <section id="quote" className="py-20 bg-gradient-to-t from-slate-950 to-transparent border-t border-slate-900 px-6">
        <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 relative">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">Instant Estimate Portal</h2>
            <p className="text-xl md:text-2xl font-bold text-white tracking-tight">Request Hardware Diagnosis Estimate</p>
            <p className="text-xs text-slate-400">Select parameters to route exact diagnostic logs direct to our technicians.</p>
          </div>

          <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Hardware Module</label>
              <select 
                value={selectedDevice} 
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs font-medium text-white focus:outline-none focus:border-emerald-400 transition-colors"
              >
                <option value="Apple MacBook Pro/Air">Apple MacBook Pro / Air</option>
                <option value="Windows Gaming System">Windows Premium Gaming System</option>
                <option value="Standard Work Laptop">Standard Professional Laptop</option>
                <option value="Data Storage Unit">Data Storage Hard Drive / SSD</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Fault Profile Description</label>
              <textarea 
                rows="3"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="e.g., Motherboard completely dead after liquid spill, screen flickering lines, storage drive showing registry read error..."
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-medium text-slate-300 focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-slate-600"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl text-sm shadow-xl hover:bg-emerald-300 transition-colors"
            >
              Dispatch Quote Request to Tech Center Matrix
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-xs text-slate-600 border-t border-slate-900/60 max-w-7xl mx-auto">
        <p>&copy; 2026 Fast Laptop Solution. Engineered via React Serverless Stack by Zorbit Studio.</p>
      </footer>

    </div>
  );
}