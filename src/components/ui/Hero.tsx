'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Mail, Download } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Terminal, { type TermLine } from '@/components/ui/Terminal'

const Hero3DScene = dynamic(() => import('@/components/ui/Hero3DScene'), {
  ssr: false,
  loading: () => null,
})

// Referencia estable: fuera del componente para no reiniciar la animación en cada render
const terminalLines: TermLine[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'Cristian Velásquez — Full Stack Developer' },
  { kind: 'cmd', text: 'cat stack.json' },
  { kind: 'out', text: 'frontend: Next.js · React · TypeScript' },
  { kind: 'out', text: 'backend:  Node.js · Java · Python' },
  { kind: 'out', text: 'cloud:    Vercel · Supabase · Docker' },
  { kind: 'cmd', text: './status --now' },
  { kind: 'ok', text: 'Disponible para nuevos proyectos' },
]

export default function Hero() {
  const fullText = "Construyo experiencias web que convierten ideas en productos"
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -80])

  useEffect(() => {
    let currentIndex = 0
    const interval = window.setInterval(() => {
      setTypedText(fullText.slice(0, currentIndex + 1))
      currentIndex += 1
      if (currentIndex >= fullText.length) {
        window.clearInterval(interval)
        setIsTyping(false)
      }
    }, 55)

    return () => window.clearInterval(interval)
  }, [fullText])

  const handleDownload = () => {
    setIsDownloading(true)
    // Simulate download delay
    setTimeout(() => setIsDownloading(false), 2000)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* 3D Animated Interactive Canvas */}
      <Hero3DScene />

      {/* Background radial glows & subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        
        {/* Ambient Emerald & Teal Glow Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-teal-500/10 dark:bg-teal-500/10 blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-600/5 blur-[90px]" />
      </div>

      <motion.div style={{ y: parallaxY }} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center gap-7">

          {/* ── Status Badge ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 dark:bg-emerald-950/40 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold tracking-wide">
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          {/* ── Heading Content ─────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <p className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30">
              Full-Stack Developer & Software Engineer
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.08] tracking-tight mb-4 text-slate-900 dark:text-white">
              Cristian{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                Velásquez
              </span>
            </h1>
            
            {/* Typewriter text */}
            <h2 className="text-lg sm:text-xl md:text-2xl !text-white font-semibold h-10 flex items-center justify-center gap-1.5 max-w-2xl">
              <span>{typedText}</span>
              <span className={`w-[3px] h-6 bg-emerald-400 rounded-full inline-block ${isTyping ? 'animate-pulse' : 'animate-blink'}`} />
            </h2>
          </motion.div>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
            className="!text-white text-base sm:text-lg font-medium leading-relaxed max-w-2xl opacity-95"
          >
            Soluciones front-to-back centradas en usabilidad, rendimiento y calidad. Especializado en React, Next.js, Node.js y experiencias interactivas escalables para producción.
          </motion.p>

          {/* ── Buttons / CTAs ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-4 mt-2"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden focus-ring"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver mis proyectos
              </span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="/cv/CV_Cristianvelasquez.pdf"
              download
              className="focus-ring"
            >
              <Button 
                variant="outline" 
                className="px-7 py-3.5 rounded-xl border-2 border-emerald-400/60 !text-white bg-slate-900/60 hover:bg-emerald-500/20 hover:border-emerald-400/90 transition-all duration-300 font-bold text-sm flex items-center gap-2 backdrop-blur-md"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-400 mr-1" />
                    Descargando...
                  </>
                ) : (
                  <>
                    <Download size={16} className="text-emerald-400" />
                    Descargar CV
                  </>
                )}
              </Button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-center gap-3.5 mt-4"
          >
            {[
              {
                icon: FiGithub,
                href: 'https://github.com/cristian102711',
                label: 'GitHub',
              },
              {
                icon: FaLinkedinIn,
                href: 'https://www.linkedin.com/in/cristian-carlos-velasquez-cornejo',
                label: 'LinkedIn',
              },
              {
                icon: Mail,
                href: 'mailto:cris.velasquezc@duocuc.cl',
                label: 'Email',
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 shadow-xs hover:shadow-md hover:shadow-emerald-500/10 transition-all focus-ring"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={19} />
              </motion.a>
            ))}
          </motion.div>

          {/* ── Terminal animado ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-xl mt-3"
          >
            <Terminal lines={terminalLines} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:flex absolute -bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-slate-400 dark:text-slate-600 opacity-70"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400/80">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-emerald-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
