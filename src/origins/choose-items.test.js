import chooseItems from './choose-items'

describe('origin choose items', () => {
	it('should create valid', () => {
		const itemsFunc = chooseItems({
			choose: ['cão de guarda', 'cavalo', 'pônei', 'trobo'],
			quantity: 1,
			fix: ['graveto'],
		})
		expect(typeof itemsFunc).toBe('function')
		const items = itemsFunc('cão de guarda')
		expect(items).toEqual(['cão de guarda', 'graveto'])
	})
	it('should throw', () => {
		expect(() => {
			chooseItems({})
		}).toThrow('origin choose items: choose should be array')
	})
})
