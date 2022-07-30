import { jest } from '@jest/globals'
import factory from './index'
import skillAtletismo from '../../data/skills/atletismo'
import skillAdestramento from '../../data/skills/adestramento'
import skillAcrobacia from '../../data/skills/acrobacia'
import classArcanista from '../../data/t-classes/arcanista'
describe('sheet factory integration test', () => {
	const loader = jest.fn((folder) => {
		if (folder === 'skills') {
			return {
				atletismo: skillAtletismo(),
				adestramento: skillAdestramento(),
				acrobacia: skillAcrobacia(),
			}
		} else if (folder === 't-classes') {
			return {
				arcanista: classArcanista(),
			}
		}
	})
	const config = {
		character: 'Doka',
		player: 'Marcy',
		classes: {
			arcanista: {
				level: 1,
				isFirst: true,
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
		expect(sheet.attributes.modifiers()).toEqual({
			for: 3,
			des: 0,
			con: 1,
			int: 1,
			sab: 2,
			car: 2,
		})
		expect(sheet.hp.max()).toBe(9)
		expect(sheet.mp.max()).toBe(6)
		expect(Object.keys(sheet.skills)).toEqual([
			'atletismo',
			'adestramento',
			'acrobacia',
		])
		expect(sheet.skills['atletismo'].calculate()).toBe(3)
	})
})
