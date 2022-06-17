import { jest } from '@jest/globals'
import choose from '../utils/choose'
import ask from './ask'
describe('interface ask details', () => {
	const config = {
		id: 'id',
		display: 'Something',
		anotherThing: choose('question!', ['a', 1, false], 2, (chosen) => ({
			first: chosen[0],
			second: chosen[1],
		})),
	}
	it('should return correct', async () => {
		const fakePrompt = jest
			.fn(async () => {})
			.mockReturnValueOnce({ res: ['a', false] })
		const newConfig = Object.assign({}, config)
		console.log(newConfig)
		const configured = await ask(newConfig, fakePrompt)
		expect(fakePrompt.mock.calls.length).toBe(1)
		expect(fakePrompt.mock.calls[0][0]).toEqual([
			{
				type: 'list',
				name: 'res',
				message: 'question!',
				choices: ['a', 1, false],
			},
		])
		expect(configured.id).toBe('id')
		expect(configured.display).toBe('Something')
		expect(configured.anotherThing).toEqual({
			first: 'a',
			second: false,
		})
	})
	it('should try again if invalid choice', async () => {
		const fakePrompt = jest
			.fn(async () => {})
			.mockReturnValueOnce({ res: ['a', true] })
			.mockReturnValueOnce({ res: ['a', 1] })
		const newConfig = Object.assign({}, config)
		const configured = await ask(newConfig, fakePrompt)
		expect(fakePrompt.mock.calls.length).toBe(2)
		expect(configured.anotherThing).toEqual({
			first: 'a',
			second: 1,
		})
	})
	it('should work recursive', () => {})
})
