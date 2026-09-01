import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ourStoryBeats } from '../data/messages'

export function OurStory({ onAdvance, onBack }: { onAdvance: () => void; onBack: () => void }) {
  const [beat, setBeat] = useState(0); const [isChangingBeat, setIsChangingBeat] = useState(false); const beatLockRef = useRef(false); const beatTimerRef = useRef<number | undefined>(undefined); const reduceMotion = useReducedMotion(); const isLast = beat >= ourStoryBeats.length - 1
  useEffect(() => () => window.clearTimeout(beatTimerRef.current), [])
  const moveBeat = (direction: 1 | -1) => {
    if (beatLockRef.current) return
    beatLockRef.current = true
    setIsChangingBeat(true)
    setBeat((value) => Math.max(0, Math.min(ourStoryBeats.length - 1, value + direction)))
    window.clearTimeout(beatTimerRef.current)
    beatTimerRef.current = window.setTimeout(() => { beatLockRef.current = false; setIsChangingBeat(false) }, reduceMotion ? 0 : 350)
  }
  return <main className="scene chapter-scene story-scene"><p className="eyebrow">Chapter 03 · Our Story</p><h1>We met <em>online.</em></h1><div className="connection-map" aria-label="De King and Adebimpe growing closer"><motion.i className="connection-line" animate={{ scaleX: .15 + beat * .15 }} transition={{ duration: reduceMotion ? 0 : .7 }} /><motion.span className="person-point king-point" animate={{ x: beat * 18 }}><b>DK</b><small>De King</small></motion.span><motion.span className="person-point omo-point" animate={{ x: beat * -18 }}><b>AO</b><small>Adebimpe</small></motion.span></div>
    <motion.p key={beat} className="story-beat" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>{ourStoryBeats[beat]}</motion.p>
    <div className="chapter-actions"><button type="button" className="text-button compact" disabled={isChangingBeat} onClick={beat === 0 ? onBack : () => moveBeat(-1)}>{beat === 0 ? 'Back' : 'Previous'}</button><button type="button" className="primary-button" disabled={isChangingBeat} onClick={isLast ? onAdvance : () => moveBeat(1)}>{isLast ? 'Hear the next part' : 'Continue'}</button></div>
  </main>
}
