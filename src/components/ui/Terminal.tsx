'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type TermLine = { kind: 'cmd' | 'out' | 'ok'; text: string }

interface TerminalProps {
  /** IMPORTANTE: pasar una referencia estable (definir fuera del componente o memoizar). */
  lines: TermLine[]
  title?: string
  className?: string
}

type Rendered = { kind: TermLine['kind']; text: string }

export default function Terminal({
  lines,
  title = 'cristian@portfolio — zsh',
  className,
}: TerminalProps) {
  const reduce = useReducedMotion()
  // Estado inicial vacío en server y cliente para evitar hydration mismatch
  const [rendered, setRendered] = useState<Rendered[]>([])
  const [done, setDone] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sin animación: mostrar todo de una (respeta prefers-reduced-motion)
    if (reduce) {
      setRendered(lines.map((l) => ({ ...l })))
      setDone(true)
      return
    }

    let cancelled = false
    const timers: number[] = []
    let li = 0
    setRendered([])
    setDone(false)

    const push = (line: Rendered) => setRendered((prev) => [...prev, line])
    const patchLast = (text: string) =>
      setRendered((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = { ...copy[copy.length - 1], text }
        return copy
      })

    const runLine = () => {
      if (cancelled) return
      if (li >= lines.length) {
        setDone(true)
        return
      }
      const line = lines[li]
      push({ kind: line.kind, text: '' })

      if (line.kind === 'cmd') {
        let ci = 0
        const typeChar = () => {
          if (cancelled) return
          ci += 1
          patchLast(line.text.slice(0, ci))
          if (ci < line.text.length) {
            timers.push(window.setTimeout(typeChar, 30 + Math.random() * 28))
          } else {
            li += 1
            timers.push(window.setTimeout(runLine, 340))
          }
        }
        timers.push(window.setTimeout(typeChar, 120))
      } else {
        // Salida de comando: aparece completa tras una pausa breve
        patchLast(line.text)
        li += 1
        timers.push(window.setTimeout(runLine, 240))
      }
    }

    timers.push(window.setTimeout(runLine, 450))
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [lines, reduce])

  // Auto-scroll del cuerpo mientras se escribe
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [rendered])

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/85 backdrop-blur-md shadow-2xl shadow-black/50',
        className,
      )}
      role="img"
      aria-label="Terminal con la información del desarrollador"
    >
      {/* Glow emerald sutil en el borde superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      {/* Barra de título estilo macOS */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
        </div>
        <span className="flex-1 text-center text-[11px] font-mono text-slate-500 tracking-wide">
          {title}
        </span>
        <span className="w-[52px]" aria-hidden />
      </div>

      {/* Cuerpo */}
      <div
        ref={bodyRef}
        className="min-h-[228px] max-h-[280px] overflow-hidden px-4 py-4 font-mono text-[12.5px] sm:text-[13px] leading-6"
      >
        {rendered.map((l, i) => {
          const isLast = i === rendered.length - 1
          return (
            <div key={i} className="flex items-start gap-2">
              {l.kind === 'cmd' && (
                <span className="select-none text-emerald-400">❯</span>
              )}
              {l.kind === 'ok' && (
                <span className="select-none text-emerald-400">●</span>
              )}
              {l.kind === 'out' && <span className="w-[9px] shrink-0 select-none" />}
              <span
                className={cn(
                  'whitespace-pre-wrap break-words',
                  l.kind === 'cmd' && 'text-slate-100',
                  l.kind === 'ok' && 'text-emerald-300 font-semibold',
                  l.kind === 'out' && 'text-slate-400',
                )}
              >
                {l.text}
                {!done && isLast && l.kind === 'cmd' && (
                  <span className="ml-0.5 -mb-0.5 inline-block h-[15px] w-[7px] bg-emerald-400 align-middle animate-blink" />
                )}
              </span>
            </div>
          )
        })}

        {/* Prompt inactivo con cursor cuando termina */}
        {done && (
          <div className="flex items-center gap-2">
            <span className="select-none text-emerald-400">❯</span>
            <span className="inline-block h-[15px] w-[7px] bg-emerald-400 animate-blink" />
          </div>
        )}
      </div>
    </div>
  )
}
