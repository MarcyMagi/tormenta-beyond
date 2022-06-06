import factory from './factory'
describe('race factory', () => {
	it('should create valid with normal attributes', () => {
		const state = {
			name: 'shrek',
			description: 'get out of my swamp',
			abilities: ['versátil'],
			attributes: {
				for: 2,
				con: 6,
			},
		}
		const race = factory(state)
		expect(race.name).toBe('shrek')
		expect(race.description).toBe('get out of my swamp')
		expect(race.abilities).toEqual(['versátil'])
		expect(race.attributes.for).toBe(2)
		expect(race.attributes.des).toBe(0)
		expect(race.attributes.con).toBe(6)
		expect(race.attributes.int).toBe(0)
		expect(race.attributes.sab).toBe(0)
		expect(race.attributes.car).toBe(0)
	})
	it('should create valid with choose attributes', () => {
		const state = {
			name: 'shrek',
			description: 'get out of my swamp',
			abilities: ['versátil'],
			attributesConfig: {
				quantity: 3,
				value: 2,
			},
		}
		const race = factory(state)
		expect(race.name).toBe('shrek')
		expect(race.description).toBe('get out of my swamp')
		expect(race.abilities).toEqual(['versátil'])
		expect(typeof race.attributes).toBe('function')
	})
})
