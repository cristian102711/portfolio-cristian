'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Project } from '@/data/projects'

interface PortfolioContextType {
  activeProject: Project | null
  setActiveProject: (project: Project | null) => void
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <PortfolioContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return ctx
}
