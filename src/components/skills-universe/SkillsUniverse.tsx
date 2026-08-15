/** ────────────────────────────────────────────────────────────────
 *  SkillsUniverse — Orquestador principal de la sección 3D de Skills
 *
 *  Renderiza:
 *  - Header de la sección con título y subtítulo (Framer Motion).
 *  - Lienzo (Canvas) de React Three Fiber con la escena 3D limpia.
 * ──────────────────────────────────────────────────────────────── */

'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import SkillScene from './SkillScene'

/** Indicador de carga dentro del área del lienzo */
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
    </div>
  )
}

export default function SkillsUniverse() {
  const [isMouseOver, setIsMouseOver] = useState(false)

  return (
    <section id="stack" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ── Encabezado de la Sección ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-xs uppercase tracking-[6px] text-emerald-500 dark:text-emerald-400 font-bold">
            Tecnologías
          </span>
          <h2 className="mt-3 text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Tech{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Explora las tecnologías que uso cada día para construir productos digitales.
          </p>
        </motion.div>

        {/* ── Lienzo 3D (Canvas) Transparente Sin Bordes ──────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full overflow-hidden"
          style={{ height: 'clamp(450px, 65vh, 750px)' }}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
          onPointerEnter={() => setIsMouseOver(true)}
          onPointerLeave={() => setIsMouseOver(false)}
          onMouseMove={() => setIsMouseOver(true)}
          onPointerMove={() => setIsMouseOver(true)}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Canvas
              camera={{
                position: [0, 0, 10],
                fov: 55,
                near: 0.1,
                far: 100,
              }}
              dpr={[1, 1.5]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                toneMapping: 3,    // ACESFilmicToneMapping
                toneMappingExposure: 1.1,
              }}
              style={{ background: 'transparent' }}
            >
              <SkillScene isMouseOver={isMouseOver} />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
