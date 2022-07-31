import Attributes from './attributes.factory.js'
import Skill from './skills.factory.js'

describe('sheet skill factory', () => {
	const config = {
		label: 'Atletismo',
		attribute: 'for',
		armorPenalty: false,
		onlyTrained: false,
	}
	let sheet = {}
	let skill
	beforeEach(() => {
		sheet.attributes = Attributes()
		sheet.attributes.set('base', { for: 9 })
		skill = Skill('atletismo', config, sheet)
	})
	it('should get correct values', () => {
		const calculate = skill.calculate()
		expect(calculate).toEqual(6)
	})
	it.only('should get metadata correctly', () => {
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
	it('should update results when updating attribute', () => {
		sheet.attributes.set('new', { for: 2 })
		const calculate = skill.calculate()
		expect(calculate).toEqual(7)
		const meta = skill.meta()
		expect(meta.values.attribute).toBe(0)
	})
})
