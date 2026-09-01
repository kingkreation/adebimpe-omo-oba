import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { MusicProvider } from './components/MusicPlayer'
import { Progress } from './components/Progress'
import { birthday } from './data/birthday'
import { chapterCount, chapters, loaderDurationMs } from './data/chapters'
import { useLocalStorage } from './hooks/useLocalStorage'
import { BirthdayReveal } from './sections/BirthdayReveal'
import { BirthdaySurprise } from './sections/BirthdaySurprise'
import { BirthdayVault } from './sections/BirthdayVault'
import { CinematicLoader } from './sections/CinematicLoader'
import { DeKingQuiz } from './sections/DeKingQuiz'
import { Envelope } from './sections/Envelope'
import { FinalGift } from './sections/FinalGift'
import { FirstVoice } from './sections/FirstVoice'
import { HerWorld } from './sections/HerWorld'
import { MakeAWish } from './sections/MakeAWish'
import { MemoryLane } from './sections/MemoryLane'
import { LittleCorner } from './sections/LittleCorner'
import { MusicRoom } from './sections/MusicRoom'
import { MyPromise } from './sections/MyPromise'
import { Operation } from './sections/Operation'
import { OurStory } from './sections/OurStory'
import { TheFuture } from './sections/TheFuture'
import { TheLetter } from './sections/TheLetter'
import { WhyILoveYou } from './sections/WhyILoveYou'
import { advanceChapterFlow, flowForChapter, initialChapterFlow, isChapterFlow, retreatChapterFlow, type ChapterId, type ExperienceScene } from './utils/chapterFlow'
import { isBirthday } from './utils/birthday'

type SceneProps = { onAdvance: () => void; onBack: () => void; onNavigate: (chapter: ChapterId | undefined) => void; onRelive: () => void }
const scenes: Record<Exclude<ExperienceScene, 'loading' | 'complete'>, ComponentType<SceneProps>> = {
  envelope: ({ onAdvance }) => <Envelope onOpen={onAdvance} />, reveal: ({ onAdvance }) => <BirthdayReveal onContinue={onAdvance} />, wish: ({ onAdvance }) => <MakeAWish onComplete={onAdvance} />,
  herWorld: ({ onAdvance, onBack }) => <HerWorld onAdvance={onAdvance} onBack={onBack} />, ourStory: ({ onAdvance, onBack }) => <OurStory onAdvance={onAdvance} onBack={onBack} />, firstVoice: ({ onAdvance, onBack }) => <FirstVoice onAdvance={onAdvance} onBack={onBack} />, operation: ({ onAdvance, onBack }) => <Operation onAdvance={onAdvance} onBack={onBack} />,
  memoryLane: ({ onAdvance, onBack }) => <MemoryLane onAdvance={onAdvance} onBack={onBack} />, birthdaySurprise: ({ onAdvance, onBack }) => <BirthdaySurprise onAdvance={onAdvance} onBack={onBack} />, whyILoveYou: ({ onAdvance, onBack }) => <WhyILoveYou onAdvance={onAdvance} onBack={onBack} />, deKingQuiz: ({ onAdvance, onBack }) => <DeKingQuiz onAdvance={onAdvance} onBack={onBack} />,
  musicRoom: ({ onBack, onNavigate }) => <MusicRoom onBack={onBack} onReadLetter={() => onNavigate('letter')} />, letter: ({ onAdvance, onBack }) => <TheLetter onAdvance={onAdvance} onBack={onBack} />, future: ({ onAdvance, onBack }) => <TheFuture onAdvance={onAdvance} onBack={onBack} />, promise: ({ onAdvance, onBack }) => <MyPromise onAdvance={onAdvance} onBack={onBack} />, finalGift: ({ onAdvance, onBack }) => <FinalGift onAdvance={onAdvance} onBack={onBack} />, birthdayVault: ({ onAdvance, onBack, onNavigate }) => <BirthdayVault onAdvance={onAdvance} onBack={onBack} onNavigate={onNavigate} />, littleCorner: ({ onAdvance, onBack, onNavigate, onRelive }) => <LittleCorner onAdvance={onAdvance} onBack={onBack} onNavigate={(chapter) => onNavigate(chapter)} onRelive={onRelive} />,
}
export function App() {
  const [experienceStarted, setStarted] = useLocalStorage('adebimpe.experienceStarted', false)
  const [savedFlow, setSavedFlow] = useLocalStorage<unknown>('adebimpe.currentFlow', null)
  const [flow, setFlow] = useState(() => isChapterFlow(savedFlow) ? savedFlow : experienceStarted ? flowForChapter('littleCorner') : initialChapterFlow)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const transitionLockRef = useRef(false)
  const transitionTimerRef = useRef<number | undefined>(undefined)
  const chapter = chapters[flow.chapterId]
  const birthdayMode = isBirthday(birthday.date)

  const runTransition = useCallback((transition: () => void) => {
    if (transitionLockRef.current) return
    transitionLockRef.current = true
    setIsTransitioning(true)
    transition()
    window.clearTimeout(transitionTimerRef.current)
    transitionTimerRef.current = window.setTimeout(() => {
      transitionLockRef.current = false
      setIsTransitioning(false)
    }, 500)
  }, [])

  const onAdvance = useCallback(() => runTransition(() => { setStarted(true); setFlow((current) => advanceChapterFlow(current)) }), [runTransition, setStarted])
  const onRelive = useCallback(() => runTransition(() => setFlow(initialChapterFlow)), [runTransition])
  const onBack = useCallback(() => runTransition(() => setFlow((current) => retreatChapterFlow(current))), [runTransition])
  const onNavigate = useCallback((chapterId: ChapterId | undefined) => { if (chapterId) runTransition(() => setFlow(flowForChapter(chapterId))) }, [runTransition])

  useEffect(() => { setSavedFlow(flow) }, [flow, setSavedFlow])
  useEffect(() => () => window.clearTimeout(transitionTimerRef.current), [])
  useEffect(() => { const id = requestAnimationFrame(() => stageRef.current?.focus()); return () => cancelAnimationFrame(id) }, [flow.scene])
  const Scene = flow.scene === 'loading' || flow.scene === 'complete' ? null : scenes[flow.scene]
  return <MusicProvider><div className="app-shell" data-experience-mode={birthdayMode ? 'birthday' : 'corner'}><Atmosphere /><Progress position={chapter.position} total={chapterCount} /><AnimatePresence mode="wait">
    {flow.scene === 'loading' && <CinematicLoader key="loader" durationMs={loaderDurationMs} onComplete={onAdvance} />}
    {Scene && <motion.div key={flow.scene} ref={stageRef} className={`stage${isTransitioning ? ' is-transitioning' : ''}`} tabIndex={-1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Scene onAdvance={onAdvance} onBack={onBack} onNavigate={onNavigate} onRelive={onRelive} /></motion.div>}
    {flow.scene === 'complete' && <motion.main key="complete" ref={stageRef} tabIndex={-1} className="scene soon"><p className="eyebrow">Phase 5A complete</p><h1>Your corner<br /><em>is always here.</em></h1></motion.main>}
  </AnimatePresence></div></MusicProvider>
}
