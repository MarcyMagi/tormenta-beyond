import raceBasics from './basics'
describe('race basics', () => {
	it('should create valid', () => {
		const basics = raceBasics({
			name: 'humano',
			description: 'o povo mais numeroso de arton',
		})
		expect(basics.name).toBe('humano')
		expect(basics.description).toBe('o povo mais numeroso de arton')
	})
	it('should ignore weird value', () => {
		const basics = raceBasics({
			name: 'humano',
			description: 'o povo mais numeroso de arton',
			weird: true,
		})
		expect(basics.weird).toBeUndefined()
	})
	it('should throw given empty name', () => {
		expect(() => {
			raceBasics({ name: '' })
		}).toThrow('race basics error: name cannot be empty string')
	})
})
