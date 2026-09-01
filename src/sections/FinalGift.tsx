import { motion, useReducedMotion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { useState } from 'react'
const beats = ['You’ve made it this far.', 'Through the memories.', 'The calls.', 'The laughter.', 'The late nights.', 'The distance.', 'And everything in between.', 'But I made one more thing for you.', 'Something you can keep.', 'This is your little corner of my world.']
export function FinalGift({ onAdvance, onBack }: { onAdvance: () => void; onBack: () => void }) {
  const [step, setStep] = useState(0); const reduceMotion = useReducedMotion(); const last = step === beats.length - 1
  return <main className="scene final-gift-scene"><p className="eyebrow">Chapter 14 · The Final Gift</p><motion.section key={step} className="gift-reveal" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><Gift className={last ? 'gift-open' : ''} /><h1 className={last ? 'gift-final-line' : ''}>{beats[step]}</h1><div className="chapter-actions"><button className="text-button compact" onClick={step === 0 ? onBack : () => setStep((value) => value - 1)}>{step === 0 ? 'Back' : 'Previous'}</button><button className="primary-button" onClick={last ? onAdvance : () => setStep((value) => value + 1)}>{last ? 'Open your vault' : 'Continue'}</button></div></motion.section></main>
}