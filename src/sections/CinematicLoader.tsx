import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

export function CinematicLoader({ durationMs, onComplete }: { durationMs: number; onComplete: () => void }) {
  const reduceMotion = useReducedMotion()
  useEffect(() => { const id = window.setTimeout(onComplete, reduceMotion ? 0 : durationMs); return () => clearTimeout(id) }, [durationMs, onComplete, reduceMotion])
  return <motion.main className="loader" exit={{ opacity: 0, transition: { duration: .7 } }} aria-label="Preparing your birthday experience">
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>A private world for</motion.p>
    <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55, duration: .8 }}>Adebimpe<br /><em>Omo Oba</em></motion.h1>
    <motion.div className="loader-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .9, duration: 1.6 }} />
  </motion.main>
}
