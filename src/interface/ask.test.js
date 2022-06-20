import { jest } from '@jest/globals'
import choose from '../utils/choose'
import ask from './ask'
describe('interface ask details', () => {
	it('should return correct', async () => {
		const config = {
			id: 'id',
			display: 'Something',
			anotherThing: choose('question!', ['a', 1, false], 2, (chosen) => ({
				first: chosen[0],
				second: chosen[1],
			})),
		}
		const fakePrompt = jest
			.fn()
			.mockReturnValueOnce({ 1: 'a' })
			.mockReturnValue({ 2: false })
		const configured = await ask(config, fakePrompt)
		expect(fakePrompt.mock.calls.length).toBe(2)
		expect(fakePrompt.mock.calls[0][0]).toEqual({
			type: 'list',
			name: 'arg_0',
			message: '(anotherThing) question! [1]',
			choices: ['a', 1, false],
		})
		expect(fakePrompt.mock.calls[1][0]).toEqual({
			type: 'list',
			name: 'arg_1',
			message: '(anotherThing) question! [2]',
			choices: [1, false],
		})
		expect(configured.id).toBe('id')
		expect(configured.display).toBe('Something')
		expect(configured.anotherThing).toEqual({
			first: 'a',
			second: false,
		})
	})
	it('should try again if invalid choice', async () => {
		const config = {
			id: 'id',
			display: 'Something',
			anotherThing: choose('question!', ['a', 1, false], 2, (chosen) => ({
				first: chosen[0],
				second: chosen[1],
			})),
		}
		const fakePrompt = jest
			.fn()
			.mockReturnValueOnce({ 1: 'a' })
			.mockReturnValueOnce({ 2: true })
			.mockReturnValueOnce({ 1: 'a' })
			.mockReturnValueOnce({ 2: 1 })
		const configured = await ask(config, fakePrompt)
		expect(fakePrompt.mock.calls.length).toBe(4)
		expect(configured.anotherThing).toEqual({
			first: 'a',
			second: 1,
		})
	})
	it('should work recursively', async () => {
		const config = {
			id: 'id',
			display: 'hello',
			choose1: choose('question 1!', ['a'], 1, (chosen) => chosen),
			thing: {
				choose2: choose('question 2!', ['b'], 1, (chosen) => chosen),
				anotherThing: {
					choose3: choose('question 3!', ['c'], 1, (chosen) => chosen),
				},
			},
		}
		const fakePrompt = jest
			.fn()
			.mockReturnValueOnce({ 1: 'a' })
			.mockReturnValueOnce({ 1: 'b' })
			.mockReturnValueOnce({ 1: 'c' })
		const configured = await ask(config, fakePrompt)
		expect(configured.choose1).toEqual(['a'])
		expect(configured.thing.choose2).toEqual(['b'])
		expect(configured.thing.anotherThing.choose3).toEqual(['c'])
	})
	it('should work in array', async () => {
		const config = {
			id: 'id',
			display: 'hello',
			arr: [
				choose('question 1!', ['a'], 1, (chosen) => chosen),
				choose('question 2!', ['b'], 1, (chosen) => chosen),
				choose('question 3!', ['c'], 1, (chosen) => chosen),
			],
		}
		const fakePrompt = jest
			.fn()
			.mockReturnValueOnce({ 1: 'a' })
			.mockReturnValueOnce({ 1: 'b' })
			.mockReturnValueOnce({ 1: 'c' })
		const configured = await ask(config, fakePrompt)
		expect(configured.arr[0]).toEqual(['a'])
		expect(configured.arr[1]).toEqual(['b'])
		expect(configured.arr[2]).toEqual(['c'])
	})
})
