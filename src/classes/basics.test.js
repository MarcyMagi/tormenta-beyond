import classBasics from './basics'
describe('classes basics test', () => {
	it('should create valid', () => {
		const tClass = classBasics({
			name: 'arcanista',
			description: "i'm a arcanista!",
			pv: {
				lvl1: 8,
				lvlup: 2,
			},
			pm: 6,
			skills: {
				fixed: ['misticismo', 'vontade'],
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
		expect(tClass.name).toBe('arcanista')
		expect(tClass.description).toBe("i'm a arcanista!")
		expect(tClass.pv.lvl1).toBe(8)
		expect(tClass.pv.lvlup).toBe(2)
		expect(tClass.pm).toBe(6)
		expect(tClass.proficiencies).toEqual([])
		expect(tClass.abilities).toEqual([
			'caminho do arcanista',
			'magias',
			'poder de arcanista',
			'alto arcana',
		])
	})
})
