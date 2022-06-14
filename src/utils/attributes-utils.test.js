import attributesUtils from './attributes-utils'
describe('utils attributes', () => {
	const attributes = attributesUtils(['for', 'des', 'int', 'sab'])
	it('should list correct', () => {
		const list = attributes.list()
		expect(list).toEqual(['for', 'des', 'int', 'sab'])
	})
	it('should set correct', () => {
		const set = attributes.set(['for', 'int'], [2, 1])
		expect(set).toEqual({ for: 2, int: 1 })
	})
	it('should set correct given wei attribute', () => {
		const set = attributes.set(['for', 'int', 'wei'], [2, 1])
		expect(set).toEqual({ for: 2, int: 1 })
	})
})
