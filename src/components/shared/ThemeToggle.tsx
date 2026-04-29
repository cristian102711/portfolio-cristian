'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-14 h-7 rounded-full bg-slate-200/60 dark:bg-white/10 border border-slate-200 dark:border-white/10" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`
        relative flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus-ring shrink-0
        ${isDark
          ? 'bg-violet-600 border border-violet-500/50'
          : 'bg-amber-200 border border-amber-300'}
      `}
    >
      {/* Thumb slider — usa justify con padding en vez de absolute */}
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
            ? <Moon size={11} className="text-violet-600" />
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
