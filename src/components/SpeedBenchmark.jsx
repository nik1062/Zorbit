import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { FiPlay, FiRefreshCw, FiAlertCircle, FiZap, FiCpu, FiTrendingUp } from 'react-icons/fi'

export default function SpeedBenchmark() {
  const [isRunning, setIsRunning] = useState(false)
  const [legacyProgress, setLegacyProgress] = useState(0)
  const [zorbitProgress, setZorbitProgress] = useState(0)
  const [legacyTime, setLegacyTime] = useState(0.0)
  const [zorbitTime, setZorbitTime] = useState(0.0)
  const [legacyStatus, setLegacyStatus] = useState('Idle')
  const [zorbitStatus, setZorbitStatus] = useState('Idle')

  const zorbitControls = useAnimation()
  const legacyControls = useAnimation()

  const runRace = async () => {
    if (isRunning) return
    setIsRunning(true)
    setLegacyProgress(0)
    setZorbitProgress(0)
    setLegacyTime(0.0)
    setZorbitTime(0.0)
    setLegacyStatus('Resolving DNS...')
    setZorbitStatus('Resolving DNS...')

    // Zorbit Start
    setTimeout(() => {
      setZorbitStatus('Optimizing Assets...')
      zorbitControls.start({ scale: 1.02, transition: { duration: 0.1 } })
    }, 100)

    // Legacy Start
    setTimeout(() => {
      setLegacyStatus('Loading jQuery & CMS...')
    }, 300)

    // Zorbit fast load
    let zTime = 0
    const zInterval = setInterval(() => {
      zTime += 0.05
      setZorbitTime(parseFloat(zTime.toFixed(2)))
      setZorbitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(zInterval)
          setZorbitStatus('Fully Loaded [0.35s]')
          return 100
        }
        return prev + 15
      })
    }, 50)

    // Legacy slow load
    let lTime = 0
    const lInterval = setInterval(() => {
      lTime += 0.1
      setLegacyTime(parseFloat(lTime.toFixed(2)))
      setLegacyProgress((prev) => {
        if (prev >= 100) {
          clearInterval(lInterval)
          setLegacyStatus('Loaded [5.8s]')
          setIsRunning(false)
          return 100
        }

        // Simulate layout shifts & network blocks
        if (prev === 20) {
          setLegacyStatus('Parser Blocking Script...')
        } else if (prev === 45) {
          setLegacyStatus('Loading Heavy Uncompressed JPGs (8MB)...')
        } else if (prev === 70) {
          setLegacyStatus('Rendering Bloated Style Sheets...')
        } else if (prev === 90) {
          setLegacyStatus('Running Layout Re-flows...')
        }
        
        return prev + (Math.random() > 0.5 ? 5 : 10)
      })
    }, 580)
  }

  useEffect(() => {
    // Run race on mount once
    const timeout = setTimeout(() => {
      runRace()
    }, 1200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="w-full rounded-3xl bg-brand-dark-2/40 border border-slate-800/80 p-6 md:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.02)] relative overflow-hidden">
      {/* Absolute top glowing ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_15px_#2563EB]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-glow text-[10px] font-mono uppercase tracking-widest font-semibold">
            <FiCpu className="animate-spin" style={{ animationDuration: '3s' }} /> Real-time Performance Audit
          </span>
          <h3 className="font-display font-bold text-2xl md:text-3xl mt-3 text-white">
            Latency Benchmark
          </h3>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-md">
            Click trigger below to benchmark a standard template agency platform against the Zorbit Speed Engine.
          </p>
        </div>

        <button
          onClick={runRace}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-dark-3 border border-slate-800 hover:border-brand-blue/30 hover:bg-brand-dark-4 text-white hover:text-brand-blue-glow text-xs font-mono font-bold tracking-wide transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer self-start md:self-center shrink-0"
        >
          {isRunning ? (
            <>
              <FiRefreshCw className="animate-spin" /> Benchmarking...
            </>
          ) : (
            <>
              <FiPlay className="fill-current" /> Trigger Audit Race
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Legacy Browser Simulator */}
        <div className="rounded-2xl border border-slate-900 bg-[#07090F] overflow-hidden flex flex-col h-[230px] relative">
          <div className="bg-[#05060A] px-4 py-2.5 border-b border-slate-900 flex items-center justify-between text-[10px] font-mono text-white/30">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/10" />
              <span className="w-2 h-2 rounded-full bg-white/10" />
              <span className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            <span className="truncate max-w-[150px]">slow-template-agency.com</span>
            <span className="text-red-500/50 flex items-center gap-1">
              <FiAlertCircle size={10} /> Poor SLA
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between relative">
            {/* Visual simulation screen */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                <span className="uppercase font-bold tracking-wider">Status Payload</span>
                <span>{legacyTime}s</span>
              </div>
              <p className="text-white/60 font-mono text-[10px] leading-relaxed max-w-xs truncate">
                &gt; {legacyStatus}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-red-400 font-mono">
                <span>Lighthouse Score: 22/100</span>
                <span>{legacyProgress}%</span>
              </div>
              <div className="h-2 w-full bg-red-950/20 border border-red-900/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${legacyProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Zorbit Engine Simulator */}
        <motion.div 
          animate={zorbitControls}
          className="rounded-2xl border border-brand-blue/20 bg-[#080C16] overflow-hidden flex flex-col h-[230px] relative glow-blue"
        >
          {/* Top subtle highlight grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

          <div className="bg-[#05070B] px-4 py-2.5 border-b border-brand-blue/10 flex items-center justify-between text-[10px] font-mono text-white/30 relative z-10">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-blue/30" />
              <span className="w-2 h-2 rounded-full bg-brand-blue/30" />
              <span className="w-2 h-2 rounded-full bg-brand-blue/30" />
            </div>
            <span className="truncate max-w-[150px] text-brand-blue-glow font-bold">zorbit.studio</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
              <FiZap size={10} className="animate-pulse" /> Sub-1s SLA
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
            {/* Visual simulation screen */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-brand-blue-glow/85">
                <span className="uppercase font-bold tracking-wider">Active Pipeline Core</span>
                <span>{zorbitTime}s</span>
              </div>
              <p className="text-slate-300 font-mono text-[10px] leading-relaxed max-w-xs">
                &gt; {zorbitStatus}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-emerald-400 font-mono">
                <span className="flex items-center gap-1">Lighthouse Score: 100/100 <FiTrendingUp size={12} /></span>
                <span>{zorbitProgress}%</span>
              </div>
              <div className="h-2 w-full bg-emerald-950/20 border border-emerald-900/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all duration-75"
                  style={{ width: `${zorbitProgress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
