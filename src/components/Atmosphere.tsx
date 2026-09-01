import { motion, useReducedMotion } from 'framer-motion'

export function Atmosphere() {
  const reduceMotion = useReducedMotion()
  return <div aria-hidden="true" className="atmosphere">
    <motion.div className="glow glow-one" animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [.36, .55, .36] }} transition={{ duration: 10, repeat: Infinity }} />
    <motion.div className="glow glow-two" animate={reduceMotion ? undefined : { y: [0, -24, 0] }} transition={{ duration: 12, repeat: Infinity }} />
    <div className="film-grain" />
  </div>
}
