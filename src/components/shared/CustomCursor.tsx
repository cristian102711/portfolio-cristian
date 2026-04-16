'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const dotRef     = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // El anillo grande sigue con retraso (efecto magnético suave)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    // Solo en desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Efecto hover en links/botones — el anillo se expande
    const onEnter = () => {
      isHovering.current = true
      cursorRef.current?.classList.add('cursor-hover')
    }
    const onLeave = () => {
      isHovering.current = false
      cursorRef.current?.classList.remove('cursor-hover')
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', move)
    addListeners()

    // Re-scan cada 2s por si se montan nuevos elementos
    const interval = setInterval(addListeners, 2000)

    return () => {
      window.removeEventListener('mousemove', move)
      clearInterval(interval)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Punto central — sigue el mouse exacto */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{ x: mouseX, y: mouseY }}
      >
        <div
          className="w-1.5 h-1.5 bg-violet-400 rounded-full -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Anillo exterior — sigue con retraso */}
      <motion.div
        ref={cursorRef}
        className="
          fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block
          w-8 h-8 rounded-full border border-violet-500/60
          -translate-x-1/2 -translate-y-1/2
          transition-[width,height,border-color,background-color] duration-200
          [&.cursor-hover]:w-12 [&.cursor-hover]:h-12
          [&.cursor-hover]:border-violet-400
          [&.cursor-hover]:bg-violet-500/10
        "
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
