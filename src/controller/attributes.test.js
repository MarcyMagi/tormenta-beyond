import attributes from './attributes'

describe('attributes factory', () => {
	it('should create valid', () => {
		const newAttributes = attributes({
			for: 17,
			des: 15,
			con: 13,
			int: 12,
			sab: 10,
			car: 8,
		})
		expect(newAttributes).toEqual({
			meta: {
				base: {
					for: 17,
					des: 15,
					con: 13,
					int: 12,
					sab: 10,
					car: 8,
				},
			},
			for: 17,
			des: 15,
			con: 13,
			int: 12,
			sab: 10,
			car: 8,
		})
	})
	it('should fail if given not number', () => {
		expect(() => {
			attributes({
				for: 17,
				des: 15,
				con: 13,
				int: 12,
				sab: 10,
				car: '8',
			})
		}).toThrow()
	})
	it('should fail if given not integer', () => {
		expect(() => {
			attributes({
				for: 17,
				des: 15,
				con: 13,
				int: 12,
				sab: 10,
				car: 8.1,
			})
		}).toThrow()
	})
	it('should fail if not given', () => {
		expect(() => {
			attributes({
				for: 17,
				des: 15,
				con: 13,
				int: 12,
				sab: 10,
			})
		}).toThrow()
	})
})
