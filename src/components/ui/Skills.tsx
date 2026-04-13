'use client'

import { motion } from 'framer-motion'
import { Code2, Server, Database, Wrench, Smartphone } from 'lucide-react'

interface SkillGroup {
  category: string
  icon: React.ElementType
  gradient: string
  iconBg: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: Code2,
    gradient: 'from-violet-500 to-fuchsia-500',
    iconBg: 'bg-violet-500/15 border-violet-500/30',
    skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vue', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Langs',
    icon: Server,
    gradient: 'from-cyan-500 to-blue-500',
    iconBg: 'bg-cyan-500/15 border-cyan-500/30',
    skills: ['Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'Django', 'PHP'],
  },
  {
    category: 'Bases de Datos',
    icon: Database,
    gradient: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-500/15 border-emerald-500/30',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Firebase', 'SQL'],
  },
  {
    category: 'DevOps & Tools',
    icon: Wrench,
    gradient: 'from-orange-500 to-amber-500',
    iconBg: 'bg-orange-500/15 border-orange-500/30',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Vercel', 'Linux', 'Power BI'],
  },
  {
    category: 'Mobile & APIs',
    icon: Smartphone,
    gradient: 'from-pink-500 to-rose-500',
    iconBg: 'bg-pink-500/15 border-pink-500/30',
    skills: ['Flutter', 'Kotlin (Android)', 'Android Studio', 'REST APIs', 'OpenAI API'],
  },
]

export default function Skills() {
  return (
    <section id="stack" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm">
            Stack completo para construir productos del mundo real, desde móviles hasta sistemas distribuidos.
          </p>
        </motion.div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => {
            const Icon = group.icon
            const isLast = i === skillGroups.length - 1
            const isLastOdd = skillGroups.length % 3 !== 0 && isLast

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card p-7 flex flex-col gap-5 hover:border-white/20 hover:shadow-lg transition-all duration-300 group ${isLastOdd ? 'sm:col-span-2 lg:col-start-2 lg:col-span-1' : ''}`}
              >
                {/* Category icon */}
                <div className={`w-14 h-14 rounded-2xl border ${group.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${group.gradient} p-0.5 rounded-xl`}>
                    <div className="bg-zinc-950 rounded-xl p-2.5">
                      <Icon
                        size={22}
                        className={`bg-gradient-to-br ${group.gradient} bg-clip-text`}
                        style={{
                          color: 'transparent',
                          backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white">{group.category}</h3>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800/80 border border-white/8 text-zinc-300 hover:border-white/20 hover:text-white hover:bg-zinc-700/80 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
