import { motion } from 'framer-motion'

export default function Logo({ variant = 'orbit-z', className = 'w-8 h-8', ...props }) {
  // Option 1: Row 1, Column 1 (Cyan Orbit Z)
  if (variant === 'orbit-z') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Glow Filters for Neon Cyan */}
        <defs>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circular Outer Ring (Bright Cyan) */}
        <circle cx="50" cy="50" r="36" stroke="#22D3EE" strokeWidth="4.5" opacity="0.9" filter="url(#cyanGlow)" />
        
        {/* Orbit Ellipse Ring (Bright Neon Cyan) */}
        <motion.ellipse 
          cx="50" 
          cy="50" 
          rx="44" 
          ry="15" 
          stroke="#06B6D4" 
          strokeWidth="3.5" 
          transform="rotate(-28 50 50)" 
          filter="url(#cyanGlow)"
          animate={{ rotate: [-28, 332] }}
          transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
        />

        {/* Central Bold Typographic Z (Solid White for maximum contrast) */}
        <motion.path 
          d="M34 35 H66 L34 65 H66" 
          stroke="#FFFFFF" 
          strokeWidth="8.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
    )
  }

  // Option 2: Row 1, Column 4 (Slashed Magenta Z)
  if (variant === 'slash-z') {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <filter id="magentaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Bold White Z Lettermark (High contrast white) */}
        <path 
          d="M 30 32 L 70 32 L 30 68 L 70 68" 
          stroke="#FFFFFF" 
          strokeWidth="11" 
          strokeLinecap="square" 
          strokeLinejoin="miter" 
        />

        {/* The Neon Magenta Slashed Laser Line */}
        <motion.line 
          x1="82" 
          y1="16" 
          x2="18" 
          y2="84" 
          stroke="#D946EF" 
          strokeWidth="4" 
          filter="url(#magentaGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
    )
  }

  return null
}
