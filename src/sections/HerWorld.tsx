import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Crown, X } from 'lucide-react'
import { useState } from 'react'
import { herWorldCards } from '../data/messages'

export function HerWorld({ onAdvance, onBack }: { onAdvance: () => void; onBack: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null); const reduceMotion = useReducedMotion()
  const selected = herWorldCards.find((card) => card.id === selectedId)
  return <main className="scene chapter-scene her-world"><p className="eyebrow">Chapter 02 · Her World</p><h1>Before I tell you about us…<br /><em>I want to celebrate you.</em></h1><p className="chapter-lead">Open each little chamber, my love.</p>
    <div className="chamber-grid" aria-label="Five things to celebrate about Adebimpe">{herWorldCards.map((card, index) => <motion.button key={card.id} className={`chamber ${card.id === 'omo-oba' ? 'chamber-crown' : ''}`} onClick={() => setSelectedId(card.id)} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}>
      {card.id === 'omo-oba' && <Crown size={18} />}<span>{String(index + 1).padStart(2, '0')}</span><strong>{card.title}</strong><small>Open</small>
    </motion.button>)}</div>
    <div className="chapter-actions"><button className="text-button compact" onClick={onBack}>Back</button><button className="primary-button" onClick={onAdvance}>Continue our story</button></div>
    <AnimatePresence>{selected && <motion.div className="card-dialog-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)}><motion.section className="card-dialog" role="dialog" aria-modal="true" aria-labelledby="card-title" initial={reduceMotion ? false : { opacity: 0, scale: .95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} onClick={(event) => event.stopPropagation()}>
      <button autoFocus className="dialog-close" onClick={() => setSelectedId(null)} aria-label="Close card"><X /></button>{selected.id === 'omo-oba' && <Crown className="dialog-crown" />}<p className="eyebrow">For Adebimpe</p><h2 id="card-title">{selected.title}</h2><p>{selected.message}</p><button className="text-button compact" onClick={() => setSelectedId(null)}>Close</button>
    </motion.section></motion.div>}</AnimatePresence>
  </main>
}
