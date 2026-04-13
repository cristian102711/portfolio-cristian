'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, MapPin, Mail } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Photo + identity ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            {/* Profile photo */}
            <div className="relative w-48 h-48 lg:w-56 lg:h-56">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-500 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-zinc-950" />
              </div>
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-zinc-800 border-2 border-violet-500/30">
                <Image
                  src="/images/profile.jpg"
                  alt="Cristian Velásquez — Analista Programador"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    // Fallback to initials avatar if no photo yet
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Fallback avatar */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-900 to-fuchsia-900">
                  <span className="text-5xl font-black text-white/90 select-none tracking-tighter">
                    CV
                  </span>
                </div>
              </div>
              {/* Status dot */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-zinc-950 animate-pulse z-10" />
            </div>

            {/* Name + title */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Cristian Velásquez
              </h2>
              <p className="mt-1 text-violet-300 font-medium">
                Analista Programador · Full Stack Developer
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> Chile
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} />
                  <span>cristian102711</span>
                </span>
              </div>
            </div>

            {/* About text */}
            <div className="space-y-4 text-zinc-400 leading-relaxed text-sm lg:text-base">
              <p>
                Soy{' '}
                <span className="text-white font-medium">Analista Programador en formación en Duoc UC</span>,
                con experiencia real desarrollando productos Full Stack en entornos de producción.
                Construyo desde cero sistemas web complejos con{' '}
                <span className="text-violet-300 font-medium">Next.js, React, Node.js, Java y Flutter</span>,
                integrando autenticación, bases de datos y despliegue continuo.
              </p>
              <p>
                Me adapto rápido a nuevos stacks, aprendo de forma autónoma y disfruto el trabajo colaborativo
                con equipos técnicos. Mi objetivo es crear{' '}
                <span className="text-cyan-400 font-medium">sistemas escalables, modulares y seguros</span>{' '}
                que generen impacto real en el negocio y en los usuarios.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {[
                { label: 'Proyectos Completados', value: '10+' },
                { label: 'Apps publicadas',        value: '3' },
                { label: 'Tecnologías dominadas',  value: '8+' },
                { label: 'Disponibilidad',          value: 'Full-time' },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 flex flex-col gap-1">
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-500">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CV Download */}
            <motion.a
              href="/cv/CV_Cristianvelasquez.pdf"
              download
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm w-full justify-center hover:shadow-lg hover:shadow-violet-500/30 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={16} />
              Descargar CV en PDF
            </motion.a>
          </motion.div>

          {/* ── Right: Quick skill preview ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[4px] text-violet-400 font-medium">
                Sobre Mí
              </span>
              <h3 className="mt-3 text-4xl font-bold tracking-tight leading-tight">
                Apasionado por{' '}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  construir
                </span>{' '}
                cosas que importan
              </h3>
            </div>

            {/* Strengths list */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Frontend Moderno',            desc: 'Next.js · React · TypeScript', pct: 90 },
                { label: 'Backend & APIs REST',         desc: 'Node.js · Django · JWT', pct: 85 },
                { label: 'Bases de Datos',              desc: 'MongoDB · PostgreSQL · Prisma', pct: 85 },
                { label: 'DevOps & Deployments',        desc: 'Vercel · Docker · CI/CD', pct: 80 },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-violet-400">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
