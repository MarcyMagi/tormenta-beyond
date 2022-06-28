import { jest } from '@jest/globals'
import factory from './factory'
describe('sheet factory', () => {
	const mockEffectConfig = jest.fn()
	const mockEffectLoad = jest.fn()
	const config = {
		character: 'Doka',
		player: 'Marcy',
		race: {
			id: 'humano',
			modifiers: {
				for: 2,
				des: 2,
				con: 2,
			},
		},
		baseAttributes: {
			for: 17,
			des: 11,
			con: 12,
			int: 13,
			sab: 14,
			car: 15,
		},
		effects: [
			{
				on: 'config',
				do: mockEffectConfig,
			},
			{
				on: 'load',
				do: mockEffectLoad,
			},
		],
	}
	it('create valid sheet', async () => {
		const sheet = await factory(config)
		expect(sheet.character).toBe('Doka')
		expect(sheet.player).toBe('Marcy')
		expect(sheet.race).toBe('Humano')
		expect(sheet.attributes.modifiers()).toEqual({
			for: 4,
			des: 1,
			con: 2,
			int: 1,
			sab: 2,
			car: 2,
		})
		expect(mockEffectConfig.mock.calls.length).toBe(1)
		expect(mockEffectConfig.mock.calls[0][0]).toEqual(config)
		expect(mockEffectLoad.mock.calls.length).toBe(1)
		expect(mockEffectLoad.mock.calls[0][0]).toEqual(sheet)
	})
})
