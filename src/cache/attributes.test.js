import cacheAttributes from './attributes.factory'
describe('utils attributes', () => {
	const attributes = cacheAttributes(['for', 'des', 'int', 'sab'])
	it('should list correct', () => {
		const list = attributes.list()
		expect(list).toEqual(['for', 'des', 'int', 'sab'])
	})
	it('should set correct', () => {
		const newAttributes = attributes.new(['int', 'for'], [2, 1])
		console.log(newAttributes)
		expect(newAttributes).toEqual({ for: 1, des: 0, int: 2, sab: 0 })
	})
	it('should set ignoring wei attribute', () => {
		const newAttributes = attributes.new(['for', 'int', 'wei'], [2, 1])
		expect(newAttributes).toEqual({ for: 2, des: 0, int: 1, sab: 0 })
	})
})
