import normalItems from './normal-items'
describe('origins normal items', () => {
	it('should create valid', () => {
		const itemsList = normalItems({
			items: ['caneta', 'martelo'],
		})
		expect(itemsList).toEqual(['caneta', 'martelo'])
	})
})
