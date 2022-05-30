import skillFactory from './skill.factory'
describe('skill test', () => {
	it('should create valid skill with armor penalty', () => {
		const skill = skillFactory('acrobacia', 'des', { armorPenalty: true })
		expect(skill.name).toBe('acrobacia')
		expect(skill.attribute).toBe('des')
		expect(skill.armorPenalty).toBe(true)
		expect(skill.onlyTrained).toBe(false)
	})
	it('should create valid skill with armor penalty', () => {
		const skill = skillFactory('adestramento', 'car', { onlyTrained: true })
		expect(skill.name).toBe('adestramento')
		expect(skill.attribute).toBe('car')
		expect(skill.armorPenalty).toBe(false)
		expect(skill.onlyTrained).toBe(true)
	})
	it('should create valid skill without restrictions', () => {
		const skill = skillFactory('atletismo', 'for')
		expect(skill.name).toBe('atletismo')
		expect(skill.attribute).toBe('for')
		expect(skill.armorPenalty).toBe(false)
		expect(skill.onlyTrained).toBe(false)
	})
	it('should ignore wrong config object', () => {
		const skill = skillFactory('correr', 'int', { fast: true })
		expect(skill.name).toBe('correr')
		expect(skill.attribute).toBe('int')
		expect(skill.armorPenalty).toBe(false)
		expect(skill.onlyTrained).toBe(false)
	})
	it('should throw if empty string on name', () => {
		expect(() => {
			skillFactory('', 'des')
		}).toThrow('skill error: name cannot be empty string')
	})
	it('should throw if invalid attribute', () => {
		expect(() => {
			skillFactory('acrobacia', 'wei')
		}).toThrow('skill error: attribute must be valid')
	})
})
