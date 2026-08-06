'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUp } from 'lucide-react'
import ThemeToggle from '@/components/shared/ThemeToggle'

const navLinks = [
  { href: '#hero',      label: 'Inicio' },
  { href: '#about',     label: 'Sobre Mí' },
  { href: '#projects',  label: 'Proyectos' },
  { href: '#education', label: 'Formación' },
  { href: '#stack',     label: 'Skills' },
  { href: '#contact',   label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30)
          setShowBackToTop(window.scrollY > 300)

          // Calculate scroll progress
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
          setScrollProgress(progress)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver — detects active section reliably for ALL sections
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-50 focus-ring"
      >
        Saltar al contenido principal
      </a>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-950/5 dark:shadow-black/40'
              : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/40 dark:border-slate-800/40'
          }`}>
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center gap-2.5 group select-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <span>C</span>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Cristian<span className="text-emerald-500">.dev</span>
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive  = activeSection === sectionId
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-xs"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.a>
                )
              })}
            </nav>

            {/* Right actions: ThemeToggle & Contact CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <motion.a
                href="#contact"
                className="relative group inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Contacto</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </div>

            {/* Mobile toggle button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 transition-all focus-ring touch-target"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden max-w-6xl mx-auto px-4 mt-2"
            >
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-xl shadow-slate-950/10 dark:shadow-black/50 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '')
                  const isActive = activeSection === sectionId
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-sm px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    </a>
                  )
                })}
                <div className="pt-2 mt-1 border-t border-slate-200/80 dark:border-slate-800/80">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center text-sm font-semibold px-4 py-2.5 rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contáctame
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-500/90 hover:bg-emerald-500 text-white backdrop-blur-md shadow-lg shadow-emerald-500/30 transition-all focus-ring touch-target z-40"
            aria-label="Volver arriba"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
