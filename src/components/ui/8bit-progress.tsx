"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant?: "default" | "retro"
  progressBg?: string
}

function Progress({
  className,
  value,
  variant = "default",
  progressBg,
  ...props
}: ProgressProps) {
  const isRetro = variant === "retro"

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative w-full overflow-hidden",
        isRetro
          ? "rounded-none border-2 p-[3px]"
          : "h-2 rounded-full bg-[var(--border)]",
        className
      )}
      style={
        isRetro
          ? { borderColor: 'var(--foreground)', background: 'var(--background-alt)' }
          : undefined
      }
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full flex-1 transition-transform duration-300 ease-linear",
          progressBg ?? (isRetro ? undefined : "bg-[var(--primary)]")
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          background: progressBg
            ? undefined
            : isRetro
              ? "repeating-linear-gradient(90deg, var(--primary) 0, var(--primary) 6px, var(--accent) 6px, var(--accent) 8px)"
              : undefined,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
