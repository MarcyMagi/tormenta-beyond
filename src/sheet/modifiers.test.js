import modifiersFactory from './modifiers.factory.js'
describe('modifiers test', () => {
	it('should create valid', () => {
		const modifiers = modifiersFactory({
			for: 10,
			des: 9,
			con: 12,
			int: 13,
			sab: 14,
			car: 15,
		})
		expect(modifiers.for).toBe(0)
		expect(modifiers.des).toBe(-1)
		expect(modifiers.con).toBe(1)
		expect(modifiers.int).toBe(1)
		expect(modifiers.sab).toBe(2)
		expect(modifiers.car).toBe(2)
	})
	it('should ignore fake attribute', () => {
		const modifiers = modifiersFactory({
			for: 10,
			des: 9,
			con: 12,
			int: 13,
			sab: 14,
			car: 15,
			wei: 16,
		})
		expect(modifiers.wei).toBeUndefined()
	})
	it('should throw without car attribute', () => {
		expect(() => {
			modifiersFactory({
				des: 9,
				con: 12,
				int: 13,
				sab: 14,
			})
		}).toThrow(`attribute validate error: attribute [for, car] must be integer`)
	})
})
