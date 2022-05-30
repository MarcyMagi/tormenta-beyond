import attributesFactory from './attributes.factory'
describe('attributes test', () => {
	it('should create valid attributes', () => {
		const attributes = attributesFactory({
			for: 10,
			des: 11,
			con: 12,
			int: 13,
			sab: 14,
			car: 15,
		})
		expect(attributes.for).toBe(10)
		expect(attributes.des).toBe(11)
		expect(attributes.con).toBe(12)
		expect(attributes.int).toBe(13)
		expect(attributes.sab).toBe(14)
		expect(attributes.car).toBe(15)
	})
	it('should ignore fake attribute', () => {
		const attributes = attributesFactory({
			for: 10,
			des: 11,
			con: 12,
			int: 13,
			sab: 14,
			car: 15,
			wei: 16,
		})
		expect(attributes.wei).toBeUndefined()
	})
	it('should throw without the car and for attribute', () => {
		expect(() => {
			attributesFactory({
				des: 11,
				con: 12,
				int: 13,
				sab: 14,
			})
		}).toThrow(`attribute validate error: attribute [for, car] must be integer`)
	})
})
