import attributesFactory from './attributes.factory'
describe('attributes test', () => {
	it('should create valid', () => {
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
	it('should create valid without all values', () => {
		const attributes = attributesFactory(
			{
				int: 0,
				sab: 14,
			},
			true
		)
		expect(attributes.for).toBeUndefined()
		expect(attributes.des).toBeUndefined()
		expect(attributes.con).toBeUndefined()
		expect(attributes.int).toBe(0)
		expect(attributes.sab).toBe(14)
		expect(attributes.car).toBeUndefined()
	})
	it('should to throw given fake attribute', () => {
		expect(() => {
			attributesFactory({
				for: 10,
				des: 11,
				con: 12,
				int: 13,
				sab: 14,
				car: 15,
				wei: 16,
			})
		}).toThrow("attribute error: invalid 'wei' attribute")
	})
	it('should throw given NaN as attribute', () => {
		expect(() => {
			attributesFactory({
				for: '10',
				des: 11,
				con: 12,
				int: 13,
				sab: 14,
				car: '15',
			})
		}).toThrow("attribute error: 'for' should be number")
	})
})
