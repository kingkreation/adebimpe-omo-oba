import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { birthday, firstChapter } from '../data/birthday'

const HOLD_MS = 1800
export function MakeAWish({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0); const [done, setDone] = useState(false); const start = useRef<number | null>(null); const frame = useRef<number | undefined>(undefined)
  const stop = () => { if (!done) { start.current = null; if (frame.current) cancelAnimationFrame(frame.current); setProgress(0) } }
  const hold = (time: number) => { if (!start.current) start.current = time; const elapsed = time - start.current; const next = Math.min(elapsed / HOLD_MS, 1); setProgress(next); if (next === 1) { setDone(true); return } frame.current = requestAnimationFrame(hold) }
  const begin = () => { if (!done && start.current === null) frame.current = requestAnimationFrame(hold) }
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); begin() } }
  const onKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); stop() } }
  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current) }, [])
  return <main className="scene wish-scene">
    {!done ? <><p className="eyebrow">A small pause for a big wish</p><h1 className="wish-title">Make a wish,<br /><em>{birthday.recipient}.</em></h1><p className="wish-copy">{firstChapter.wish}</p>
      <button className="wish-button" style={{ '--progress': `${progress * 360}deg` } as CSSProperties} onPointerDown={begin} onPointerUp={stop} onPointerCancel={stop} onPointerLeave={stop} onKeyDown={onKeyDown} onKeyUp={onKeyUp} aria-describedby="wish-hold-help" aria-label="Hold Space or Enter, or touch and hold, to make a wish">
        <span><Sparkles size={20} /> Hold to wish</span>
      </button><p id="wish-hold-help" className="hold-help">Hold gently for a moment</p></> :
      <motion.div className="wish-complete" initial={reduceMotion ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }}><Sparkles /><p>Your wish is safe with the stars.</p><h1>May this year hold<br /><em>everything beautiful.</em></h1><button className="primary-button" onClick={onComplete}>Begin our story</button></motion.div>}
  </main>
}
