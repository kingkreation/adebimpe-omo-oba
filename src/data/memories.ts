import metOnlinePhoto from '../assets/photos/01-met-online.PNG'
import growingCloserPhoto from '../assets/photos/02-growing-closer.PNG'
import firstCallPhoto from '../assets/photos/03-first-call.PNG'
import quietNightsPhoto from '../assets/photos/04-quiet-nights.PNG'
import freezePhoto from '../assets/photos/05-the-freeze.PNG'
import birthdaySurprisePhoto from '../assets/photos/06-birthday-surprise.png'
import yourWordsPhoto from '../assets/photos/07-your-words.PNG'
import whatWeBuiltPhoto from '../assets/photos/08-what-we-built.PNG'

export type Memory = { id: string; title: string; summary: string; detail?: string; photoFilename?: string; photoSrc?: string; status: 'ready' | 'placeholder' }

// Add only confirmed memories here. Images belong in src/assets/photos/.
export const memories: Memory[] = [
  { id: 'met-online', title: 'We met online', summary: 'The first page of our story.', detail: 'We met online, starting as normal friends and chatmates.', photoFilename: '01-met-online.PNG', photoSrc: metOnlinePhoto, status: 'ready' },
  { id: 'growing-closer', title: 'Life brought us closer', summary: 'Conversation slowly became connection.', detail: 'Over time, life brought us closer and the relationship gradually became deeper.', photoFilename: '02-growing-closer.PNG', photoSrc: growingCloserPhoto, status: 'ready' },
  { id: 'first-call', title: 'The first memorable voice call', summary: 'You were at work.', detail: 'A memorable call happened while Adebimpe was at work.', photoFilename: '03-first-call.PNG', photoSrc: firstCallPhoto, status: 'ready' },
  { id: 'quiet-nights', title: 'The quiet calls', summary: 'Low voices. Late nights. A shared secret.', detail: 'We had late-night calls, keeping our voices low because calls at home were not normally allowed.', photoFilename: '04-quiet-nights.PNG', photoSrc: quietNightsPhoto, status: 'ready' },
  { id: 'freeze', title: 'The freeze', summary: 'When Mummy caught you, the plan was simple: pretend to sleep.', detail: 'Sometimes her mum caught her; Adebimpe would freeze and pretend she was sleeping.', photoFilename: '05-the-freeze.PNG', photoSrc: freezePhoto, status: 'ready' },
  { id: 'birthday-surprise', title: 'Your surprise for me', summary: 'A call that made De King’s birthday unforgettable.', detail: 'On De King’s birthday, Adebimpe surprised him with a call involving eulogy/praise-style greetings.', photoFilename: '06-birthday-surprise.png', photoSrc: birthdaySurprisePhoto, status: 'ready' },
  { id: 'support', title: 'Your words', summary: 'Support that has mattered.', detail: 'Adebimpe has supported De King emotionally and through her words.', photoFilename: '07-your-words.PNG', photoSrc: yourWordsPhoto, status: 'ready' },
  { id: 'virtual-world', title: 'What we have built', summary: 'So much of it has lived in calls, conversations, and messages.', detail: 'Most of the relationship memories are virtual because they have not physically met yet.', photoFilename: '08-what-we-built.PNG', photoSrc: whatWeBuiltPhoto, status: 'ready' },
]

export const firstVoiceMemory = {
  title: 'What I remember', body: 'Our first memorable voice call happened while you were at work. I still remember that feeling of finally hearing your voice.', detail: '[Add the details of what we talked about here]', isPlaceholder: true,
} as const

export const birthdaySurpriseMemory = {
  title: 'The call I won’t forget', body: 'On my birthday, you surprised me with a call involving eulogy/praise-style greetings that greeted me that day.', detail: '[Add the detail of that surprise in De King’s own words.]', isPlaceholder: true,
} as const
