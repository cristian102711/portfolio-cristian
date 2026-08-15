'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // El anillo grande sigue con retraso (efecto magnético suave)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    // Solo en desktop con puntero fino
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Delegación de eventos: sin mutar el DOM ni añadir atributos (evita choques con React)
    const closestInteractive = (node: EventTarget | null) =>
      node instanceof Element ? node.closest(INTERACTIVE) : null

    const onOver = (e: MouseEvent) => {
      if (closestInteractive(e.target)) cursorRef.current?.classList.add('cursor-hover')
    }
    const onOut = (e: MouseEvent) => {
      const from = closestInteractive(e.target)
      const to = closestInteractive(e.relatedTarget)
      if (from && from !== to) cursorRef.current?.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Punto central — sigue el mouse exacto */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 hidden lg:block"
        style={{ x: mouseX, y: mouseY }}
        aria-hidden
      >
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Anillo exterior — sigue con retraso */}
      <motion.div
        ref={cursorRef}
        aria-hidden
        className="
          fixed top-0 left-0 pointer-events-none z-9998 hidden lg:block
          w-8 h-8 rounded-full border border-emerald-500/60
          -translate-x-1/2 -translate-y-1/2
          transition-[width,height,border-color,background-color] duration-200
          [&.cursor-hover]:w-12 [&.cursor-hover]:h-12
          [&.cursor-hover]:border-emerald-400
          [&.cursor-hover]:bg-emerald-500/10
        "
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
