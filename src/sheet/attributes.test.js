import attributesFactory from './attributes.factory.js'
describe('sheet attributes factory', () => {
	const attributes = attributesFactory({
		for: 10,
		des: 12,
		con: 14,
		int: 16,
		sab: 17,
		car: 18,
	})
	it('should create valid', () => {
		expect(attributes.values()).toEqual({
			for: 10,
			des: 12,
			con: 14,
			int: 16,
			sab: 17,
			car: 18,
		})
		expect(attributes.modifiers()).toEqual({
			for: 0,
			des: 1,
			con: 2,
			int: 3,
			sab: 3,
			car: 4,
		})
		expect(attributes.getData()).toEqual({
			for: {
				base: 10,
				others: {},
			},
			des: {
				base: 12,
				others: {},
			},
			con: {
				base: 14,
				others: {},
			},
			int: {
				base: 16,
				others: {},
			},
			sab: {
				base: 17,
				others: {},
			},
			car: {
				base: 18,
				others: {},
			},
		})
	})
	it('should add other', () => {
		attributes.addOther('something', { for: 3, con: -2, wei: 2 })
		expect(attributes.modifiers().for).toBe(1)
		expect(attributes.modifiers().con).toBe(1)
		expect(attributes.modifiers().wei).toBeUndefined()
		expect(attributes.getData().for.others.something).toBe(3)
		expect(attributes.getData().des.others).toEqual({})
		expect(attributes.getData().con.others.something).toBe(-2)
		expect(attributes.getData().wei).toBeUndefined()
	})
	it('should remove other', () => {
		attributes.removeOther('something')
		expect(attributes.getData().for.others).toEqual({})
		expect(attributes.getData().des.others).toEqual({})
	})
})
