'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Download } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

const variants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const fullText = "Desarrollador Full Stack | Estudiante Analista Programador"
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background radial glows optimized for GPU */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/8 blur-[140px] will-change-transform transform-gpu" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px] will-change-transform transform-gpu" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-fuchsia-600/5 blur-[100px] will-change-transform transform-gpu" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-12">
        <div className="flex flex-col items-center text-center gap-8">

          {/* ── Status Badge ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-violet-300 tracking-wider font-medium">
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          {/* ── Text Content ─────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <p className="text-zinc-500 text-sm font-medium mb-3 tracking-widest uppercase">
              Hola, soy
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter mb-4">
              Cristian
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Velásquez
              </span>
            </h1>
            
            {/* Typewriter text */}
            <h2 className="text-xl md:text-2xl text-zinc-300 font-medium h-8 flex items-center justify-center gap-1">
              {typedText}
              <span className={`w-[3px] h-6 bg-violet-400 inline-block ${isTyping ? 'animate-pulse' : 'animate-blink'}`} />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl mt-2"
          >
            Desarrollador apasionado por construir productos digitales que resuelven problemas reales.
            Combino{' '}
            <span className="text-white font-medium">visión técnica</span> con{' '}
            <span className="text-violet-400 font-medium">curiosidad constante</span>{' '}
            para crear soluciones escalables, limpias y listas para producción — desde APIs hasta interfaces que enamoran al usuario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30 focus-ring"
            >
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl">
                <span className="relative z-10">Ver mis proyectos</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </a>
            <a
              href="/cv/CV_Cristianvelasquez.pdf"
              download
              className="focus-ring"
            >
            <Button 
              variant="outline" 
              className="px-8 py-3.5 rounded-xl border border-white/10 text-zinc-300 hover:border-violet-500/40 hover:text-white hover:bg-violet-500/5"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Descargando...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Descargar CV
                </>
              )}
            </Button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            {[
              {
                icon: FiGithub,
                href: 'https://github.com/cristian102711',
                label: 'GitHub',
                color: '#a78bfa',
              },
              {
                icon: FaLinkedinIn,
                href: 'https://www.linkedin.com/in/cristian-carlos-velasquez-cornejo',
                label: 'LinkedIn',
                color: '#0ea5e9',
              },
              {
                icon: Mail,
                href: 'mailto:cris.velasquezc@duocuc.cl',
                label: 'Email',
                color: '#34d399',
              },
            ].map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all shadow-lg shadow-black/20 focus-ring"
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--hover-color': color } as React.CSSProperties}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown size={15} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
