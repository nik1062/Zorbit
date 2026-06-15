import { useEffect, useRef } from 'react'

export default function InteractiveGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId



    // Mouse coordinates tracker
    const mouse = { x: null, y: null, radius: 160 }
    let animationActive = false

    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width / cellSize)
      const rows = Math.ceil(canvas.height / cellSize)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)'
      ctx.lineWidth = 0.5

      for (let c = 0; c <= cols; c++) {
        ctx.beginPath()
        ctx.moveTo(c * cellSize, 0)
        ctx.lineTo(c * cellSize, canvas.height)
        ctx.stroke()
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath()
        ctx.moveTo(0, r * cellSize)
        ctx.lineTo(canvas.width, r * cellSize)
        ctx.stroke()
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (!animationActive) {
        animationActive = true
        animate()
      }
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const parent = canvas.parentElement
    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseleave', handleMouseLeave)

    const cellSize = 50 // Grid size in pixels

    // Render loop
    const animate = () => {
      if (mouse.x === null || mouse.y === null) {
        drawStaticGrid()
        animationActive = false
        cancelAnimationFrame(animationFrameId)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw grid cells and check hover lighting
      const cols = Math.ceil(canvas.width / cellSize)
      const rows = Math.ceil(canvas.height / cellSize)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)'
      ctx.lineWidth = 0.5

      // Draw grid lines
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath()
        ctx.moveTo(c * cellSize, 0)
        ctx.lineTo(c * cellSize, canvas.height)
        ctx.stroke()
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath()
        ctx.moveTo(0, r * cellSize)
        ctx.lineTo(canvas.width, r * cellSize)
        ctx.stroke()
      }

      // Draw radial glow on mouse hover
      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius
      )
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)')
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
      ctx.fill()

      // Highlight cells nearest to mouse
      ctx.fillStyle = 'rgba(96, 165, 250, 0.05)'
      const startCol = Math.max(0, Math.floor((mouse.x - mouse.radius) / cellSize))
      const endCol = Math.min(cols, Math.ceil((mouse.x + mouse.radius) / cellSize))
      const startRow = Math.max(0, Math.floor((mouse.y - mouse.radius) / cellSize))
      const endRow = Math.min(rows, Math.ceil((mouse.y + mouse.radius) / cellSize))

      for (let col = startCol; col < endCol; col++) {
        for (let row = startRow; row < endRow; row++) {
          const cellCenterX = col * cellSize + cellSize / 2
          const cellCenterY = row * cellSize + cellSize / 2
          const dist = Math.hypot(mouse.x - cellCenterX, mouse.y - cellCenterY)
          
          if (dist < mouse.radius) {
            const opacity = (mouse.radius - dist) / mouse.radius * 0.08
            ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
            ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2)
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initial draw
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawStaticGrid()
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  )
}
