import { expect, it } from 'vitest'
import { chapterCount, chapters } from './chapters'
it('contains the complete ordered twenty-part registry', () => { const positions = Object.values(chapters).map((chapter) => chapter.position); expect(chapterCount).toBe(20); expect(positions).toEqual(Array.from({ length: 20 }, (_, index) => index + 1)) })