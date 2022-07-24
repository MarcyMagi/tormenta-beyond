import Skill from './skill.factory.js'
import Attributes from './attributes.factory'
import { jest } from '@jest/globals'

describe('sheet skill factory', () => {
	const config = {
		id: 'atletismo',
		label: 'Atletismo',
		attribute: 'for',
		armorPenalty: false,
		onlyTrained: false,
	}
	const sheet = {
		attributes: Attributes({ for: 8, des: 18 }),
		classes: {
			totalLevel: jest.fn().mockReturnValue(15),
		},
	}
	let skill
	beforeEach(async () => {
		skill = await Skill(config, sheet)
	})
	it('should get correct values', () => {
		console.log(skill)
		const calculate = skill.calculate()
		expect(calculate).toEqual(6)
	})
	it('should get metadata correctly', () => {
		const data = skill.meta()
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
		skill.train('gym')
		const calculate = skill.calculate()
		expect(calculate).toBe(12)
		const data = skill.meta()
		expect(data.trainedFrom).toBe('gym')
		expect(data.values.training).toBe(6)
	})
	it('should throw training 2 times', () => {
		expect(() => {
			skill.train('gym')
			skill.train('academy')
		}).toThrow('skill "atletismo" error: can only train once')
	})
	it('should change default attribute', () => {
		skill.changeAttribute('changer', 'des')
		const calculate = skill.calculate()
		expect(calculate).toBe(11)
		const data = skill.meta()
		expect(data.attribute).toBe('des')
		expect(data.attributeFrom).toBe('changer')
	})
	it('should set other modifiers', () => {
		skill.set('adder', 2)
		skill.set('lesser', -1)
		const calculate = skill.calculate()
		expect(calculate).toBe(7)
		const data = skill.meta()
		expect(data.values.adder).toBe(2)
		expect(data.values.lesser).toBe(-1)
	})
	it('should delete other modifiers', () => {
		skill.set('lesser', -1)
		skill.remove('lesser')
		const calculate = skill.calculate()
		expect(calculate).toBe(6)
		const data = skill.meta()
		expect(data.values.lesser).toBeUndefined()
	})
})
