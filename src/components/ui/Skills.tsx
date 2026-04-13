'use client'

import { motion } from 'framer-motion'
import {
  SiSpringboot, SiFlutter, SiFirebase,
  SiMysql, SiPostgresql, SiSqlite, SiMongodb,
  SiWordpress, SiNextdotjs, SiTypescript, SiPhp,
  SiAndroid, SiGit, SiDocker, SiVercel, SiLinux,
  SiReact, SiPython, SiNodedotjs, SiTailwindcss, SiVuedotjs, SiDjango, SiOpenai
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { skillGroups } from '@/data/projects'

// Map tech names to react-icons components + brand color
const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  Java:        { icon: FaJava,       color: '#f89820' },
  SpringBoot:  { icon: SiSpringboot, color: '#6DB33F' },
  Flutter:     { icon: SiFlutter,    color: '#54C5F8' },
  Firebase:    { icon: SiFirebase,   color: '#FFCA28' },
  MySQL:       { icon: SiMysql,      color: '#4479A1' },
  PostgreSQL:  { icon: SiPostgresql, color: '#336791' },
  SQLite:      { icon: SiSqlite,     color: '#0F80CC' },
  MongoDB:     { icon: SiMongodb,    color: '#47A248' },
  WordPress:   { icon: SiWordpress,  color: '#21759B' },
  NextJs:      { icon: SiNextdotjs,  color: '#ffffff' },
  TypeScript:  { icon: SiTypescript, color: '#3178C6' },
  PHP:         { icon: SiPhp,        color: '#777BB4' },
  Android:     { icon: SiAndroid,    color: '#3DDC84' },
  Git:         { icon: SiGit,        color: '#F05032' },
  Docker:      { icon: SiDocker,     color: '#2496ED' },
  Vercel:      { icon: SiVercel,     color: '#ffffff' },
  Linux:       { icon: SiLinux,      color: '#FCC624' },
  React:       { icon: SiReact,      color: '#61DAFB' },
  Python:      { icon: SiPython,     color: '#3776AB' },
  NodeJs:      { icon: SiNodedotjs,  color: '#339933' },
  Tailwind:    { icon: SiTailwindcss,color: '#06B6D4' },
  Vue:         { icon: SiVuedotjs,   color: '#4FC08D' },
  Django:      { icon: SiDjango,     color: '#092E20' },
  OpenAI:      { icon: SiOpenai,     color: '#ffffff' },
}

export default function Skills() {
  return (
    <section id="stack" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[4px] text-violet-400 font-medium">
            Tecnologías
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight">
            Habilidades{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Técnicas
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.08 }}
            >
              <p className="text-xs text-zinc-500 uppercase tracking-[3px] mb-4 font-medium">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-4">
                {group.skills.map((skillKey, si) => {
                  const entry = iconMap[skillKey]
                  if (!entry) return null
                  const { icon: Icon, color } = entry
                  return (
                    <motion.div
                      key={skillKey}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + si * 0.05 }}
                      whileHover={{ scale: 1.12, y: -4 }}
                      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm hover:border-white/20 transition-all duration-300 min-w-[80px] cursor-default"
                      style={{
                        boxShadow: '0 0 0 0 transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 22px 2px ${color}30`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 0 transparent'
                      }}
                    >
                      <Icon
                        size={32}
                        style={{ color }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="text-xs text-zinc-400 group-hover:text-white transition-colors font-medium text-center leading-tight">
                        {skillKey === 'SpringBoot' ? 'Spring Boot'
                          : skillKey === 'NextJs' ? 'Next.js'
                          : skillKey}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
