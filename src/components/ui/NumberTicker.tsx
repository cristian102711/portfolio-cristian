'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  value: number
  /** Retraso antes de arrancar la cuenta (s) */
  delay?: number
  className?: string
}

/**
 * Cuenta de 0 hasta `value` al entrar en viewport (una sola vez).
 * Actualiza el texto de forma imperativa para no re-renderizar en cada frame;
 * el valor inicial "0" es idéntico en server y cliente (sin hydration mismatch).
 */
export function NumberTicker({ value, delay = 0, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 32, stiffness: 90 })
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => motionValue.set(value), delay * 1000)
    return () => window.clearTimeout(t)
  }, [inView, value, delay, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest))
    })
  }, [spring])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      0
    </span>
  )
}
