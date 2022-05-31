import normalAttribtes from './normal-attributes'
describe('race normal attributes test', () => {
	it('should create valid', () => {
		const raceAttributes = normalAttribtes({
			attributes: {
				for: 4,
				des: 2,
				con: -2,
			},
		})
		expect(raceAttributes.attributes.for).toBe(4)
		expect(raceAttributes.attributes.des).toBe(2)
		expect(raceAttributes.attributes.con).toBe(-2)
		expect(raceAttributes.attributes.int).toBe(0)
		expect(raceAttributes.attributes.sab).toBe(0)
		expect(raceAttributes.attributes.car).toBe(0)
	})
	it('should to throw given fake attribute', () => {
		expect(() => {
			normalAttribtes({
				attributes: {
					for: 4,
					des: 2,
					con: -2,
					wei: 16,
				},
			})
		}).toThrow("attribute error: invalid 'wei' attribute")
	})
	it('should throw given NaN as attribute', () => {
		expect(() => {
			normalAttribtes({
				attributes: {
					for: 4,
					des: 2,
					con: 'c',
				},
			})
		}).toThrow("attribute error: attribute 'con' must be integer")
	})
})
