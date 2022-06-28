import skillsFactory from './skills.factory.js'

describe('sheet skills factory', () => {
	const sheet = {
		modifiers: { for: -1, des: 4 },
		level: 15,
	}

	const atletismo = skillsFactory('atletismo', 'for', sheet)
	it('should get correct values', () => {
		const calculate = atletismo.calculate()
		expect(calculate).toEqual({
			total: 6,
			meta: {
				level: 7,
				trained: 0,
				attribute: -1,
			},
		})
		const data = atletismo.getData()
		expect(data).toEqual({
			id: 'atletismo',
			attribute: 'for',
			attributeOrigin: 'default',
			trained: false,
			trainOrigin: false,
			others: {},
		})
	})
	it('should train the skill', () => {
		atletismo.train('gym')
		const calculate = atletismo.calculate()
		expect(calculate.meta.trained).toBe(6)
		expect(calculate.total).toBe(12)
		const data = atletismo.getData()
		expect(data.trained).toBe(true)
		expect(data.trainOrigin).toBe('gym')
	})
	it('should trough training again', () => {
		expect(() => {
			atletismo.train()
		}).toThrow('skill [atletismo] error: can only train once')
	})
	it('should change default attribute', () => {
		atletismo.changeAttribute('changer', 'des')
		const calculate = atletismo.calculate()
		expect(calculate.meta.attribute).toBe(4)
		expect(calculate.total).toBe(17)
		const data = atletismo.getData()
		expect(data.attribute).toBe('des')
		expect(data.attributeOrigin).toBe('changer')
	})
	it('should set other modifiers', () => {
		atletismo.setOthers('adder', 2)
		atletismo.setOthers('lesser', -1)
		const calculate = atletismo.calculate()
		expect(calculate.meta.adder).toBe(2)
		expect(calculate.meta.lesser).toBe(-1)
		expect(calculate.total).toBe(18)
		const data = atletismo.getData()
		expect(data.others.adder).toBe(2)
		expect(data.others.lesser).toBe(-1)
	})
	it('should delete other modifiers', () => {
		atletismo.deleteOthers('lesser')
		const calculate = atletismo.calculate()
		expect(calculate.meta.lesser).toBeUndefined()
		expect(calculate.total).toBe(19)
		const data = atletismo.getData()
		expect(data.others.lesser).toBeUndefined()
	})
})
