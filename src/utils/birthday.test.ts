import { describe, expect, it } from 'vitest'
import { isBirthday, nextBirthday } from './birthday'

describe('birthday dates', () => {
  it('uses this year when the birthday has not occurred', () => expect(nextBirthday({ month: 12, day: 20 }, new Date(2026, 7, 27))).toEqual(new Date(2026, 11, 20)))
  it('moves to the next year after the birthday passes', () => expect(nextBirthday({ month: 1, day: 1 }, new Date(2026, 7, 27))).toEqual(new Date(2027, 0, 1)))
  it('recognizes the birthday date', () => expect(isBirthday({ month: 8, day: 27 }, new Date(2026, 7, 27))).toBe(true))
  it('uses the configured birthday date', async () => {
    const { birthday } = await import('../data/birthday')
    expect(birthday.date).toEqual({ month: 8, day: 27 })
    expect(isBirthday(birthday.date, new Date(2026, 7, 27))).toBe(true)
  })
})

it('keeps the permanent birthday date as August 27', async () => {
  const { birthday } = await import('../data/birthday')
  expect(birthday.date).toEqual({ month: 8, day: 27 })
})