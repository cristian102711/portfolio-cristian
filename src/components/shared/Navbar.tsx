'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowUp } from 'lucide-react'
import { useTheme } from 'next-themes'

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
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30)
          setShowBackToTop(window.scrollY > 300)
          
          const sections = navLinks.map((l) => l.href.replace('#', ''))
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i])
            if (el && window.scrollY >= el.offsetTop - 120) {
              setActiveSection(sections[i])
              break
            }
          }

          // Calculate scroll progress
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = (window.scrollY / totalHeight) * 100
          setScrollProgress(progress)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>      {/* Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet-600 text-white px-4 py-2 rounded-lg z-50 focus-ring"
      >
        Saltar al contenido principal
      </a>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-zinc-800">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="text-xl font-black tracking-tighter bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent select-none"
          whileHover={{ scale: 1.05 }}
        >
          &lt;CV /&gt;
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive  = activeSection === sectionId
            return (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                whileHover={{ y: -1 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/8"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            )
          })}
        </nav>

        {/* Theme Toggle & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all focus-ring touch-target"
            aria-label={currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
            {currentTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <motion.a
            href="#contact"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/70 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Contáctame
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all focus-ring touch-target"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/95 backdrop-blur-md border-t border-white/5"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between mt-2 px-3">
                <button
                  onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all focus-ring touch-target"
                  aria-label={currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                >
                  {currentTheme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
                <a
                  href="#contact"
                  className="text-center text-sm px-4 py-2.5 rounded-xl border border-violet-500/40 text-violet-300"
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

    {/* Back to Top Button */}
    <AnimatePresence>
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-violet-600/90 backdrop-blur-md text-white shadow-lg hover:bg-violet-600 transition-all focus-ring touch-target z-40"
          aria-label="Volver arriba"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  </>
  )
}
