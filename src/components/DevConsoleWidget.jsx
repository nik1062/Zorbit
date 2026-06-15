import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiTerminal, FiChevronRight, FiCpu } from 'react-icons/fi'

export default function DevConsoleWidget() {
  const [logs, setLogs] = useState([
    { text: 'SYSTEM BOOT SUCCESSFUL [PORT 8080]', type: 'system' },
    { text: 'Initialising node handshake...', type: 'system' },
    { text: 'Type a command or execute scripts below.', type: 'info' }
  ])
  const [typing, setTyping] = useState(false)
  const terminalEndRef = useRef(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const writeLogs = async (lines) => {
    setTyping(true)
    for (let line of lines) {
      await new Promise((resolve) => setTimeout(resolve, 350))
      setLogs((prev) => [...prev, line])
    }
    setTyping(false)
  }

  const handleRunScript = (script) => {
    if (typing) return
    
    setLogs((prev) => [
      ...prev,
      { text: `./${script}.sh`, type: 'command' }
    ])

    if (script === 'about_studio') {
      writeLogs([
        { text: 'Loading Zorbit metadata...', type: 'system' },
        { text: '{', type: 'json' },
        { text: '  "agency": "Zorbit Creative Studio",', type: 'json' },
        { text: '  "motto": "Velocity meets High Engineering Standards",', type: 'json' },
        { text: '  "location": "Chennai, Tamil Nadu, India",', type: 'json' },
        { text: '  "status": "Available Q2 2026"', type: 'json' },
        { text: '}', type: 'json' }
      ])
    } else if (script === 'check_capabilities') {
      writeLogs([
        { text: 'Checking node modules...', type: 'system' },
        { text: '✔ Full-Stack Web Engineering -- [LOADED]', type: 'success' },
        { text: '✔ UI/UX Design Token Systems -- [LOADED]', type: 'success' },
        { text: '✔ Custom POS & Offline-First Apps -- [LOADED]', type: 'success' },
        { text: '✔ GIS Mapping Leaflet Engine -- [LOADED]', type: 'success' }
      ])
    } else if (script === 'ping_network') {
      const ping = Math.floor(Math.random() * 12) + 4
      writeLogs([
        { text: `PING zorbit.studio (104.244.42.1) 56(84) bytes of data.`, type: 'system' },
        { text: `64 bytes from 104.244.42.1: icmp_seq=1 ttl=56 time=${ping} ms`, type: 'success' },
        { text: `64 bytes from 104.244.42.1: icmp_seq=2 ttl=56 time=${ping - 1} ms`, type: 'success' },
        { text: '--- zorbit.studio ping statistics ---', type: 'info' },
        { text: '2 packets transmitted, 2 received, 0% packet loss, time 1002ms', type: 'info' }
      ])
    }
  }

  return (
    <div className="w-full max-w-lg rounded-2xl bg-[#090C15]/80 border border-slate-800 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col font-mono text-xs">
      {/* Top Header */}
      <div className="bg-[#05070B] px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white/40">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/30" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/30" />
          <span className="w-3 h-3 rounded-full bg-green-500/30" />
        </div>
        <div className="flex items-center gap-1">
          <FiTerminal size={12} className="text-brand-blue-glow" />
          <span className="text-[10px] tracking-wider uppercase font-semibold text-white/60">Terminal Session</span>
        </div>
        <FiCpu size={12} className="text-white/20" />
      </div>

      {/* Terminal Screen */}
      <div className="p-5 h-[230px] overflow-y-auto flex flex-col gap-2 bg-[#090C15]/40">
        {logs.map((log, i) => {
          let style = 'text-white/60'
          let prefix = ''

          if (log.type === 'system') {
            style = 'text-brand-blue-glow/80'
            prefix = '[sys] '
          } else if (log.type === 'command') {
            style = 'text-white font-bold flex items-center gap-1'
            prefix = 'zorbit@sprint:~$ '
          } else if (log.type === 'success') {
            style = 'text-emerald-400'
          } else if (log.type === 'json') {
            style = 'text-cyan-300/90 whitespace-pre'
          } else if (log.type === 'info') {
            style = 'text-white/30'
          }

          return (
            <div key={i} className={style}>
              {log.type === 'command' && <FiChevronRight className="text-brand-blue inline" size={11} />}
              {prefix}
              {log.text}
            </div>
          )
        })}
        {typing && (
          <div className="text-white/40 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-brand-blue animate-pulse" />
            <span>Node executing instructions...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Script Selection Actions */}
      <div className="p-4 bg-[#05070B]/50 border-t border-slate-800 flex flex-wrap gap-2 justify-center">
        {[
          { script: 'about_studio', label: './about_studio.sh' },
          { script: 'check_capabilities', label: './check_capabilities.sh' },
          { script: 'ping_network', label: './ping_network.sh' }
        ].map((btn) => (
          <button
            key={btn.script}
            disabled={typing}
            onClick={() => handleRunScript(btn.script)}
            className="px-3 py-1.5 rounded-lg bg-brand-dark-3 border border-slate-800 hover:border-brand-blue/30 text-white/50 hover:text-brand-blue-glow font-mono text-[10px] tracking-wide transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
