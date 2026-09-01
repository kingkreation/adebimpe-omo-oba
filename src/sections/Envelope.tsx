import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { LockKeyhole } from 'lucide-react'
import { firstChapter } from '../data/birthday'

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)
  const reduceMotion = useReducedMotion()
  const open = () => { if (!opening) setOpening(true) }
  return <main className="scene envelope-scene">
    <p className="eyebrow">{firstChapter.eyebrow}</p>
    <motion.button className="envelope" onClick={open} disabled={opening} aria-label="Open your birthday invitation" whileTap={opening ? undefined : { scale: .96 }}>
      <motion.span className="envelope-flap" animate={opening ? { rotateX: reduceMotion ? 0 : -115, opacity: reduceMotion ? 0 : 1 } : undefined} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }} onAnimationComplete={() => { if (opening) onOpen() }} />
      <motion.span className="envelope-seal" animate={opening ? { scale: .7, opacity: 0 } : undefined} transition={{ duration: .35 }} aria-hidden="true">AO</motion.span>
      <span className="envelope-label"><LockKeyhole size={15} /> Open when your heart is ready</span>
    </motion.button>
    <motion.p className="scene-prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>{firstChapter.invitation}</motion.p>
  </main>
}
