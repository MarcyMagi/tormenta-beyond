import { jest } from '@jest/globals'
import factory from './factory'
describe('sheet factory', () => {
	const loader = jest
		.fn()
		.mockResolvedValueOnce({
			humano: {
				label: 'Humano',
			},
		})
		.mockResolvedValueOnce({
			atletismo: {
				label: 'Atletismo',
				attribute: 'for',
				armorPenalty: false,
				onlyTrained: false,
			},
			adestramento: {
				label: 'Adestramento',
				attribute: 'car',
				armorPenalty: false,
				onlyTrained: true,
			},
			acrobacia: {
				label: 'Acrobacia',
				attribute: 'des',
				armorPenalty: true,
				onlyTrained: false,
			},
		})
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
	}
	it('create valid sheet', async () => {
		const sheet = await factory(loader, config)
		expect(sheet.character).toBe('Doka')
		expect(sheet.player).toBe('Marcy')
		expect(sheet.race).toBe('Humano')
		expect(sheet.attributes.modifiers()).toEqual({
			for: 3,
			des: 0,
			con: 1,
			int: 1,
			sab: 2,
			car: 2,
		})
		expect(Object.keys(sheet.skills)).toEqual([
			'atletismo',
			'adestramento',
			'acrobacia',
		])
		expect(sheet.skills['atletismo'].calculate()).toBe(3)
	})
})
