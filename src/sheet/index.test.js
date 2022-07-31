import { jest } from '@jest/globals'
import MockSkill from '../../tests/mock-skill.factory'
import MockClass from '../../tests/mock-class.factory'
import { choose } from '../../data/utils'
import factory from './index'
describe('sheet factory integration test', () => {
	const mockSkill = MockSkill()
	const mockClass = MockClass()
	const loader = jest.fn((folder) => {
		if (folder === 'skills') {
			return {
				skill1: mockSkill('for'),
				skill2: mockSkill('des'),
				skill3: mockSkill('con'),
				skill4: mockSkill('int'),
			}
		} else if (folder === 't-classes') {
			return {
				class1: mockClass(
					choose('test', ['skill2', 'skill3'], 1, (chosen) => [
						'skill1',
						chosen,
					])
				),
			}
		}
	})
	it.only('should create blank sheet', async () => {
		const sheet = await factory(loader)
		expect(sheet.character).toBeUndefined()
		expect(sheet.player).toBeUndefined()
		expect(sheet.attributes.values()).toEqual({
			for: 0,
			des: 0,
			con: 0,
			int: 0,
			sab: 0,
			car: 0,
		})
		expect(sheet.skills.skill1.calculate()).toBe(-5)
		expect(Object.keys(sheet.skills)).toEqual([
			'skill1',
			'skill2',
			'skill3',
			'skill4',
		])
		expect(sheet.hp.max()).toBe(0)
		expect(sheet.mp.max()).toBe(0)
	})
	const config = {
		character: 'Doka',
		player: 'Marcy',
		classes: {
			class1: Object.assign({
				level: 1,
				isFirst: true,
				chosen: {
					skills: ['conhecimento'],
				},
			}),
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
		// 	expect(Object.keys(sheet.skills)).toEqual([
		// 		'atletismo',
		// 		'adestramento',
		// 		'acrobacia',
		// 	])
		// 	expect(sheet.skills['atletismo'].calculate()).toBe(3)
	})
})
