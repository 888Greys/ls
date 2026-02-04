import { useEffect, useRef } from 'react'

const SplashScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      // Set canvas resolution to match screen
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      draw()
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      // The "Point of origin" for the swoosh (near the top center)
      const startX = w * 0.48
      const startY = h * 0.15

      // Line parameters
      const lineCount = 140
      const magenta = 'rgba(230, 0, 126, 0.5)' // Transparent magenta

      ctx.lineWidth = 1.2
      ctx.strokeStyle = magenta

      for (let i = 0; i < lineCount; i++) {
        const ratio = i / lineCount

        ctx.beginPath()
        ctx.moveTo(startX, startY)

        // End coordinates (fanning out to the bottom and left)
        const endX = startX - (w * 0.9 * ratio)
        const endY = h * 1.5 // Draw beyond bottom for full coverage

        // Control point for the curve (pulls the line to the left)
        const cpX = startX - (w * 0.6 * ratio)
        const cpY = h * 0.3

        ctx.quadraticCurveTo(cpX, cpY, endX, endY)
        ctx.stroke()
      }

      // Optional: Draw a few darker inner lines for depth
      ctx.strokeStyle = 'rgba(230, 0, 126, 0.2)'
      for (let i = 0; i < 30; i++) {
        const ratio = i / 30
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.quadraticCurveTo(startX - (w * 0.1), h * 0.4, startX - (w * 0.3 * ratio), h)
        ctx.stroke()
      }
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
         style={{
           background: 'radial-gradient(circle at 70% 30%, #2d0b5a 0%, #120428 100%)'
         }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      <div className="relative z-10 text-center select-none mt-10">
        <h1 className="text-[clamp(60px,12vw,100px)] font-extrabold leading-none tracking-tighter">
          <span className="text-white">Eco</span>
          <span className="text-[#e11d2d]">Cash</span>
        </h1>
        <p className="text-white text-[clamp(18px,4vw,28px)] font-medium tracking-wider mt-1 opacity-90">
          Kadimo - Lesotho
        </p>
        <p className="text-white/70 text-[clamp(14px,3vw,18px)] font-light mt-2">
          Dumela ho Kadimo ea Potlako
        </p>
      </div>
    </div>
  )
}

export default SplashScreen
