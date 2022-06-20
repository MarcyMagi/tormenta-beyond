import skillsFactory from './skills.factory.js'

describe('sheet skills factory', () => {
	const modifiers = { for: -1, des: 4 }
	const level = 15

	const atletismo = skillsFactory('atletismo', 'for')
	it('should create valid', () => {
		const calculate = atletismo.calculate(modifiers, level)
		expect(calculate).toEqual({
			total: 6,
			meta: {
				level: 7,
				trained: 0,
				attribute: -1,
			},
		})
		const data = atletismo.data()
		expect(data).toEqual({
			name: 'atletismo',
			attribute: 'for',
			attributeOrigin: 'default',
			trained: false,
			onlyTrained: false,
			armorPenalty: false,
			others: {},
		})
	})
	it('should train the skill', () => {
		atletismo.train()
		const calculate = atletismo.calculate(modifiers, level)
		expect(calculate.meta.trained).toBe(6)
		expect(calculate.total).toBe(12)
		const data = atletismo.data()
		expect(data.trained).toBe(true)
	})
	it('should trough training again', () => {
		expect(() => {
			atletismo.train()
		}).toThrow('skill [atletismo] error: can only train once')
	})
	it('should change default attribute', () => {
		atletismo.changeAttribute('changer', 'des')
		const calculate = atletismo.calculate(modifiers, level)
		expect(calculate.meta.attribute).toBe(4)
		expect(calculate.total).toBe(17)
		const data = atletismo.data()
		expect(data.attribute).toBe('des')
		expect(data.attributeOrigin).toBe('changer')
	})
	it('should set other modifiers', () => {
		atletismo.setOthers('adder', 2)
		atletismo.setOthers('lesser', -1)
		const calculate = atletismo.calculate(modifiers, level)
		expect(calculate.meta.adder).toBe(2)
		expect(calculate.meta.lesser).toBe(-1)
		expect(calculate.total).toBe(18)
		const data = atletismo.data()
		expect(data.others.adder).toBe(2)
		expect(data.others.lesser).toBe(-1)
	})
	it('should delete other modifiers', () => {
		atletismo.deleteOthers('lesser')
		const calculate = atletismo.calculate(modifiers, level)
		expect(calculate.meta.lesser).toBeUndefined()
		expect(calculate.total).toBe(19)
		const data = atletismo.data()
		expect(data.others.lesser).toBeUndefined()
	})
})
