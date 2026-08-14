'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/8bit-loading-screen'

const AUTO_PROGRESS_DURATION = 2600
const HOLD_DURATION = 300

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const timer = setTimeout(() => setIsLoading(false), AUTO_PROGRESS_DURATION + HOLD_DURATION)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) document.documentElement.style.overflow = ''
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[999999]"
        >
          <LoadingScreen
            variant="fullscreen"
            title="CRISTIAN.DEV"
            autoProgress
            autoProgressDuration={AUTO_PROGRESS_DURATION}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
