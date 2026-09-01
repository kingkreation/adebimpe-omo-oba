import type { ChapterId } from '../utils/chapterFlow'
export type VaultItem = { id: string; title: string; description: string; status: 'unlocked' | 'locked'; icon: 'story' | 'memory' | 'letter' | 'music' | 'promise' | 'future'; linkedChapter?: ChapterId; unlockCondition?: string }
export const vaultItems: readonly VaultItem[] = [
  { id: 'our-story', title: 'Our Story', description: 'The beginning: friendship, connection, and love.', status: 'unlocked', icon: 'story', linkedChapter: 'ourStory' },
  { id: 'memory-lane', title: 'Memory Lane', description: 'A little archive of the moments that became ours.', status: 'unlocked', icon: 'memory', linkedChapter: 'memoryLane' },
  { id: 'letter', title: 'The Letter', description: 'A few words, revealed with care.', status: 'unlocked', icon: 'letter', linkedChapter: 'letter' },
  { id: 'music-room', title: 'The Music Room', description: 'A private listening room for us.', status: 'unlocked', icon: 'music', linkedChapter: 'musicRoom' },
  { id: 'my-promise', title: 'My Promise', description: 'A promise worth keeping close.', status: 'unlocked', icon: 'promise', linkedChapter: 'promise' },
  { id: 'future-memory', title: 'A Future Memory', description: 'A chapter still waiting for us.', status: 'locked', icon: 'future', unlockCondition: 'Some memories are still waiting for us.' },
  { id: 'secret-message', title: 'A Secret Message', description: 'A little something for another day.', status: 'locked', icon: 'letter', unlockCondition: 'Not yet, Omo Oba.' },
  { id: 'more-memories', title: 'More memories', description: 'There is still so much left to write.', status: 'locked', icon: 'memory', unlockCondition: 'Some memories are still waiting for us.' },
] as const