export type ExperienceScene = 'loading' | 'envelope' | 'reveal' | 'wish' | 'herWorld' | 'ourStory' | 'firstVoice' | 'operation' | 'memoryLane' | 'birthdaySurprise' | 'whyILoveYou' | 'deKingQuiz' | 'musicRoom' | 'letter' | 'future' | 'promise' | 'finalGift' | 'birthdayVault' | 'littleCorner' | 'complete'
export type ChapterId = 'birthdayOpening' | 'herWorld' | 'ourStory' | 'firstVoice' | 'operation' | 'memoryLane' | 'birthdaySurprise' | 'whyILoveYou' | 'deKingQuiz' | 'musicRoom' | 'letter' | 'future' | 'promise' | 'finalGift' | 'birthdayVault' | 'littleCorner'
export type ChapterFlow = { chapterId: ChapterId; scene: ExperienceScene }
export const initialChapterFlow: ChapterFlow = { chapterId: 'birthdayOpening', scene: 'loading' }
const nextFlows: Record<ExperienceScene, ChapterFlow> = {
  loading: { chapterId: 'birthdayOpening', scene: 'envelope' }, envelope: { chapterId: 'birthdayOpening', scene: 'reveal' }, reveal: { chapterId: 'birthdayOpening', scene: 'wish' }, wish: { chapterId: 'herWorld', scene: 'herWorld' }, herWorld: { chapterId: 'ourStory', scene: 'ourStory' }, ourStory: { chapterId: 'firstVoice', scene: 'firstVoice' }, firstVoice: { chapterId: 'operation', scene: 'operation' }, operation: { chapterId: 'memoryLane', scene: 'memoryLane' }, memoryLane: { chapterId: 'birthdaySurprise', scene: 'birthdaySurprise' }, birthdaySurprise: { chapterId: 'whyILoveYou', scene: 'whyILoveYou' }, whyILoveYou: { chapterId: 'deKingQuiz', scene: 'deKingQuiz' }, deKingQuiz: { chapterId: 'musicRoom', scene: 'musicRoom' }, musicRoom: { chapterId: 'letter', scene: 'letter' }, letter: { chapterId: 'future', scene: 'future' }, future: { chapterId: 'promise', scene: 'promise' }, promise: { chapterId: 'finalGift', scene: 'finalGift' }, finalGift: { chapterId: 'birthdayVault', scene: 'birthdayVault' }, birthdayVault: { chapterId: 'littleCorner', scene: 'littleCorner' }, littleCorner: { chapterId: 'littleCorner', scene: 'complete' }, complete: { chapterId: 'littleCorner', scene: 'complete' },
}
const previousFlows: Partial<Record<ExperienceScene, ChapterFlow>> = { herWorld: { chapterId: 'birthdayOpening', scene: 'wish' }, ourStory: { chapterId: 'herWorld', scene: 'herWorld' }, firstVoice: { chapterId: 'ourStory', scene: 'ourStory' }, operation: { chapterId: 'firstVoice', scene: 'firstVoice' }, memoryLane: { chapterId: 'operation', scene: 'operation' }, birthdaySurprise: { chapterId: 'memoryLane', scene: 'memoryLane' }, whyILoveYou: { chapterId: 'birthdaySurprise', scene: 'birthdaySurprise' }, deKingQuiz: { chapterId: 'whyILoveYou', scene: 'whyILoveYou' }, musicRoom: { chapterId: 'deKingQuiz', scene: 'deKingQuiz' }, letter: { chapterId: 'musicRoom', scene: 'musicRoom' }, future: { chapterId: 'letter', scene: 'letter' }, promise: { chapterId: 'future', scene: 'future' }, finalGift: { chapterId: 'promise', scene: 'promise' }, birthdayVault: { chapterId: 'finalGift', scene: 'finalGift' }, littleCorner: { chapterId: 'birthdayVault', scene: 'birthdayVault' } }
export function advanceChapterFlow(flow: ChapterFlow): ChapterFlow { return nextFlows[flow.scene] }
export function retreatChapterFlow(flow: ChapterFlow): ChapterFlow { return previousFlows[flow.scene] ?? flow }
export function flowForChapter(chapterId: ChapterId): ChapterFlow { return { chapterId, scene: chapterId === 'birthdayOpening' ? 'envelope' : chapterId } }

export function isChapterFlow(value: unknown): value is ChapterFlow {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ChapterFlow>
  if (typeof candidate.chapterId !== 'string' || typeof candidate.scene !== 'string') return false
  if (candidate.scene === 'loading' || candidate.scene === 'envelope' || candidate.scene === 'reveal' || candidate.scene === 'wish') return candidate.chapterId === 'birthdayOpening'
  if (candidate.scene === 'complete') return candidate.chapterId === 'littleCorner'
  return candidate.chapterId === candidate.scene && candidate.scene in nextFlows
}
