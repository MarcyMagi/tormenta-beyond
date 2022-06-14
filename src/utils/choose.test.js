import choose from './choose'
describe('utils choose', () => {
	it('should return correct', () => {
		const chooseObj = choose(
			'+2 em três atributos',
			['for', 'des', 'con', 'int', 'sab', 'car'],
			3,
			(chosen) => ({
				value: chosen,
			})
		)
		expect(chooseObj.userInteraction).toBe('choose')
		const specs = chooseObj.specs()
		expect(specs).toEqual({
			label: '+2 em três atributos',
			options: ['for', 'des', 'con', 'int', 'sab', 'car'],
			quantity: 3,
		})
		const chosen = chooseObj.choose('for', 'des', 'con')
		expect(chosen).toEqual({ value: ['for', 'des', 'con'] })
	})
})
