import raceBasics from './basics'
describe('race basics', () => {
	it('should create valid', () => {
		const basics = raceBasics({
			name: 'humano',
			description: 'o povo mais numeroso de arton',
			abilities: ['versátil'],
			size: 'grande',
			speed: 12,
		})
		expect(basics.name).toBe('humano')
		expect(basics.description).toBe('o povo mais numeroso de arton')
		expect(basics.size).toBe('grande')
		expect(basics.speed).toBe(12)
	})
	it('should ignore weird value', () => {
		const basics = raceBasics({
			name: 'humano',
			description: 'o povo mais numeroso de arton',
			weird: true,
		})
		expect(basics.weird).toBeUndefined()
	})
	it('should throw if given not string as name', () => {
		expect(() => {
			raceBasics({ name: 1 })
		}).toThrow()
	})
	it('should throw if given not string as description', () => {
		expect(() => {
			raceBasics({ name: 'c', description: 3 })
		}).toThrow()
	})
	it('should throw if given not array as abilities', () => {
		expect(() => {
			raceBasics({ name: 'name', description: 'description', abilities: 1 })
		}).toThrow()
	})
	it('should throw if given not string as element in abilities', () => {
		expect(() => {
			raceBasics({ name: 'name', description: 'description', abilities: [1] })
		}).toThrow()
	})
	it('should throw if given invalid size', () => {
		expect(() => {
			raceBasics({
				name: 'name',
				description: 'description',
				abilities: [],
				size: 'big',
			})
		}).toThrow()
	})
	it('should throw if given invalid speed', () => {
		expect(() => {
			raceBasics({
				name: 'name',
				description: 'description',
				abilities: [],
				size: 'grande',
				speed: 'a',
			})
		}).toThrow()
	})
})
