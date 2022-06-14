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

		const abilities = res.abilities
		delete res.abilities
		expect(res).toStrictEqual({
			attributes: {
				meta: {
					race: {
						for: 2,
						des: 2,
						con: 2,
					},
				},
				for: 2,
				des: 2,
				con: 2,
				int: 0,
				sab: 0,
				car: 0,
			},
			race: {
				name: 'humano',
			},
		})
	})
})
