import firstVoiceNoteAudio from '../assets/audio/first-voice-note.m4a'

// This note is distinct from the later memorable voice call described in memories.ts.
export const firstVoiceNote = {
  title: 'The first voice note you sent me',
  src: firstVoiceNoteAudio,
  context: 'Before our first memorable call, there was this small moment: finally hearing your voice.',
} as const