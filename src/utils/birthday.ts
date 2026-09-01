export function nextBirthday(date: { month: number; day: number }, now = new Date()) {
  const candidate = new Date(now.getFullYear(), date.month - 1, date.day)
  if (candidate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) candidate.setFullYear(now.getFullYear() + 1)
  return candidate
}

export function isBirthday(date: { month: number; day: number }, now = new Date()) {
  return now.getMonth() + 1 === date.month && now.getDate() === date.day
}
