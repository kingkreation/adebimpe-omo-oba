import { expect, it } from 'vitest'
import { isQuizComplete, scoreQuiz, scoreQuizAnswers } from './quiz'
it('scores correct answers only', () => expect(scoreQuiz([{ correct: true }, { correct: false }, { correct: true }])).toBe(2))
it('scores selected quiz answers against the configured answer indexes', () => expect(scoreQuizAnswers([0, 1, 2], [0, 0, 2])).toBe(2))
it('recognizes when every quiz answer has been selected', () => { expect(isQuizComplete([0, 2, 1])).toBe(true); expect(isQuizComplete([0, null, 1])).toBe(false) })