import { expect, it } from 'vitest'
import { countdownTo, isBirthdayToday, nextBirthdayOccurrence } from './countdown'
const birthday = { month: 8, day: 27 }
it('uses August 27 of the current year before the birthday', () => expect(nextBirthdayOccurrence(birthday, new Date(2026, 7, 20, 12))).toEqual(new Date(2026, 7, 27)))
it('recognizes August 27 as birthday mode', () => expect(isBirthdayToday(birthday, new Date(2026, 7, 27, 23, 59))).toBe(true))
it('uses August 27 of the following year after the birthday', () => expect(nextBirthdayOccurrence(birthday, new Date(2026, 7, 28))).toEqual(new Date(2027, 7, 27)))
it('calculates representative countdown parts', () => expect(countdownTo(new Date(2026, 7, 27, 1, 2, 3), new Date(2026, 7, 26))).toEqual({ days: 1, hours: 1, minutes: 2, seconds: 3 }))
it('handles the midnight boundary', () => expect(countdownTo(new Date(2026, 7, 27), new Date(2026, 7, 26, 23, 59, 59))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 1 }))