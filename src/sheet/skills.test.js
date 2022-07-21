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
			modifiers: jest.fn().mockReturnValue({
				for: -1,
				des: 4,
				con: 0,
				int: 0,
				sab: 0,
				car: 0,
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
			},
		})
	})
	it('should train the skill', () => {
		skills['atletismo'].train('gym')
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(12)
		const data = skills['atletismo'].meta()
		expect(data.trainedFrom).toBe('gym')
	})
	it('should trough training 2 times', () => {
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
		skills['atletismo'].setOther('adder', 2)
		skills['atletismo'].setOther('lesser', -1)
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(7)
		const data = skills['atletismo'].meta()
		expect(data.values.adder).toBe(2)
		expect(data.values.lesser).toBe(-1)
	})
	it('should delete other modifiers', () => {
		skills['atletismo'].setOther('lesser', -1)
		skills['atletismo'].removeOther('lesser')
		const calculate = skills['atletismo'].calculate()
		expect(calculate).toBe(6)
		const data = skills['atletismo'].meta()
		expect(data.values.lesser).toBeUndefined()
	})
})
