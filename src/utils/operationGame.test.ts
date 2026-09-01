import { expect, it } from 'vitest'
import { initialMission, missionReducer } from './operationGame'

function detectMission() {
  let mission = missionReducer(initialMission, { type: 'start' })
  for (let index = 0; index < 10; index += 1) mission = missionReducer(mission, { type: 'tick' })
  return mission
}

it('allows the intended low-volume play sequence to succeed', () => {
  const detected = detectMission()
  expect(detected.status).toBe('detected')
  expect(missionReducer(detected, { type: 'sleep' }).status).toBe('success')
})

it('moves a detected mission to the failure state only when caught is explicitly chosen', () => {
  expect(missionReducer(detectMission(), { type: 'caught' }).status).toBe('failed')
})

it('fully resets every mission value for retry', () => {
  const changed = { status: 'failed' as const, volume: 90, detection: 100, seconds: 11 }
  expect(missionReducer(changed, { type: 'reset' })).toEqual(initialMission)
})

it('keeps a successful mission complete when additional timer ticks occur', () => {
  const completed = missionReducer(detectMission(), { type: 'sleep' })
  expect(missionReducer(completed, { type: 'tick' })).toEqual(completed)
})

it('does not make success impossible after the scripted detection event', () => {
  const detected = detectMission()
  expect(detected.status).toBe('detected')
  expect(missionReducer(detected, { type: 'sleep' }).status).toBe('success')
})