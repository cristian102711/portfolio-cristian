'use client'

import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface BorderBeamProps {
  /** Tamaño del cometa de luz (px) */
  size?: number
  /** Duración de una vuelta completa (s) */
  duration?: number
  /** Desfase de fase (s): usar duration/2 para un segundo haz opuesto */
  delay?: number
  colorFrom?: string
  colorTo?: string
  /** Grosor del borde iluminado (px) */
  borderWidth?: number
  /** Radio de esquina; debe coincidir con el rounded del contenedor */
  radius?: number
  className?: string
}

/**
 * Luz que recorre el borde de un contenedor `relative` con `rounded-[Npx]`.
 * Adaptado de magicui a Tailwind v4 (máscara y fondo vía estilos inline).
 */
export function BorderBeam({
  size = 64,
  duration = 6,
  delay = 0,
  colorFrom = '#10b981',
  colorTo = '#22d3ee',
  borderWidth = 1.5,
  radius = 32,
  className,
}: BorderBeamProps) {
  const maskStyle: CSSProperties = {
    border: `${borderWidth}px solid transparent`,
    // Recorta el pintado del contenedor (y su hijo) al anillo del borde
    WebkitMask:
      'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    mask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
    maskComposite: 'exclude',
  }

  return (
    <div
      style={maskStyle}
      className={cn('pointer-events-none absolute inset-0 rounded-[inherit]', className)}
      aria-hidden
    >
      <motion.div
        className="absolute aspect-square"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${radius}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
        }}
      />
    </div>
  )
}
