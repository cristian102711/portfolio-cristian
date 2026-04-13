'use client'

import { motion } from 'framer-motion'
import { education } from '@/data/projects'
import { GraduationCap, Briefcase, ShieldCheck, Award, Building2, Backpack } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  shield: ShieldCheck,
  certificate: Award,
  school: Building2,
  backpack: Backpack,
}

export default function Education() {
  return (
    <section id="education" className="relative py-20 px-6">
      {/* Top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-violet-500/40" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[4px] text-violet-400 font-medium">
            Formación
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">
            Educación{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Académica
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Mi formación combina conocimiento académico formal con certificaciones y
            aprendizaje autodidacta continuo.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-fuchsia-500/40 to-transparent" />

          <div className="flex flex-col gap-10">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start pl-16 lg:pl-0 ${
                    isLeft
                      ? 'lg:flex-row lg:pr-[calc(50%+24px)]'
                      : 'lg:flex-row-reverse lg:pl-[calc(50%+24px)]'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[18px] lg:left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-violet-500 bg-zinc-950 z-10 flex items-center justify-center`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  </div>

                  {/* Card */}
                  <div className="glass-card p-6 flex-1 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5 w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
                        {(() => {
                          const Icon = iconMap[edu.icon] || GraduationCap
                          return <Icon size={24} />
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors">
                            {edu.degree}
                          </h3>
                          <span className="text-xs px-2.5 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 whitespace-nowrap">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-sm text-cyan-400 font-medium mb-3">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
