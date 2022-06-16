import cacheAttributes from './attributes.factory'
describe('utils attributes', () => {
	const attributes = cacheAttributes(['for', 'des', 'int', 'sab'])
	it('should list correct', () => {
		const list = attributes.list()
		expect(list).toEqual(['for', 'des', 'int', 'sab'])
	})
	it('should set correct', () => {
		const newAttributes = attributes.filter({
			int: 2,
			for: 1,
		})
		expect(newAttributes).toEqual({ for: 1, des: 0, int: 2, sab: 0 })
	})
	it('should set ignoring wei attribute', () => {
		const newAttributes = attributes.filter({
			for: 2,
			int: 1,
			wei: -2,
		})
		expect(newAttributes).toEqual({ for: 2, des: 0, int: 1, sab: 0 })
	})
})
