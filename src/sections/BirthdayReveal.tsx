import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { birthday, firstChapter } from '../data/birthday'

export function BirthdayReveal({ onContinue }: { onContinue: () => void }) {
  return <main className="scene reveal-scene">
    <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{firstChapter.reveal}</motion.p>
    <motion.h1 className="birthday-title" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .9 }}>
      Happy Birthday<br /><em>{birthday.title}</em>
    </motion.h1>
    <motion.p className="signed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}>With love, {birthday.creator}</motion.p>
    <motion.button className="text-button" onClick={onContinue} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
      One more thing <ArrowDown size={16} />
    </motion.button>
  </main>
}
