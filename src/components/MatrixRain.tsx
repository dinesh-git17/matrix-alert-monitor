// src/components/MatrixRain.tsx

'use client'

import { useEffect, useRef } from 'react'

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const fontSize = 18
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)
    const characters = '01🧠⚠️🫡🚨'.split('')

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00FF41'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, i) => {
        const text = characters[Math.floor(Math.random() * characters.length)]
        const x = i * fontSize
        ctx.fillText(text, x, y * fontSize)

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }

    const interval = setInterval(draw, 50)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
    />
  )
}
