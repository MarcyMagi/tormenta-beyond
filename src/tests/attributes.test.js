import attributes from '../services/attributes.js'

describe('attributes', () => {
	it('should set attributes', () => {
		const attributeInstance = attributes({
			for: 10,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})

		expect(attributeInstance.attributes.for).toBe(10)
		expect(attributeInstance.attributes.des).toBe(12)
		expect(attributeInstance.attributes.con).toBe(9)
		expect(attributeInstance.attributes.int).toBe(10)
		expect(attributeInstance.attributes.sab).toBe(14)
		expect(attributeInstance.attributes.car).toBe(13)

		expect(attributeInstance.modifiers.for).toBe(0)
		expect(attributeInstance.modifiers.des).toBe(1)
		expect(attributeInstance.modifiers.con).toBe(-1)
		expect(attributeInstance.modifiers.int).toBe(0)
		expect(attributeInstance.modifiers.sab).toBe(2)
		expect(attributeInstance.modifiers.car).toBe(1)
	})
	it('should convert attributes to array', () => {
		const attributeInstance = attributes({
			for: 10,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})
		const toArray = attributeInstance.attributes.toArray()
		expect(toArray).toStrictEqual([10, 12, 9, 10, 14, 13])
	})
	it('should convert modifier to array', () => {
		const attributeInstance = attributes({
			for: 10,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})
		const toArray = attributeInstance.modifiers.toArray()
		expect(toArray).toStrictEqual([0, 1, -1, 0, 2, 1])
	})
	it('should return true validate roll', () => {
		const attributeInstance = attributes({
			for: 16,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})
		const valid = attributeInstance.attributes.validateRoll()
		expect(valid).toBe(true)
	})
	it('should return false validate roll', () => {
		const attributeInstance = attributes({
			for: 10,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})
		const valid = attributeInstance.attributes.validateRoll()
		expect(valid).toBe(false)
	})
	it('should return 0 validate point', () => {
		const attributeInstance = attributes({
			for: 17,
			des: 15,
			con: 13,
			int: 12,
			sab: 10,
			car: 8,
		})
		const value = attributeInstance.attributes.toExpend()
		expect(value).toBe(0)
	})
	it('should return 2 validate point', () => {
		const attributeInstance = attributes({
			for: 17,
			des: 15,
			con: 13,
			int: 10,
			sab: 10,
			car: 8,
		})
		const value = attributeInstance.attributes.toExpend()
		expect(value).toBe(2)
	})
	it('should return -3 validate point', () => {
		const attributeInstance = attributes({
			for: 17,
			des: 15,
			con: 13,
			int: 12,
			sab: 13,
			car: 8,
		})
		const value = attributeInstance.attributes.toExpend()
		expect(value).toBe(-3)
	})
	it('should return true validate modifier', () => {
		const attributeInstance = attributes({
			for: 10,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})
		const valid = attributeInstance.modifiers.validate()
		expect(valid).toBe(true)
	})
	it('should return false validate modifier', () => {
		const attributeInstance = attributes({
			for: 10,
			des: 12,
			con: 9,
			int: 10,
			sab: 14,
			car: 13,
		})
		attributeInstance.modifiers.for = 1
		const valid = attributeInstance.modifiers.validate()
		expect(valid).toBe(false)
	})
})
