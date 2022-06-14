import { jest } from '@jest/globals'
import appInterface from './index'
describe('interface intrageted procress', () => {
	const fakePrompt = {
		start: jest.fn(),
		get: jest
			.fn((arr) => {})
			.mockReturnValueOnce({ race: 'humano' })
			.mockReturnValueOnce({ arg: 'for' })
			.mockReturnValueOnce({ arg: 'des' })
			.mockReturnValueOnce({ arg: 'con' }),
	}
	it('should return correct', async () => {
		const res = await appInterface(fakePrompt)
		expect(res).toEqual({
			race: {
				name: 'humano',
				description: 'O povo mais numeroso em Arton',
				tale: 'Humanos são como uma praga',
				modifiers: { for: 2, des: 2, con: 2 },
				abilities: ['versátil'],
			},
		})
	})
})
