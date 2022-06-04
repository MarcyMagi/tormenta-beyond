import basics from './basics'
describe('origin choose benefit', () => {
	it('should create valid', () => {
		const basic = basics({
			name: 'name',
			description: 'description',
			items: ['vassoura', 'balão'],
		})

		expect(basic.name).toBe('name')
		expect(basic.description).toBe('description')
		expect(basic.items).toEqual(['vassoura', 'balão'])
	})
})
