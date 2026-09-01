export type Secret = { id: string; title: string; message: string; method: 'tap-count' | 'signature' | 'birthday'; location: 'vault' | 'corner'; visual: 'crown' | 'signature' | 'birthday' }
export const secrets: readonly Secret[] = [
  { id: 'crown-keeper', title: 'Princess protocol', message: 'Yes, princess. I know you’re still exploring. 👑', method: 'tap-count', location: 'vault', visual: 'crown' },
  { id: 'de-king-signature', title: 'De King', message: 'You found me.', method: 'signature', location: 'corner', visual: 'signature' },
  { id: 'birthday-whisper', title: 'Birthday whisper', message: 'Still my Adebimpe Omo Oba. 👑 WE WIN.', method: 'birthday', location: 'corner', visual: 'birthday' },
] as const
export const secretById = (id: string) => secrets.find((secret) => secret.id === id)