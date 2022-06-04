import raceFactory from './factory'
describe('race factory test', () => {
	it('should create valid', () => {
		const race = raceFactory({
			name: 'arcanista',
			description: "hi, i'm a arcanista",
			pv: {
				lvl1: 8,
				lvlup: 2,
			},
			pm: 6,
			skills: {
				fix: ['misticismo', 'vontade'],
				quantity: 1,
				choose: ['conhecimento', 'iniciativa', 'ofício', 'percepção'],
			},
			proficiencies: [],
			abilities: [
				'caminho do arcanista',
				'magias',
				'poder de arcanista',
				'alto arcana',
			],
		})
		expect(race.name).toBe('arcanista')
		expect(race.description).toBe("hi, i'm a arcanista")
		expect(race.pv.lvl1).toBe(8)
		expect(race.pv.lvlup).toBe(2)
		expect(race.pm).toBe(6)
		expect(typeof race.skills).toBe('function')
		expect(race.proficiencies).toEqual([])
		expect(race.abilities).toEqual([
			'caminho do arcanista',
			'magias',
			'poder de arcanista',
			'alto arcana',
		])
		race.skills = race.skills('conhecimento')
		expect(race.skills).toEqual(['conhecimento', 'misticismo', 'vontade'])
	})
	it('should create valid given fix flexibility', () => {
		const race = raceFactory({
			name: 'arcanista',
			description: "hi, i'm a arcanista",
			pv: {
				lvl1: 8,
				lvlup: 2,
			},
			pm: 6,
			skills: {
				fixConfig: {
					choose: ['pontaria', 'luta'],
					fix: ['misticismo', 'vontade'],
				},
				quantity: 1,
				choose: ['conhecimento', 'iniciativa', 'ofício', 'percepção'],
			},
			proficiencies: [],
			abilities: [
				'caminho do arcanista',
				'magias',
				'poder de arcanista',
				'alto arcana',
			],
		})
		expect(race.name).toBe('arcanista')
		expect(race.description).toBe("hi, i'm a arcanista")
		expect(race.pv.lvl1).toBe(8)
		expect(race.pv.lvlup).toBe(2)
		expect(race.pm).toBe(6)
		expect(typeof race.skills).toBe('function')
		expect(race.proficiencies).toEqual([])
		expect(race.abilities).toEqual([
			'caminho do arcanista',
			'magias',
			'poder de arcanista',
			'alto arcana',
		])
		race.skills = race.skills('pontaria', 'conhecimento')
		expect(race.skills).toEqual([
			'conhecimento',
			'pontaria',
			'misticismo',
			'vontade',
		])
	})
})
