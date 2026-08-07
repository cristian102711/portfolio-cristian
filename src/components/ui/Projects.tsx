'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Sparkles, Zap, Server, Smartphone, Gamepad2 } from 'lucide-react'
import { GitHubIcon } from '@/components/shared/BrandIcons'
import { projects } from '@/data/projects'
import { usePortfolio } from '@/context/PortfolioContext'
import type { Project } from '@/data/projects'
import { TiltCard } from './TiltCard'

/* ── Iconos temáticos según el tipo de proyecto ── */
const typeIcon: Record<Project['type'], typeof Zap> = {
  web: Server,
  mobile: Smartphone,
  game: Gamepad2,
}

/* ── Etiquetas legibles por tipo ── */
const typeLabel: Record<Project['type'], string> = {
  mobile: 'Mobile App',
  web: 'Web App',
  game: 'Videojuego',
}

/* ── Métricas de impacto clave por proyecto ── */
const projectMetrics: Record<string, { metric: string; label: string }[]> = {
  '01': [
    { metric: '81', label: 'Deployments' },
    { metric: 'QR', label: 'Dinámico' },
    { metric: 'JWT', label: 'Auth & Roles' },
  ],
  '02': [
    { metric: 'AI', label: 'OpenAI API' },
    { metric: 'MP', label: 'Mercado Pago' },
    { metric: 'SaaS', label: 'Monetizado' },
  ],
  '03': [
    { metric: 'Auth', label: 'Supabase' },
    { metric: 'Cart', label: 'Asíncrono' },
    { metric: 'CI/CD', label: 'Pipeline' },
  ],
  '04': [
    { metric: 'GPS', label: 'Tracking' },
    { metric: 'IA', label: 'Scoring' },
    { metric: '500+', label: 'Deploys' },
  ],
}

export default function Projects() {
  const { setActiveProject } = usePortfolio()

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Luces ambientales de fondo para profundidad visual */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Encabezado de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-[4px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Portafolio
          </span>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Proyectos{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Destacados
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Sistemas en producción, plataformas SaaS y aplicaciones de arquitectura escalable.
          </p>
        </motion.div>

        {/* Grid de Tarjetas Cyberpunk 3D con Tilt e Imagen de Fondo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7" style={{ perspective: '1200px' }}>
          {projects.map((project, i) => {
            const IconComp = typeIcon[project.type] || Server
            const metrics = projectMetrics[project.id] || []

            return (
              <TiltCard key={project.id} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  onMouseEnter={() => setActiveProject(project)}
                  onMouseLeave={() => setActiveProject(null)}
                  className="group relative rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl overflow-hidden hover:border-emerald-400/60 transition-all duration-500 h-full flex flex-col justify-between"
                >
                  {/* ── Imagen de preview visible en la parte superior ── */}
                  <div className="relative w-full h-44 overflow-hidden z-0">
                    <Image
                      src={project.image}
                      alt={`Captura de pantalla del proyecto ${project.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Gradiente inferior para transición suave hacia el contenido */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    {/* Brillo ambiental en hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Reflejo holográfico de borde superior */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  {/* Reflejo holográfico de borde inferior */}
                  <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                  {/* Resplandor ambiental interno al hacer hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none z-10" />

                  <div className="relative z-10">
                    {/* Header con Icono de tipo y número de proyecto */}
                    <div className="p-7 pb-0 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400/60 transition-all duration-300 backdrop-blur-sm">
                          <IconComp className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                            {typeLabel[project.type]}
                          </span>
                          <div className="text-xs text-cyan-400 font-semibold mt-1">{project.period}</div>
                        </div>
                      </div>
                      <span className="text-5xl font-black text-zinc-700/40 group-hover:text-emerald-400/20 transition-colors select-none">
                        {project.id}
                      </span>
                    </div>

                    {/* Título y descripción del proyecto */}
                    <div className="p-7 pt-4 space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Mini-Grid de Métricas de Impacto */}
                    {metrics.length > 0 && (
                      <div className="px-7 grid grid-cols-3 gap-2.5">
                        {metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2.5 rounded-xl bg-zinc-900/60 border border-emerald-500/15 text-center group-hover:border-emerald-500/30 transition-colors backdrop-blur-sm"
                          >
                            <div className="text-lg font-black text-emerald-400">{m.metric}</div>
                            <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pastillas del stack tecnológico */}
                    <div className="px-7 pt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-lg bg-zinc-800/60 text-zinc-300 border border-white/5 font-medium backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botones de acción en el footer de la tarjeta */}
                  <div className="relative z-10 p-7 pt-5 flex items-center gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/10 hover:border-emerald-500/40 px-4 py-2.5 rounded-xl font-bold transition-all backdrop-blur-sm"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <GitHubIcon size={14} />
                      GitHub
                    </motion.a>

                    {project.demo && project.demo !== '#' && project.demo !== '' && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-black px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
