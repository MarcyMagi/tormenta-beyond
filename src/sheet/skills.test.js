import skillsFactory from './skills.factory.js'
import { jest } from '@jest/globals'

describe('sheet skill factory', () => {
	const loader = jest.fn().mockResolvedValue({
		atletismo: {
			label: 'Atletismo',
			attribute: 'for',
			armorPenalty: false,
			onlyTrained: false,
		},
	})
	const sheet = {
		attributes: {
			modifiers: jest.fn((attribute) => {
				return attribute[0] === 'for'
					? -1
					: attribute[0] === 'des'
					? 4
					: undefined
			}),
		},
		classes: {
			totalLevel: jest.fn().mockReturnValue(15),
		},
	}
	let skills
	beforeEach(async () => {
		skills = await skillsFactory(loader, sheet)
	})
	it('should get correct values', () => {
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toEqual(6)
	})
	it('should get metadata correctly', () => {
		const data = skills['atletismo'].meta()
		expect(data).toEqual({
			id: 'atletismo',
			label: 'Atletismo',
			attribute: 'for',
			armorPenalty: false,
			onlyTrained: false,
			attributeFrom: 'default',
			trainedFrom: false,
			values: {
				attribute: -1,
				level: 7,
				training: 0,
			},
		})
	})
	it('should train the skill', () => {
		skills['atletismo'].train('gym')
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(12)
		const data = skills['atletismo'].meta()
		expect(data.trainedFrom).toBe('gym')
		expect(data.values.training).toBe(6)
	})
	it('should throw training 2 times', () => {
		expect(() => {
			skills['atletismo'].train('gym')
			skills['atletismo'].train('academy')
		}).toThrow('skill [atletismo] error: can only train once')
	})
	it('should change default attribute', () => {
		skills['atletismo'].changeAttribute('changer', 'des')
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(11)
		const data = skills['atletismo'].meta()
		expect(data.attribute).toBe('des')
		expect(data.attributeFrom).toBe('changer')
	})
	it('should set other modifiers', () => {
		skills['atletismo'].set('adder', 2)
		skills['atletismo'].set('lesser', -1)
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(7)
		const data = skills['atletismo'].meta()
		expect(data.values.adder).toBe(2)
		expect(data.values.lesser).toBe(-1)
	})
	it('should delete other modifiers', () => {
		skills['atletismo'].set('lesser', -1)
		skills['atletismo'].remove('lesser')
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(6)
		const data = skills['atletismo'].meta()
		expect(data.values.lesser).toBeUndefined()
	})
})
