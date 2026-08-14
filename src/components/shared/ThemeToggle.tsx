'use client'

import { useCallback, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const subscribe = () => () => {}
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()

  const onToggle = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    const button = buttonRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!button || reduceMotion) {
      setTheme(next)
      return
    }

    const { left, top, width, height } = button.getBoundingClientRect()
    const cx = left + width / 2
    const cy = top + height / 2
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    )

    // Se evita tanto la View Transitions API (captura un snapshot de toda la
    // página) como animar clip-path: ambos trabajan en el hilo principal y
    // compiten con el canvas WebGL del Hero, lo que se percibe como un tirón.
    // En cambio se escala un círculo con transform, que el navegador delega
    // al compositor (GPU) y se mantiene fluido pase lo que pase en JS.
    const overlay = document.createElement('div')
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:2147483647;pointer-events:none;overflow:hidden;'

    const circle = document.createElement('div')
    circle.style.cssText = `position:absolute;left:${cx - radius}px;top:${cy - radius}px;width:${radius * 2}px;height:${radius * 2}px;border-radius:50%;background:${
      next === 'dark' ? '#0b0f19' : '#f8fafc'
    };transform:scale(0);will-change:transform;`

    overlay.appendChild(circle)
    document.body.appendChild(overlay)

    const grow = circle.animate(
      { transform: ['scale(0)', 'scale(1)'] },
      { duration: 480, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' }
    )

    grow.finished
      .then(() => {
        setTheme(next)
        // Un frame con el overlay opaco encima tapa el repaint del tema.
        return new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        )
      })
      .then(() => overlay.animate({ opacity: [1, 0] }, { duration: 220, easing: 'ease-out' }).finished)
      .catch(() => {})
      .then(() => overlay.remove())
  }, [resolvedTheme, setTheme])

  if (!mounted) return <div className="w-14 h-7 rounded-full bg-slate-200/60 dark:bg-white/10 border border-slate-200 dark:border-white/10" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`
        relative flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus-ring shrink-0
        ${isDark
          ? 'bg-emerald-600/90 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
          : 'bg-amber-200 border border-amber-300'}
      `}
    >
      {/* Thumb slider */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 600, damping: 40 }}
        className={`
          w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center
          absolute top-[3px]
          ${isDark ? 'left-[31px]' : 'left-[3px]'}
        `}
      >
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -20, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          transition={{ duration: 0.2 }}
        >
          {isDark
            ? <Moon size={11} className="text-emerald-700" />
            : <Sun  size={11} className="text-amber-500" />
          }
        </motion.div>
      </motion.div>

      {/* Decorative background icon */}
      {isDark
        ? <Sun  size={10} className="absolute left-2   text-violet-200 opacity-70" />
        : <Moon size={10} className="absolute right-2  text-amber-500 opacity-60" />
      }
    </button>
  )
}
