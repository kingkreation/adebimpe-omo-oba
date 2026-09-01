import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { promiseLines } from '../data/messages'
export function MyPromise({ onAdvance, onBack }: { onAdvance: () => void; onBack: () => void }) {
  const [step, setStep] = useState(0); const reduceMotion = useReducedMotion(); const last = step === promiseLines.length - 1
  return <main className="scene promise-scene"><p className="eyebrow">Chapter 13 · My Promise</p><motion.h1 key={step} initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={step === 3 || last ? 'promise-emphasis' : ''}>{promiseLines[step]}</motion.h1><div className="chapter-actions"><button className="text-button compact" onClick={step === 0 ? onBack : () => setStep((value) => value - 1)}>{step === 0 ? 'Back' : 'Previous'}</button><button className="primary-button" onClick={last ? onAdvance : () => setStep((value) => value + 1)}>{last ? 'Continue' : 'Continue'}</button></div></main>
}