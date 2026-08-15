'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Home,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Cpu,
  Mail,
  Download,
  Sun,
  Moon,
} from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import { cn } from '@/lib/utils'

type Item = {
  id: string
  label: string
  group: string
  icon: ReactNode
  hint?: string
  keywords?: string
  run: () => void
}

const GROUP_ORDER = ['Navegación', 'Acciones', 'Enlaces', 'Tema']

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  const go = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      close()
    },
    [close],
  )

  const openLink = useCallback(
    (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer')
      close()
    },
    [close],
  )

  const downloadCV = useCallback(() => {
    const a = document.createElement('a')
    a.href = '/cv/CV_Cristianvelasquez.pdf'
    a.download = 'CV_Cristianvelasquez.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    close()
  }, [close])

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    close()
  }, [resolvedTheme, setTheme, close])

  const items: Item[] = useMemo(
    () => [
      { id: 'hero', group: 'Navegación', label: 'Inicio', icon: <Home size={16} />, keywords: 'home top arriba', run: () => go('hero') },
      { id: 'about', group: 'Navegación', label: 'Sobre Mí', icon: <User size={16} />, keywords: 'about perfil bio tarjeta', run: () => go('about') },
      { id: 'projects', group: 'Navegación', label: 'Proyectos', icon: <FolderGit2 size={16} />, keywords: 'projects trabajos apps', run: () => go('projects') },
      { id: 'experience', group: 'Navegación', label: 'Experiencia', icon: <Briefcase size={16} />, keywords: 'trayectoria trabajo empleo', run: () => go('experience') },
      { id: 'education', group: 'Navegación', label: 'Formación', icon: <GraduationCap size={16} />, keywords: 'educacion estudios duoc', run: () => go('education') },
      { id: 'stack', group: 'Navegación', label: 'Skills', icon: <Cpu size={16} />, keywords: 'tecnologias stack habilidades', run: () => go('stack') },
      { id: 'contact', group: 'Navegación', label: 'Contacto', icon: <Mail size={16} />, keywords: 'contact email mensaje', run: () => go('contact') },
      { id: 'cv', group: 'Acciones', label: 'Descargar CV', icon: <Download size={16} />, hint: 'PDF', keywords: 'curriculum resume hoja de vida', run: downloadCV },
      {
        id: 'theme',
        group: 'Tema',
        label: mounted && resolvedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
        icon: mounted && resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        keywords: 'tema dark light claro oscuro',
        run: toggleTheme,
      },
      { id: 'github', group: 'Enlaces', label: 'GitHub', icon: <FiGithub size={15} />, hint: '↗', keywords: 'repos codigo source', run: () => openLink('https://github.com/cristian102711') },
      { id: 'linkedin', group: 'Enlaces', label: 'LinkedIn', icon: <FaLinkedinIn size={15} />, hint: '↗', keywords: 'red profesional', run: () => openLink('https://www.linkedin.com/in/cristian-carlos-velasquez-cornejo') },
      { id: 'email', group: 'Enlaces', label: 'Enviar email', icon: <Mail size={16} />, hint: '↗', keywords: 'correo mail contacto', run: () => openLink('mailto:cris.velasquezc@duocuc.cl') },
    ],
    [go, openLink, downloadCV, toggleTheme, mounted, resolvedTheme],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => (i.label + ' ' + (i.keywords ?? '')).toLowerCase().includes(q))
  }, [items, query])

  // Orden agrupado para la vista; el índice de teclado sigue este mismo orden
  const groups = GROUP_ORDER.map((g) => ({ group: g, items: filtered.filter((i) => i.group === g) })).filter(
    (g) => g.items.length > 0,
  )
  const flat = groups.flatMap((g) => g.items)

  useEffect(() => setActive(0), [query])

  // Atajo global ⌘K / Ctrl+K + evento personalizado para abrir desde el navbar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpenEvent = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-cmdk', onOpenEvent as EventListener)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-cmdk', onOpenEvent as EventListener)
    }
  }, [])

  // Foco al input y bloqueo de scroll de fondo mientras está abierto
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 20)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [open])

  // Mantener el item activo visible
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onListKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, flat.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      flat[active]?.run()
    }
  }

  let runningIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] lg:[cursor:auto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menú de comandos"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

            {/* Buscador */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search size={17} className="shrink-0 text-slate-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar sección, acción o enlace…"
                className="w-full bg-transparent py-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                aria-label="Buscar comando"
              />
              <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 sm:block">
                ESC
              </kbd>
            </div>

            {/* Lista */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {flat.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-slate-500">Sin resultados para “{query}”.</p>
              )}
              {groups.map(({ group, items: gItems }) => (
                <div key={group} className="mb-1.5 last:mb-0">
                  <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">{group}</p>
                  {gItems.map((item) => {
                    runningIndex += 1
                    const idx = runningIndex
                    const isActive = idx === active
                    return (
                      <button
                        key={item.id}
                        data-idx={idx}
                        onMouseMove={() => setActive(idx)}
                        onClick={item.run}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                          isActive ? 'bg-emerald-500/15 text-white' : 'text-slate-300 hover:bg-white/5',
                        )}
                      >
                        <span className={cn('shrink-0', isActive ? 'text-emerald-400' : 'text-slate-500')}>
                          {item.icon}
                        </span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && <span className="font-mono text-[11px] text-slate-500">{item.hint}</span>}
                        {isActive && <CornerDownLeft size={13} className="text-emerald-400/80" />}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Pie con atajos */}
            <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-2.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowUp size={11} />
                  <ArrowDown size={11} /> navegar
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={11} /> seleccionar
                </span>
              </div>
              <span className="font-mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
