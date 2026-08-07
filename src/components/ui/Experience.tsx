'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences } from '@/data/projects'
import { Building2, Calendar, MapPin, CheckCircle2, ChevronDown, Sparkles, Terminal, ArrowUpRight } from 'lucide-react'

const typeBadgeLabel: Record<string, string> = {
  fulltime: 'Tiempo Completo',
  parttime: 'Medio Tiempo',
  freelance: 'Freelance',
}

const typeBadgeStyle: Record<string, string> = {
  fulltime: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold',
  parttime: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-semibold',
  freelance: 'border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold',
}

const experienceTechs: Record<string, string[]> = {
  'Awna Digital SpA': ['Next.js', 'MongoDB', 'JWT', 'TypeScript', 'Vercel', 'Hostinger'],
  'BS2': ['Dynatrace', 'Linux', 'Windows Server', 'Python', 'Shell Script', 'DevOps'],
  'Independiente': ['React', 'Node.js', 'Express', 'SQL', 'Flutter', 'Firebase', 'Kotlin'],
}

export default function Experience() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0)

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx)
  }

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
          className="text-center mb-16"
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
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Plataformas en producción, infraestructura web y desarrollo de software Full Stack.
          </p>
        </motion.div>

        {/* Acordeón Editorial Minimalista (Estilo Linear / Apple) */}
        <div className="space-y-4">
          {experiences.map((exp, i) => {
            const isExpanded = expandedIdx === i
            const techs = experienceTechs[exp.company] || []

            return (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div
                  onClick={() => toggleExpand(i)}
                  className={`group rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                    isExpanded
                      ? 'border-emerald-500/40 bg-zinc-900/90 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                      : 'border-white/10 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-emerald-500/30'
                  }`}
                >
                  {/* Borde activo lateral glowing */}
                  {isExpanded && (
                    <motion.div
                      layoutId="activeBorder"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-400"
                    />
                  )}

                  {/* Fila Principal de la Experiencia */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[240px]">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border ${typeBadgeStyle[exp.type]}`}>
                          {typeBadgeLabel[exp.type]}
                        </span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 mt-1 text-emerald-400 font-semibold text-sm">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                        <span className="text-zinc-500 font-normal text-xs">• {exp.location}</span>
                      </div>
                    </div>

                    {/* Botón Indicador Circular */}
                    <div className="w-10 h-10 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-emerald-400' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Detalle Desplegable Smooth Apple Motion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{
                          height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, ease: 'easeInOut' },
                          y: { duration: 0.3, ease: 'easeInOut' },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-white/10 mt-6 space-y-6">
                          {/* Logros Clave */}
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-3 flex items-center gap-2">
                              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                              Logros de Ingeniería & Entregables:
                            </h4>
                            <div className="space-y-2.5">
                              {exp.highlights.map((h, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stack Tecnológico */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                              {techs.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-xs px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <div className="text-xs text-zinc-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
