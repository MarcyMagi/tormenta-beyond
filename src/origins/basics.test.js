import basics from './basics'
describe('origin basics', () => {
	it('should create valid', () => {
		const basic = basics({
			name: 'name',
			description: 'description',
		})

		expect(basic.name).toBe('name')
		expect(basic.description).toBe('description')
	})
})
