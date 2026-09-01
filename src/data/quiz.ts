export type QuizQuestion = { id: string; prompt: string; options: readonly string[]; answer: number }
export const deKingQuiz: readonly QuizQuestion[] = [
  { id: 'developer', prompt: 'What does De King do?', options: ['He is a developer', 'He is a pilot', 'He is a chef'], answer: 0 },
  { id: 'musician', prompt: 'De King is also a…', options: ['Musician', 'Football referee', 'Architect'], answer: 0 },
  { id: 'drums', prompt: 'Which instrument does De King play?', options: ['Drums', 'Saxophone', 'Violin'], answer: 0 },
  { id: 'keyboard', prompt: 'Does De King play keyboard?', options: ['Yes', 'No', 'I dont know'], answer: 0 },
  { id: 'guitar', prompt: 'Which guitar does he play?', options: ['Acoustic guitar', 'None', 'Alto'], answer: 0 },
  { id: 'talking-drum', prompt: 'Which traditional instrument does he play?', options: ['Talking drum', 'Flute', 'Harp'], answer: 0 },
  { id: 'technology', prompt: 'What does De King enjoy?', options: ['Technology', 'Only gardening', 'Nothing creative'], answer: 0 },
  { id: 'gift', prompt: 'Why did De King create this website?', options: ['As a birthday gift for Adebimpe', 'For a class project', 'For a company'], answer: 0 },
  { id: 'omo-oba', prompt: 'What does De King call Adebimpe?', options: ['Adebimpe Omo Oba', 'Captain Bimpe', 'The Mayor'], answer: 0 },
  { id: 'beginning', prompt: 'How did the relationship begin?', options: ['As friends and chatmates', 'At a concert', 'On a road trip'], answer: 0 },
  { id: 'meeting', prompt: 'Where did they meet?', options: ['Online', 'At work', 'At a wedding'], answer: 0 },
] as const