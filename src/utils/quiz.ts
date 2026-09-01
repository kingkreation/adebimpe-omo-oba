export type Answer = { correct: boolean }
export type QuizAnswer = number | null
export const scoreQuiz = (answers: Answer[]) => answers.filter((answer) => answer.correct).length
export function scoreQuizAnswers(answers: QuizAnswer[], correctAnswers: readonly number[]) { return answers.reduce<number>((score, answer, index) => score + Number(answer === correctAnswers[index]), 0) }
export const isQuizComplete = (answers: QuizAnswer[]) => answers.every((answer) => answer !== null)