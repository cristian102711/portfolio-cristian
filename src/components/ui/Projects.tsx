'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { CoverflowCarousel, type CoverflowSlide } from './coverflow-carousel'

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

/* ── Proyectos adaptados al formato de slide del carrusel ── */
const slides: CoverflowSlide[] = projects.map((project) => {
  const highlight = projectMetrics[project.id]?.[0]

  return {
    src: project.image,
    alt: `Captura de pantalla del proyecto ${project.title}`,
    title: project.title,
    subtitle: typeLabel[project.type],
    description: project.description,
    meta: [
      { label: 'Período', value: project.period },
      { label: 'Stack', value: project.tech.slice(0, 3).join(' · ') },
      ...(highlight ? [{ label: highlight.label, value: highlight.metric }] : []),
    ],
    links: {
      github: project.github,
      demo: project.demo && project.demo !== '#' ? project.demo : undefined,
    },
  }
})

export default function Projects() {
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

        {/* Carrusel Coverflow de proyectos */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CoverflowCarousel
            slides={slides}
            showCaption
            showNavigation
            showPagination
            label="Proyectos destacados"
          />
        </motion.div>
      </div>
    </section>
  )
}
