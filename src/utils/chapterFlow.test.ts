import { expect, it } from 'vitest'
import { advanceChapterFlow, initialChapterFlow, isChapterFlow } from './chapterFlow'

it('advances the first chapter scenes in order', () => {
  const envelope = advanceChapterFlow(initialChapterFlow)
  const reveal = advanceChapterFlow(envelope)
  expect(envelope.scene).toBe('envelope')
  expect(reveal.scene).toBe('reveal')
})

it('moves from the birthday opening into Her World', () => {
  const afterWish = advanceChapterFlow({ chapterId: 'birthdayOpening', scene: 'wish' })
  expect(afterWish).toEqual({ chapterId: 'herWorld', scene: 'herWorld' })
})

it('moves from Operation into Memory Lane', () => {
  expect(advanceChapterFlow({ chapterId: 'operation', scene: 'operation' })).toEqual({ chapterId: 'memoryLane', scene: 'memoryLane' })
})
it('moves from the quiz into the Music Room', () => {
  expect(advanceChapterFlow({ chapterId: 'deKingQuiz', scene: 'deKingQuiz' })).toEqual({ chapterId: 'musicRoom', scene: 'musicRoom' })
})
it('moves from the Music Room into the Letter', () => {
  expect(advanceChapterFlow({ chapterId: 'musicRoom', scene: 'musicRoom' })).toEqual({ chapterId: 'letter', scene: 'letter' })
})
it('moves from My Promise into the Final Gift and then the Vault', () => {
  const gift = advanceChapterFlow({ chapterId: 'promise', scene: 'promise' })
  expect(gift).toEqual({ chapterId: 'finalGift', scene: 'finalGift' })
  expect(advanceChapterFlow(gift)).toEqual({ chapterId: 'birthdayVault', scene: 'birthdayVault' })
})
it('moves from the Vault into Adebimpe’s Little Corner', () => {
  expect(advanceChapterFlow({ chapterId: 'birthdayVault', scene: 'birthdayVault' })).toEqual({ chapterId: 'littleCorner', scene: 'littleCorner' })
})

it('accepts only valid saved chapter flows for refresh recovery', () => {
  expect(isChapterFlow({ chapterId: 'operation', scene: 'operation' })).toBe(true)
  expect(isChapterFlow({ chapterId: 'operation', scene: 'memoryLane' })).toBe(false)
  expect(isChapterFlow({ chapterId: 'unknown', scene: 'unknown' })).toBe(false)
})
