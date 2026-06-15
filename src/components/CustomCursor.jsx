import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Disable custom cursor on touch screens to avoid layout crashes
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

    // Global Event Delegation for hover listeners
    // Eliminates the need for MutationObservers or manual event listeners on dynamic components
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      setLinkHovered(!!target)
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
      {/* Outer follow ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-blue-glow/60 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.85 : linkHovered ? 1.4 : 1,
          borderColor: linkHovered ? '#60A5FA' : '#3B82F6',
          backgroundColor: linkHovered ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.4 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-blue rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.3 : linkHovered ? 0.2 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 350, mass: 0.2 }}
      />
    </>
  )
}
