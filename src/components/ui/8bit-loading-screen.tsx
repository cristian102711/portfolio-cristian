"use client"

import * as React from "react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Progress } from "@/components/ui/8bit-progress"

const DEFAULT_TIPS = [
  "Compilando creatividad...",
  "Optimizando cada pixel...",
  "Stack: React · Next.js · Node.js",
  "Presiona cualquier tecla para continuar...",
]

export interface LoadingScreenProps extends React.ComponentProps<"div"> {
  title?: string
  tips?: string[]
  progress?: number
  showPercentage?: boolean
  tipInterval?: number
  variant?: "default" | "fullscreen"
  autoProgress?: boolean
  autoProgressDuration?: number
}

export default function LoadingScreen({
  className,
  title = "LOADING",
  tips = DEFAULT_TIPS,
  progress = 0,
  showPercentage = true,
  tipInterval = 1400,
  variant = "default",
  autoProgress = false,
  autoProgressDuration = 5000,
  ...props
}: LoadingScreenProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [internalProgress, setInternalProgress] = useState(
    autoProgress ? 0 : progress
  )

  useEffect(() => {
    if (!autoProgress) return

    const step = 5
    const steps = 100 / step
    const intervalTime = autoProgressDuration / steps

    const timer = setInterval(() => {
      setInternalProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [autoProgress, autoProgressDuration])

  useEffect(() => {
    if (tips.length === 0) return

    const tipTimer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length)
    }, tipInterval)

    return () => clearInterval(tipTimer)
  }, [tips, tipInterval])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorTimer)
  }, [])

  const isFullscreen = variant === "fullscreen"
  const displayProgress = autoProgress ? internalProgress : progress

  const content = (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      {/* Title */}
      <h2 className={cn("retro text-xl md:text-2xl text-center")} style={{ color: 'var(--foreground)' }}>
        {title}
        <span
          className="ml-1 inline-block w-[0.6em]"
          style={{ opacity: showCursor ? 1 : 0, color: 'var(--primary)' }}
        >
          █
        </span>
      </h2>

      {/* Progress section */}
      <div className="w-full max-w-md space-y-2">
        {showPercentage && (
          <div className="flex justify-end">
            <span className="retro text-xs" style={{ color: 'var(--foreground-subtle)' }}>
              {Math.round(displayProgress)}%
            </span>
          </div>
        )}
        <Progress value={displayProgress} variant="retro" className="h-4" />
      </div>

      {/* Tips section */}
      {tips.length > 0 && (
        <div className="w-full max-w-md min-h-16 flex items-center justify-center">
          <p
            className="retro text-[0.625rem] md:text-xs text-center leading-relaxed animate-pulse"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {tips[currentTipIndex]}
          </p>
        </div>
      )}
    </div>
  )

  if (isFullscreen) {
    return (
      <div
        className={cn("fixed inset-0 z-50 flex items-center justify-center", className)}
        style={{ background: 'var(--background)' }}
        {...props}
      >
        <div className="w-full max-w-lg px-4">{content}</div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {content}
    </div>
  )
}
