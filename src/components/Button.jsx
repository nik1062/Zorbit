import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl transition-all duration-300 px-6 py-3 cursor-pointer"
  
  const variants = {
    primary: "bg-brand-blue hover:bg-brand-blue-light text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-brand-blue-light/20",
    secondary: "bg-brand-dark-3 hover:bg-brand-dark-4 text-white border border-white/5 hover:border-white/10",
    outline: "bg-transparent border border-white/10 hover:border-brand-blue text-white hover:text-brand-blue-light hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]",
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
