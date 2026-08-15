'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Transition,
} from 'framer-motion'
import { Download, MapPin, Mail, Code2, Layers, Rocket, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { NumberTicker } from '@/components/ui/NumberTicker'
import Image from 'next/image'
import { useRef } from 'react'

const stats = [
  { value: '10+', label: 'Proyectos' },
  { value: '3',   label: 'Apps publicadas' },
  { value: '8+',  label: 'Tecnologías' },
  { value: 'FT',  label: 'Disponibilidad' },
]

const pillars = [
  {
    icon: <Code2 size={20} />,
    title: 'Código Limpio & Arquitectura',
    desc: 'Desarrollo soluciones modulares, mantenibles y preparadas para escalar con las mejores prácticas.',
  },
  {
    icon: <Layers size={20} />,
    title: 'Dominio Full Stack',
    desc: 'Experiencia integral desde el frontend con React y Next.js hasta el backend con Node.js, Java y bases de datos.',
  },
  {
    icon: <Rocket size={20} />,
    title: 'Enfoque a Producción',
    desc: 'Integración continua, autenticación robusta y despliegue continuo de aplicaciones en entornos reales.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as Transition['ease'], delay },
})

// Estilo de número de las stats (gradiente + hover) reutilizado para dígitos y sufijo
const statGradient =
  'text-2xl sm:text-3xl font-black bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300 transition-colors'

// Divide un valor como "10+" en dígitos animados + sufijo; deja intacto lo no numérico ("FT")
function StatValue({ value, delay }: { value: string; delay: number }) {
  const match = /^(\d+)(\D*)$/.exec(value)
  if (!match) return <span className={statGradient}>{value}</span>
  return (
    <span className="inline-flex items-baseline">
      <NumberTicker value={Number(match[1])} delay={delay} className={statGradient} />
      {match[2] && <span className={statGradient}>{match[2]}</span>}
    </span>
  )
}

// ── Expanded Holographic tilt card ─────────────────────────────────────
function HoloCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 })

  const rotateY = useTransform(springX, [0, 1], [-12, 12])
  const rotateX = useTransform(springY, [0, 1], [8, -8])

  // Shimmer gradient position follows mouse
  const shimmerX = useTransform(springX, [0, 1], ['-40%', '140%'])
  const shimmerY = useTransform(springY, [0, 1], ['-20%', '120%'])

  // Holo rainbow overlay opacity
  const holoOpacity = useMotionValue(0)
  const holoSpring = useSpring(holoOpacity, { stiffness: 80, damping: 14 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
    holoOpacity.set(0.3)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    holoOpacity.set(0)
  }

  return (
    <div style={{ perspective: 1100 }} className="w-full flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-2xl rounded-[32px] overflow-hidden cursor-pointer select-none"
      >
        {/* Outer subtle glow */}
        <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-cyan-500/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-black/80">

          {/* SVG Noise texture */}
          <div
            className="absolute inset-0 rounded-[32px] opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Rainbow Holographic glow */}
          <motion.div
            style={{
              opacity: holoSpring,
              left: shimmerX,
              top: shimmerY,
              background: 'conic-gradient(from 0deg, #ff000040, #ff990040, #ffff0040, #00ff0040, #00ffff40, #0000ff40, #ff00ff40, #ff000040)',
              filter: 'blur(80px)',
            }}
            className="absolute w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-10"
          />

          {/* Shimmer line */}
          <motion.div
            style={{
              left: shimmerX,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }}
            className="absolute top-0 w-40 h-full -rotate-12 pointer-events-none z-20"
          />

          {/* TOP SECTION: Avatar, Info & Badge */}
          <div className="relative z-30 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
            {/* Avatar Container */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full p-[2.5px] bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-500 animate-spin-slow blur-[1px]" />
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-slate-950 shadow-xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Cristian Velásquez"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 112px, 128px"
                  priority
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 rounded-full border-3 border-slate-950 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold tracking-wide uppercase flex items-center gap-1">
                  <Sparkles size={11} />
                  Analista Programador
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-mono">
                  Duoc UC
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Cristian Velásquez
              </h3>
              <p className="text-base text-emerald-400 font-semibold mt-0.5">
                Full Stack Developer
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-400" /> Chile
                </span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-700" />
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-emerald-400" />
                  cris.velasquezc@duocuc.cl
                </span>
              </div>
            </div>

            {/* Top Right Card Chip Badge */}
            <div className="hidden sm:flex flex-col items-end shrink-0">
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 p-[1px] shadow-inner mb-1">
                <div className="w-full h-full rounded-[5px] bg-slate-900/40 grid grid-cols-2 gap-0.5 p-1">
                  <div className="border-r border-b border-amber-400/40" />
                  <div className="border-b border-amber-400/40" />
                  <div className="border-r border-amber-400/40" />
                  <div className="border-amber-400/40" />
                </div>
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">DEV-CARD</span>
            </div>
          </div>

          {/* Divider */}
          <div className="relative z-30 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />

          {/* STATS GRID (4 Columns) */}
          <div className="relative z-30 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex flex-col items-center justify-center bg-slate-900/80 hover:bg-slate-800/80 transition-colors rounded-2xl py-4 px-2 border border-slate-800 hover:border-emerald-500/30 group"
              >
                <StatValue value={s.value} delay={0.2 + i * 0.08} />
                <span className="text-[11px] text-slate-400 font-medium text-center leading-tight mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* THREE PILLARS / HIGHLIGHTS */}
          <div className="relative z-30 space-y-4 mb-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/20 transition-all group"
              >
                <div className="shrink-0 mt-0.5 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CARD FOOTER: Actions & Watermark */}
          <div className="relative z-30 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            <motion.a
              href="/cv/CV_Cristianvelasquez.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:opacity-90 text-slate-950 font-bold rounded-xl px-7 py-3 text-sm shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Download size={15} className="mr-2" />
                Descargar CV Completo
              </Button>
            </motion.a>

            <div className="text-center sm:text-right">
              <p className="text-[11px] text-slate-400 font-mono tracking-[3px]">CRISTIAN.DEV</p>
              <p className="text-[10px] text-slate-600 font-mono">PASSPORT // FULL STACK 2024</p>
            </div>
          </div>

          {/* Border beam: dos haces de luz recorriendo el borde de la tarjeta */}
          <BorderBeam radius={32} size={72} duration={7} colorFrom="#10b981" colorTo="#22d3ee" className="z-30" />
          <BorderBeam radius={32} size={72} duration={7} delay={3.5} colorFrom="#34d399" colorTo="#0ea5e9" className="z-30" />

        </div>
      </motion.div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/8 blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Label Header */}
        <motion.div {...fadeUp()} className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[6px] text-emerald-500 dark:text-emerald-400 font-bold">
            Sobre Mí
          </span>
          <div className="mt-3 overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
            >
              Tarjeta de{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Identidad Profesional
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Scaled Holographic Card */}
        <motion.div {...fadeUp(0.15)}>
          <HoloCard />
        </motion.div>

        {/* Interactive hint */}
        <motion.p
          {...fadeUp(0.35)}
          className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 tracking-wide"
        >
          ✦ Mueve el cursor o inclina para activar el efecto holográfico 3D
        </motion.p>
      </div>
    </section>
  )
}
