import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hoveredRect, setHoveredRect] = useState(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Disable custom cursor on mobile touch screens to prevent layout issues
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    // Awwwards-style magnetic bounding box snap calculations
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')
      if (target) {
        setLinkHovered(true)
        const rect = target.getBoundingClientRect()
        setHoveredRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
          // Get the border radius of the target element dynamically to match its shape
          borderRadius: window.getComputedStyle(target).borderRadius || '12px'
        })
      } else {
        setLinkHovered(false)
        setHoveredRect(null)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* 1. Behind-the-page mouse radial glow light to make user move interactive */}
      <div 
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 mix-blend-screen opacity-50 pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: linkHovered 
            ? 'radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(139,92,246,0.06) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.02) 60%, transparent 100%)',
          transform: `translate(-50%, -50%) scale(${linkHovered ? 1.35 : 1})`,
          transition: 'transform 0.15s ease-out, background 0.15s ease-out'
        }}
      />

      {/* 2. Outer follow ring (Morphs into a custom snap box enclosing buttons/links) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        animate={hoveredRect ? {
          x: hoveredRect.x - (hoveredRect.width + 14) / 2,
          y: hoveredRect.y - (hoveredRect.height + 14) / 2,
          width: hoveredRect.width + 14,
          height: hoveredRect.height + 14,
          borderRadius: hoveredRect.borderRadius,
          border: '1.5px solid rgba(96, 165, 250, 0.95)',
          backgroundColor: 'rgba(59, 130, 246, 0.12)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.35)'
        } : {
          x: position.x - 16,
          y: position.y - 16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          boxShadow: 'none'
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 240, mass: 0.35 }}
      />

      {/* 3. Inner core dot (Shrinks/fades out inside the snapped highlight button) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-blue rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#3B82F6,0_0_20px_#2563EB]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.4 : linkHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 380, mass: 0.1 }}
      />
    </>
  )
}
