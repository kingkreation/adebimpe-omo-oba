import { Pause, Play, Volume2 } from 'lucide-react'
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { music } from '../data/music'

type MusicControls = { started: boolean; playing: boolean; currentTime: number; duration: number; volume: number; toggle: () => void; seek: (value: number) => void; setVolume: (value: number) => void }
const MusicContext = createContext<MusicControls | null>(null)
export const useMusic = () => { const value = useContext(MusicContext); if (!value) throw new Error('Music controls require MusicProvider'); return value }
const time = (value: number) => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null); const [started, setStarted] = useState(false); const [playing, setPlaying] = useState(false); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const [volume, setVolumeState] = useState(.7)
  useEffect(() => { const audio = audioRef.current; if (!audio) return; audio.volume = volume; const update = () => setCurrentTime(audio.currentTime); const loaded = () => setDuration(audio.duration || 0); const ended = () => setPlaying(false); audio.addEventListener('timeupdate', update); audio.addEventListener('loadedmetadata', loaded); audio.addEventListener('ended', ended); return () => { audio.removeEventListener('timeupdate', update); audio.removeEventListener('loadedmetadata', loaded); audio.removeEventListener('ended', ended) } }, [volume])
  const controls = useMemo<MusicControls>(() => ({ started, playing, currentTime, duration, volume, toggle: () => { const audio = audioRef.current; if (!audio) return; setStarted(true); if (!music.src) return; if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); else { audio.pause(); setPlaying(false) } }, seek: (value) => { const audio = audioRef.current; if (audio) audio.currentTime = value }, setVolume: (value) => { setVolumeState(value); if (audioRef.current) audioRef.current.volume = value } }), [currentTime, duration, playing, started, volume])
  return <MusicContext.Provider value={controls}><audio ref={audioRef} src={music.src || undefined} preload="metadata" />{children}{started && <aside className="mini-player" aria-label="Music player"><button onClick={controls.toggle} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? <Pause size={14} /> : <Play size={14} />}</button><span><strong>{music.title}</strong><small>{music.artist}</small></span><Volume2 size={15} /></aside>}</MusicContext.Provider>
}
export function MusicClock({ currentTime, duration }: { currentTime: number; duration: number }) { return <span>{time(currentTime)} / {duration ? time(duration) : '--:--'}</span> }