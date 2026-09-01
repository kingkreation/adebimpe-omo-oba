export type MissionState = { status: 'briefing' | 'calling' | 'detected' | 'success' | 'failed'; volume: number; detection: number; seconds: number }
export type MissionAction = { type: 'start' } | { type: 'set-volume'; volume: number } | { type: 'tick' } | { type: 'sleep' } | { type: 'reset' } | { type: 'caught' }
export const initialMission: MissionState = { status: 'briefing', volume: 32, detection: 4, seconds: 0 }

export function missionReducer(state: MissionState, action: MissionAction): MissionState {
  if (action.type === 'reset') return initialMission
  if (action.type === 'start') return { ...initialMission, status: 'calling' }
  if (action.type === 'set-volume' && state.status === 'calling') {
    const detection = Math.min(100, Math.max(0, state.detection + (action.volume > 55 ? 22 : -7)))
    return detection >= 95 ? { ...state, volume: action.volume, detection, status: 'detected' } : { ...state, volume: action.volume, detection }
  }
  if (action.type === 'tick' && state.status === 'calling') {
    return state.seconds >= 9 ? { ...state, status: 'detected' } : { ...state, seconds: state.seconds + 1, detection: Math.max(0, state.detection - (state.volume <= 55 ? 2 : 0)) }
  }
  if (action.type === 'sleep' && state.status === 'detected') return { ...state, status: 'success' }
  if (action.type === 'caught' && state.status === 'detected') return { ...state, status: 'failed' }
  return state
}