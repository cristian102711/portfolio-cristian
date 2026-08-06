/** ────────────────────────────────────────────────────────────────
 *  SkillsUniverse — Orquestador principal de la sección 3D de Skills
 *
 *  Renderiza:
 *  - Header de la sección con título y subtítulo (Framer Motion).
 *  - Lienzo (Canvas) de React Three Fiber con la escena 3D.
 *  - Cámara ajustada para mostrar el cluster de esferas brillantes.
 * ──────────────────────────────────────────────────────────────── */

'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { Zap, RefreshCw } from 'lucide-react'
import SkillScene from './SkillScene'

/** Indicador de carga dentro del área del lienzo */
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
    </div>
  )
}

export default function SkillsUniverse() {
  const [blastTrigger, setBlastTrigger] = useState(0)

  const handleBlast = () => {
    setBlastTrigger((prev) => prev + 1)
  }

  return (
    <section id="stack" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ── Encabezado de la Sección ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-xs uppercase tracking-[6px] text-violet-400 font-medium">
            Tecnologías
          </span>
          <h2 className="mt-3 text-4xl lg:text-6xl font-bold tracking-tight">
            Tech{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Explora la interacción electromagnética: las esferas colisionan entre sí, se desordenan al mover el cursor y vuelven a ordenarse automáticamente.
          </p>
        </motion.div>

        {/* ── Controles Interactivos & Badge Explanatorio ───────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Efecto Electromagnético & Colisiones Físicas
          </div>

          <button
            onClick={handleBlast}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 shadow-md hover:shadow-violet-500/25 active:scale-95 cursor-pointer"
            title="Provocar desorden electromagnético masivo"
          >
            <Zap size={14} className="text-cyan-200 fill-cyan-200" />
            Pulso Magnético
          </button>
        </motion.div>

        {/* ── Lienzo 3D (Canvas) ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-3xl overflow-hidden"
          style={{ height: 'clamp(450px, 65vh, 750px)' }}
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
              <SkillScene blastTrigger={blastTrigger} />
            </Canvas>
          </Suspense>

          {/* Tips visuales sutiles en esquinas */}
          <div className="absolute bottom-4 right-4 pointer-events-none text-[11px] text-zinc-500 bg-zinc-950/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <RefreshCw size={12} className="animate-spin text-violet-400" />
            Auto-alineación magnética activa
          </div>
        </motion.div>
      </div>
    </section>
  )
}
