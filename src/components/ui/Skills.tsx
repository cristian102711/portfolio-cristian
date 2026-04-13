'use client'

import { motion } from 'framer-motion'
import {
  SiSpringboot, SiFlutter, SiFirebase,
  SiMysql, SiPostgresql, SiSqlite, SiMongodb,
  SiWordpress, SiNextdotjs, SiTypescript, SiPhp,
  SiAndroid, SiGit, SiDocker, SiVercel, SiLinux,
  SiReact, SiPython, SiNodedotjs, SiTailwindcss, SiVuedotjs, SiDjango, SiOpenai,
  SiJavascript, SiHtml5, SiCss, SiExpress, SiKotlin, SiGithub, SiGithubactions
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { Database, Network, BarChart } from 'lucide-react'
import { skillGroups } from '@/data/projects'

// Map tech names to react-icons components + brand color
const iconMap: Record<string, { icon: any; color: string }> = {
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
  JavaScript:  { icon: SiJavascript, color: '#F7DF1E' },
  HTML5:       { icon: SiHtml5,      color: '#E34F26' },
  CSS3:        { icon: SiCss,        color: '#1572B6' },
  Express:     { icon: SiExpress,    color: '#ffffff' },
  Kotlin:      { icon: SiKotlin,     color: '#7F52FF' },
  PowerBI:     { icon: BarChart,     color: '#F2C811' },
  GitHub:      { icon: SiGithub,     color: '#ffffff' },
  GitHubActions:{ icon: SiGithubactions,color: '#2088FF' },
  DataSQL:     { icon: Database,     color: '#4479A1' },
  RestAPI:     { icon: Network,      color: '#0ea5e9' },
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
              <p className="text-xs text-zinc-500 uppercase tracking-[3px] mb-4 font-medium pl-4 lg:pl-0">
                {group.category}
              </p>
              <div className="relative flex overflow-hidden w-full group/marquee [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div 
                  className={`flex shrink-0 gap-4 animate-marquee hover:[animation-play-state:paused] w-max py-4 ${gi % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                  style={{ animationDirection: gi % 2 !== 0 ? 'reverse' : 'normal' }}
                >
                  {[...group.skills, ...group.skills, ...group.skills, ...group.skills].map((skillKey, si) => {
                    const entry = iconMap[skillKey]
                    if (!entry) return null
                    const { icon: Icon, color } = entry
                    return (
                      <div
                        key={`${skillKey}-${si}`}
                        className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm hover:border-white/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300 min-w-[90px] cursor-pointer"
                        style={{ boxShadow: '0 0 0 0 transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 22px 2px ${color}30`}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 0 transparent'}
                      >
                        <Icon
                          size={32}
                          style={{ color }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="text-xs text-zinc-400 group-hover:text-white transition-colors font-medium text-center leading-tight">
                          {skillKey === 'SpringBoot' ? 'Spring Boot'
                            : skillKey === 'NextJs' ? 'Next.js'
                            : skillKey === 'GitHubActions' ? 'GitHub Actions'
                            : skillKey === 'DataSQL' ? 'SQL Data'
                            : skillKey === 'RestAPI' ? 'REST APIs'
                            : skillKey === 'PowerBI' ? 'Power BI'
                            : skillKey}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
