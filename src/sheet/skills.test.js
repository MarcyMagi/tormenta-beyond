import skillsFactory from './skills.factory.js'
import attributesFactory from './attributes.factory.js'

describe('sheet skills factory', () => {
	const attributes = attributesFactory({
		for: 9,
		des: 18,
		con: 10,
		int: 10,
		sab: 10,
		car: 10,
	})

	const level = 15
	let atletismo
	beforeEach(() => {
		atletismo = skillsFactory('atletismo', 'for', attributes, level)
	})
	it('should get correct values', () => {
		const calculate = atletismo.calculate()
		expect(calculate).toEqual(6)
		const data = atletismo.getData()
		expect(data).toEqual({
			id: 'atletismo',
			attribute: 'for',
			attributeValue: -1,
			attributeFrom: 'default',
			trained: false,
			trainedValue: 0,
			trainFrom: false,
			levelValue: 7,
			others: {},
		})
	})
	it('should train the skill', () => {
		atletismo.train('gym')
		const calculate = atletismo.calculate()
		expect(calculate).toBe(12)
		const data = atletismo.getData()
		expect(data.trained).toBe(true)
		expect(data.trainFrom).toBe('gym')
	})
	it('should trough training 2 times', () => {
		expect(() => {
			atletismo.train()
			atletismo.train()
		}).toThrow('skill [atletismo] error: can only train once')
	})
	it('should change default attribute', () => {
		atletismo.changeAttribute('changer', 'des')
		const calculate = atletismo.calculate()
		expect(calculate).toBe(11)
		const data = atletismo.getData()
		expect(data.attribute).toBe('des')
		expect(data.attributeFrom).toBe('changer')
	})
	it('should set other modifiers', () => {
		atletismo.setOthers('adder', 2)
		atletismo.setOthers('lesser', -1)
		const calculate = atletismo.calculate()
		expect(calculate).toBe(7)
		const data = atletismo.getData()
		expect(data.others.adder).toBe(2)
		expect(data.others.lesser).toBe(-1)
	})
	it('should delete other modifiers', () => {
		atletismo.setOthers('lesser', -1)
		atletismo.deleteOthers('lesser')
		const calculate = atletismo.calculate()
		expect(calculate).toBe(6)
		const data = atletismo.getData()
		expect(data.others.lesser).toBeUndefined()
	})
	it.only('should change values when updating attribute', () => {
		attributes.addOther('plusses', { for: 2 })
		expect(atletismo.calculate()).toEqual(7)
	})
})
