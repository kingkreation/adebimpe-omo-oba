export type BirthdayDate = { month: number; day: number }
export type Countdown = { days: number; hours: number; minutes: number; seconds: number }
export function nextBirthdayOccurrence(date: BirthdayDate, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisYear = new Date(now.getFullYear(), date.month - 1, date.day)
  return thisYear < today ? new Date(now.getFullYear() + 1, date.month - 1, date.day) : thisYear
}
export function isBirthdayToday(date: BirthdayDate, now = new Date()) { return now.getMonth() + 1 === date.month && now.getDate() === date.day }
export function countdownTo(target: Date, now = new Date()): Countdown {
  let remaining = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000))
  const days = Math.floor(remaining / 86400); remaining -= days * 86400
  const hours = Math.floor(remaining / 3600); remaining -= hours * 3600
  const minutes = Math.floor(remaining / 60); const seconds = remaining - minutes * 60
  return { days, hours, minutes, seconds }
}