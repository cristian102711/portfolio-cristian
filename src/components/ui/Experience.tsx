'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/data/projects'
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react'

const typeBadge: Record<string, string> = {
  fulltime: 'Tiempo Completo',
  parttime: 'Medio Tiempo',
  freelance: 'Freelance',
}

const typeBadgeStyle: Record<string, string> = {
  fulltime: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
  parttime: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  freelance: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/40" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[4px] text-violet-400 font-medium">
            Trayectoria
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">
            Experiencia{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Profesional
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm">
            Experiencia real construyendo productos en producción, automatizando procesos y trabajando con equipos técnicos.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-500/30 to-transparent" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-20 lg:pl-24"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18px] lg:left-[26px] top-6 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-violet-500 bg-zinc-950 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                </div>

                {/* Card */}
                <div className="glass-card p-6 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group">
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Briefcase size={18} className="text-violet-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-cyan-400 font-semibold mt-0.5">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${typeBadgeStyle[exp.type]}`}>
                        {typeBadge[exp.type]}
                      </span>
                      <span className="text-xs text-zinc-500 px-2.5 py-1 rounded-full border border-white/8 bg-zinc-900/50">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin size={13} className="text-zinc-500 flex-shrink-0" />
                    <span className="text-xs text-zinc-500">{exp.location}</span>
                  </div>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-2.5">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                        <CheckCircle2 size={15} className="text-violet-500/70 flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
