import { useReducedMotion } from 'framer-motion'
import { type CSSProperties } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'
import { music } from '../data/music'
import { MusicClock, useMusic } from '../components/MusicPlayer'
type MusicRoomProps = {
  onBack: () => void
  onReadLetter: () => void
}

export function MusicRoom({ onBack, onReadLetter }: MusicRoomProps) {
  const player = useMusic(); const reduceMotion = useReducedMotion(); const duration = player.duration || 1
  return <main className="scene chapter-scene music-scene"><p className="eyebrow">Chapter 10 · The Music Room</p><section className="listening-room"><div className="album-placeholder">{music.coverImage ? <img src={music.coverImage} alt="Song cover" /> : <span>For<br />Us</span>}</div><p className="eyebrow">A private listening room</p><h1>{music.title}</h1><p>{music.artist}</p><div className={`music-wave ${player.playing && !reduceMotion ? 'is-playing' : ''}`} aria-hidden="true">{Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--wave-delay': `${index * .05}s` } as CSSProperties} />)}</div><button type="button" className="music-toggle" onClick={player.toggle} aria-label={player.playing ? 'Pause music' : 'Play music'}>{player.playing ? <Pause /> : <Play />} {player.playing ? 'Pause' : 'Play'}</button><div className="music-controls"><MusicClock currentTime={player.currentTime} duration={player.duration} /><input aria-label="Music progress" type="range" min="0" max={duration} step=".1" value={Math.min(player.currentTime, duration)} onChange={(event) => player.seek(Number(event.target.value))} /><label><Volume2 size={15} /><input aria-label="Music volume" type="range" min="0" max="1" step=".05" value={player.volume} onChange={(event) => player.setVolume(Number(event.target.value))} /></label></div><div className="music-reflection"><strong>This song reminds me of…</strong><p>{music.reflection}</p></div><div className="chapter-actions"><button type="button" className="text-button compact" onClick={onBack}>Back</button><button type="button" className="primary-button" onClick={onReadLetter}>Read my letter</button></div></section></main>
}