'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/shared/BrandIcons'
import { projects } from '@/data/projects'
import { usePortfolio } from '@/context/PortfolioContext'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

const typeColors: Record<Project['type'], string> = {
  mobile: 'text-sky-600 dark:text-sky-400 border-sky-400/30 bg-sky-400/10',
  web:    'text-violet-700 dark:text-violet-400 border-violet-400/30 bg-violet-400/10',
  game:   'text-emerald-700 dark:text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
}

const typeLabel: Record<Project['type'], string> = {
  mobile: 'Mobile App',
  web: 'Web App',
  game: 'Videojuego',
}

export default function Projects() {
  const { setActiveProject } = usePortfolio()

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-violet-500/50" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[4px] text-violet-400 font-medium">
            Portafolio
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">
            Proyectos{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Destacados
            </span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 max-w-xl mx-auto">
            Aplicaciones reales que resuelven problemas reales. Pasa el cursor
            para ver el preview en el celular.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => setActiveProject(project)}
              onHoverEnd={() => setActiveProject(null)}
              className="group relative glass-card p-6 cursor-default overflow-hidden transition-all duration-500 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              {/* Hover gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Glow edge on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(124,92,242,0.08)]" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={cn(
                        'text-xs font-medium px-2.5 py-1 rounded-full border',
                        typeColors[project.type]
                      )}
                    >
                      {typeLabel[project.type]}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-violet-600 dark:text-violet-400/80 mt-1.5 font-medium tracking-wide">
                      {project.period}
                    </p>
                  </div>
                  <span className="text-4xl font-black text-slate-200 dark:text-zinc-800 group-hover:text-slate-300 dark:group-hover:text-zinc-700 transition-colors">
                    {project.id}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800/60 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-black dark:hover:border-white/30 px-4 py-2 rounded-xl transition-all font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GitHubIcon size={14} />
                    GitHub
                  </motion.a>
                  
                  {project.demo && project.demo !== '#' && project.demo !== '' && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-violet-500/30"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink size={14} />
                      Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
