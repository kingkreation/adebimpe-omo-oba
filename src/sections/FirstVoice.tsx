import { motion, useReducedMotion } from 'framer-motion'
import { Pause, Phone, PhoneCall, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { firstVoiceMemory } from '../data/memories'
import { firstVoiceNote } from '../data/voiceNote'

function formatTime(seconds: number) {
  const wholeSeconds = Math.floor(Number.isFinite(seconds) ? seconds : 0)
  return `${String(Math.floor(wholeSeconds / 60)).padStart(2, '0')}:${String(wholeSeconds % 60).padStart(2, '0')}`
}

export function FirstVoice({ onAdvance, onBack }: { onAdvance: () => void; onBack: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [answered, setAnswered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => () => audioRef.current?.pause(), [])

  const playVoiceNote = () => {
    const audio = audioRef.current
    if (!audio) return
    setPlaybackError(false)
    void audio.play().catch(() => setPlaybackError(true))
  }

  const answer = () => {
    setAnswered(true)
    playVoiceNote()
  }

  const toggleVoiceNote = () => {
    if (isPlaying) audioRef.current?.pause()
    else playVoiceNote()
  }

  const replayVoiceNote = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    setCurrentTime(0)
    playVoiceNote()
  }

  const bars = Array.from({ length: 18 }, (_, index) => (
    <i key={index} style={{ '--height': `${20 + ((index * 17) % 53)}%`, '--delay': `${index * .06}s` } as CSSProperties} />
  ))
  const callDetail = firstVoiceMemory.isPlaceholder
    ? 'I remember that day, you mistakenly called me and I picked it, but you were not talking. You hung up to tell me it was a mistake, then I called back to have an official first call — 24/02/2026.'
    : firstVoiceMemory.detail

  return <main className="scene chapter-scene voice-scene">
    <audio
      ref={audioRef}
      src={firstVoiceNote.src}
      preload="metadata"
      onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onEnded={() => setIsPlaying(false)}
      onError={() => setPlaybackError(true)}
    />
    <p className="eyebrow">Chapter 04 · The First Voice</p>
    {!answered ? <motion.section className="phone-card incoming" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <Phone className="phone-icon" />
      <p>Your first voice note</p>
      <h1>Adebimpe <em>♥</em></h1>
      <p className="voice-note-intro">Before the memorable call, there was this: the first voice note you sent me.</p>
      <button type="button" className="answer-button" onClick={answer}><PhoneCall size={18} /> Play voice note</button>
      <button type="button" className="text-button compact" onClick={onBack}>Back</button>
    </motion.section> : <section className="phone-card active-call">
      <div className="call-header"><span>{isPlaying ? 'Playing' : 'Paused'}</span><strong>Adebimpe ♥</strong><time>{formatTime(currentTime)} / {formatTime(duration)}</time></div>
      <div className={`wave ${isPlaying && !reduceMotion ? 'is-playing' : ''}`} aria-label={isPlaying ? 'Voice note is playing' : 'Voice note is paused'}>{bars}</div>
      <p className="eyebrow">The first time I heard your voice</p>
      <h2>{firstVoiceNote.title}</h2>
      <p>{firstVoiceNote.context}</p>
      <div className="voice-note-controls">
        <button type="button" className="answer-button" onClick={toggleVoiceNote}>{isPlaying ? <Pause size={18} /> : <Play size={18} />}{isPlaying ? 'Pause voice note' : 'Play voice note'}</button>
        <button type="button" className="text-button compact" onClick={replayVoiceNote}><RotateCcw size={15} /> Replay</button>
      </div>
      {playbackError && <p className="audio-error" role="status">This audio could not play in this browser. Please try another browser or add an MP3 copy of the note.</p>}
      <div className="voice-call-memory"><p>{firstVoiceMemory.body}</p>{expanded && <div className="memory-detail"><p>{callDetail}</p></div>}</div>
      <div className="chapter-actions"><button type="button" className="text-button compact" onClick={() => setExpanded((value) => !value)}>{expanded ? 'Keep this moment' : 'Reveal the call story'}</button><button type="button" className="primary-button" onClick={onAdvance}>Continue</button></div>
    </section>}
    {answered && <p className="voice-closing">Some memories don’t need a picture. Sometimes a voice is enough.</p>}
  </main>
}