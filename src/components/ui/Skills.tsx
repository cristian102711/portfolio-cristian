/** ────────────────────────────────────────────────────────────────
 *  Skills — Contenedor del lado del cliente que renderiza el 3D SkillsUniverse.
 *  Usa importación dinámica con ssr:false de forma interna debido a que
 *  Three.js requiere APIs del navegador (WebGL, Canvas).
 *  Mantiene el id="stack" para el scroll del navbar.
 * ──────────────────────────────────────────────────────────────── */

'use client'

import dynamic from 'next/dynamic'

const SkillsUniverse = dynamic(
  () => import('@/components/skills-universe/SkillsUniverse'),
  { ssr: false }
)

export default function Skills() {
  return <SkillsUniverse />
}
