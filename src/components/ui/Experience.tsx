'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experiences } from '@/data/projects'
import { Building2, Calendar, MapPin, CheckCircle2, Sparkles, Terminal } from 'lucide-react'

const typeBadgeLabel: Record<string, string> = {
  fulltime: 'Tiempo Completo',
  parttime: 'Medio Tiempo',
  freelance: 'Freelance',
}

const typeBadgeStyle: Record<string, string> = {
  fulltime: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  parttime: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  freelance: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
}

const experienceTechs: Record<string, string[]> = {
  'Awna Digital SpA': ['Next.js', 'MongoDB', 'JWT', 'TypeScript', 'Vercel', 'Hostinger'],
  'BS2': ['Dynatrace', 'Linux', 'Windows Server', 'Python', 'Shell Script', 'DevOps'],
  'Independiente': ['React', 'Node.js', 'Express', 'SQL', 'Flutter', 'Firebase', 'Kotlin'],
}

// ── Nodo animado sobre la línea del timeline ──────────────────────────────
function TimelineNode({ isCurrent }: { isCurrent: boolean }) {
  return (
    <span className="absolute left-8 top-2 -translate-x-1/2 flex h-4 w-4 items-center justify-center">
      {isCurrent && (
        <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className="relative inline-flex h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 ring-4 ring-[var(--background)] shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
    </span>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)

  // Mide la altura del contenedor de items para dibujar la línea vertical
  useEffect(() => {
    const measure = () => {
      if (itemsRef.current) {
        setLineHeight(itemsRef.current.getBoundingClientRect().height)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Progreso de scroll: la línea se "llena" de emerald→cyan al recorrer la sección
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 15%', 'end 65%'],
  })
  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight])
  const fillOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Luz ambiental muy suave de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header de la Sección estilo Apple / Linear */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-[4px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Trayectoria
          </span>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Experiencia{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Profesional
            </span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Plataformas en producción, infraestructura web y desarrollo de software Full Stack.
          </p>
        </motion.div>

        {/* ── Timeline sticky con línea de progreso ─────────────────────── */}
        <div ref={sectionRef} className="relative">
          <div ref={itemsRef} className="relative">
            {/* Riel de fondo de la línea vertical */}
            <div
              style={{ height: lineHeight }}
              className="absolute left-8 top-0 w-[2px] -translate-x-1/2 overflow-hidden bg-slate-200 dark:bg-white/10 [mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)]"
            >
              {/* Relleno animado según el scroll */}
              <motion.div
                style={{ height: fillHeight, opacity: fillOpacity }}
                className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-emerald-500"
              />
            </div>

            {experiences.map((exp, i) => {
              const techs = experienceTechs[exp.company] || []
              const isCurrent = /actual/i.test(exp.period)

              return (
                <div key={`${exp.company}-${i}`} className="flex justify-start pt-10 md:pt-20 md:gap-8">
                  {/* Columna izquierda sticky (empresa + periodo en desktop) */}
                  <div className="sticky top-28 z-20 flex flex-col items-start self-start md:w-2/5 lg:w-1/3">
                    <TimelineNode isCurrent={isCurrent} />
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20% 0px' }}
                      transition={{ duration: 0.5 }}
                      className="hidden md:flex md:flex-col md:pl-20"
                    >
                      <span className={`self-start text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${typeBadgeStyle[exp.type]}`}>
                        {isCurrent ? 'Actualidad' : typeBadgeLabel[exp.type]}
                      </span>
                      <h3 className="mt-3 text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                        {exp.company}
                      </h3>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-zinc-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                    </motion.div>
                  </div>

                  {/* Columna derecha: tarjeta con detalle */}
                  <div className="relative w-full pl-20 pr-1 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10% 0px' }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="group rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-zinc-900/60 p-6 sm:p-7 backdrop-blur-sm transition-colors hover:border-emerald-500/40 dark:hover:border-emerald-500/30 dark:hover:bg-zinc-900/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    >
                      {/* Cabecera visible en móvil (empresa + periodo) */}
                      <div className="md:hidden mb-4 flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${typeBadgeStyle[exp.type]}`}>
                          {isCurrent ? 'Actualidad' : typeBadgeLabel[exp.type]}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                        {exp.role}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        <Building2 className="w-4 h-4" />
                        <span className="md:hidden">{exp.company}</span>
                        <span className="inline-flex items-center gap-1 text-slate-500 dark:text-zinc-500 font-normal text-xs">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Logros clave */}
                      <div className="mt-5 pt-5 border-t border-slate-200 dark:border-white/10">
                        <h4 className="text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-bold mb-3 flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                          Logros de Ingeniería & Entregables
                        </h4>
                        <div className="space-y-2.5">
                          {exp.highlights.map((h, hIdx) => (
                            <motion.div
                              key={hIdx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: hIdx * 0.08 }}
                              className="flex items-start gap-3 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Stack tecnológico */}
                      {techs.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {techs.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
