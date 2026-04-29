'use client'

import { motion, type Transition } from 'framer-motion'
import { Download, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'

const stats = [
  { value: '10+', label: 'Proyectos Completados' },
  { value: '3',   label: 'Apps publicadas' },
  { value: '8+',  label: 'Tecnologías dominadas' },
  { value: 'FT',  label: 'Disponibilidad' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as Transition['ease'], delay },
})

export default function About() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => setIsDownloading(false), 2000)
  }

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Subtle section glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/4 dark:bg-violet-600/6 blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div {...fadeUp()} className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[5px] text-violet-500 dark:text-violet-400 font-semibold">
            Sobre Mí
          </span>
        </motion.div>

        <div className="flex justify-center">

          {/* ── LEFT COLUMN ──────────────────────────────────── */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-8 w-full max-w-xl">

            {/* Profile photo with gradient ring */}
            <div className="relative w-44 h-44 lg:w-52 lg:h-52 shrink-0">
              {/* Animated outer ring */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-linear-to-br from-violet-500 via-fuchsia-500 to-cyan-400 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950" />
              </div>
              {/* Photo */}
              <div className="absolute inset-[4px] rounded-full overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Foto de perfil de Cristian Velásquez"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 15%' }}
                  priority
                  sizes="(max-width: 1024px) 176px, 208px"
                />
              </div>
              {/* Online status dot */}
              <div className="absolute bottom-3 right-3 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-zinc-950 animate-pulse z-10" />
            </div>

            {/* Name + title */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Cristian Velásquez
              </h3>
              <p className="mt-1 text-violet-600 dark:text-violet-300 font-semibold text-base">
                Analista Programador · Full Stack Developer
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1 mt-3 text-sm text-slate-500 dark:text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-violet-400" /> Chile
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-violet-400" />
                  cris.velasquezc@duocuc.cl
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-slate-600 dark:text-zinc-400 leading-relaxed text-[0.95rem]">
              <p>
                Soy{' '}
                <span className="text-slate-900 dark:text-white font-bold">
                  Analista Programador en formación en Duoc UC
                </span>
                , con experiencia real desarrollando productos Full Stack en entornos de
                producción. Construyo desde cero sistemas web complejos con{' '}
                <span className="text-violet-700 dark:text-violet-300 font-semibold">
                  Next.js, React, Node.js, Java y Flutter
                </span>
                , integrando autenticación, bases de datos y despliegue continuo.
              </p>
              <p>
                Me adapto rápido a nuevos stacks, aprendo de forma autónoma y disfruto el trabajo
                colaborativo con equipos técnicos. Mi objetivo es crear{' '}
                <span className="text-cyan-700 dark:text-cyan-400 font-semibold">
                  sistemas escalables, modulares y seguros
                </span>{' '}
                que generen impacto real en el negocio y en los usuarios.
              </p>
            </div>

            {/* Stats 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...fadeUp(0.15 + i * 0.07)}
                  className="glass-card p-4 flex flex-col gap-1 hover:border-violet-500/30 transition-colors"
                >
                  <span className="text-2xl font-extrabold bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CV CTA */}
            <motion.a
              href="/cv/CV_Cristianvelasquez.pdf"
              download
              className="w-full focus-ring"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                className="bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl px-6 py-3.5 w-full shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Descargando...
                  </>
                ) : (
                  <>
                    <Download size={16} className="mr-2" />
                    Descargar CV
                  </>
                )}
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
