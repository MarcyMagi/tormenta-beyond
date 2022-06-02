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
		expect(raceAttributes.for).toBe(4)
		expect(raceAttributes.des).toBe(2)
		expect(raceAttributes.con).toBe(-2)
		expect(raceAttributes.int).toBe(0)
		expect(raceAttributes.sab).toBe(0)
		expect(raceAttributes.car).toBe(0)
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
	it('should throw given not number attribute', () => {
		expect(() => {
			normalAttribtes({
				attributes: {
					for: 4,
					des: 2,
					con: 'c',
				},
			})
		}).toThrow("attribute error: 'con' should be number")
	})
})
