import Attributes from './attributes'
describe('utils attributes', () => {
	const attributes = Attributes(['for', 'des', 'int', 'sab'])
	it('should list correct', () => {
		const list = attributes.list()
		expect(list).toEqual(['for', 'des', 'int', 'sab'])
	})
	it('should filter correct', () => {
		const newAttributes = attributes.filter({
			int: 2,
			for: 1,
		})
		expect(newAttributes).toEqual({ for: 1, int: 2 })
	})
	it('should fill empty values with zero', () => {
		const newAttributes = attributes.filter(
			{
				int: 2,
				for: 1,
			},
			true
		)
		expect(newAttributes).toEqual({ for: 1, des: 0, int: 2, sab: 0 })
	})
	it('should filter ignoring wei attribute', () => {
		const newAttributes = attributes.filter({
			for: 2,
			int: 1,
			wei: -2,
		})
		expect(newAttributes).toEqual({
			for: 2,
			int: 1,
		})
	})
})
