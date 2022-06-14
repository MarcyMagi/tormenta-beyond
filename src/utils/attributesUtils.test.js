import attributesUtils from './attributesUtils'
describe('utils attributes', () => {
	const attributes = attributesUtils(['for', 'des', 'int', 'sab'])
	it('should list correct', () => {
		const list = attributes.list()
		expect(list).toEqual(['for', 'des', 'int', 'sab'])
	})
	it('should set correct', () => {
		const set = attributes.set(['for', 'int'], 2)
		expect(set).toEqual({ for: 2, int: 2 })
	})
})
