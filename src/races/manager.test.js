import manager from './manager'
describe('race manager', () => {
	const races = manager
	it('should get valid humano race', () => {
		const race = races['humano']
		expect(race.name).toBe('humano')
		expect(race.description).toBe("hi, i'm a humano")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual(['versátil'])
		expect(typeof race.attributes).toBe('function')

		race.attributes = race.attributes('for', 'con', 'des')
		expect(race.attributes).toEqual({
			for: 2,
			des: 2,
			con: 2,
			int: 0,
			sab: 0,
			car: 0,
		})
	})
	it('should get valid anão race', () => {
		const race = manager['anão']
		expect(race.name).toBe('anão')
		expect(race.description).toBe("hi, i'm a anão")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'conhecimento das rochas',
			'devagar e sempre',
			'duro como pedra',
			'tradição de heredrimm',
		])
		expect(race.attributes).toEqual({
			for: 0,
			des: -2,
			con: 4,
			int: 0,
			sab: 2,
			car: 0,
		})
	})
	it('should get valid dahllan race', () => {
		const race = manager['dahllan']
		expect(race.name).toBe('dahllan')
		expect(race.description).toBe("hi, i'm a dahllan")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'amiga das plantas',
			'armadura de allihanna',
			'empatia selvagem',
		])
		expect(race.attributes).toEqual({
			for: 0,
			des: 2,
			con: 0,
			int: -2,
			sab: 4,
			car: 0,
		})
	})
	it('should get valid elfo race', () => {
		const race = manager['elfo']
		expect(race.name).toBe('elfo')
		expect(race.description).toBe("hi, i'm a elfo")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'graça de glórienn',
			'herança feérica',
			'sentidos élficos',
		])
		expect(race.attributes).toEqual({
			for: 0,
			des: 2,
			con: -2,
			int: 4,
			sab: 0,
			car: 0,
		})
	})
	it('should get valid goblin race', () => {
		const race = manager['goblin']
		expect(race.name).toBe('goblin')
		expect(race.description).toBe("hi, i'm a goblin")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'engenhoso',
			'espelunqueiro',
			'peste esguia',
			'rato das ruas',
		])
		expect(race.attributes).toEqual({
			for: 0,
			des: 4,
			con: 0,
			int: 2,
			sab: 0,
			car: -2,
		})
	})
	it('should get valid lefou race', () => {
		const race = manager['lefou']
		expect(race.name).toBe('lefou')
		expect(race.description).toBe("hi, i'm a lefou")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual(['cria da tormenta', 'deformidade'])
		expect(typeof race.attributes).toEqual('function')

		race.attributes = race.attributes('for', 'des', 'con')
		expect(race.attributes).toEqual({
			for: 2,
			des: 2,
			con: 2,
			int: 0,
			sab: 0,
			car: -2,
		})
	})
	it('should get valid minotauro race', () => {
		const race = manager['minotauro']
		expect(race.name).toBe('minotauro')
		expect(race.description).toBe("hi, i'm a minotauro")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual(['chifres', 'couro rígido', 'faro'])
		expect(race.attributes).toEqual({
			for: 4,
			des: 0,
			con: 2,
			int: 0,
			sab: -2,
			car: 0,
		})
	})
	it('should get valid qareen race', () => {
		const race = manager['qareen']
		expect(race.name).toBe('qareen')
		expect(race.description).toBe("hi, i'm a qareen")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'desejos',
			'resistência elemental',
			'tatuagem mística',
		])
		expect(race.attributes).toEqual({
			for: 0,
			des: 0,
			con: 0,
			int: 2,
			sab: -2,
			car: 4,
		})
	})
	it('should get valid golem race', () => {
		const race = manager['golem']
		expect(race.name).toBe('golem')
		expect(race.description).toBe("hi, i'm a golem")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'canalizar reparos',
			'chassi',
			'criatura artifical',
			'espírito elemental',
			'sem origem',
		])
		expect(race.attributes).toEqual({
			for: 4,
			des: 0,
			con: 2,
			int: 0,
			sab: 0,
			car: -2,
		})
	})
	it('should get valid hyenne race', () => {
		const race = manager['hyenne']
		expect(race.name).toBe('hyenne')
		expect(race.description).toBe("hi, i'm a hyenne")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'arremessador',
			'pequeno e rechonchudo',
			'sorte salvadora',
		])
		expect(race.attributes).toEqual({
			for: -2,
			des: 4,
			con: 0,
			int: 0,
			sab: 0,
			car: 2,
		})
	})
	it('should get valid kliren race', () => {
		const race = manager['kliren']
		expect(race.name).toBe('kliren')
		expect(race.description).toBe("hi, i'm a kliren")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'híbrido',
			'lógica gnômica',
			'ossos frágeis',
			'vanguardista',
		])
		expect(race.attributes).toEqual({
			for: -2,
			des: 0,
			con: 0,
			int: 4,
			sab: 0,
			car: 2,
		})
	})
	it('should get valid medusa race', () => {
		const race = manager['medusa']
		expect(race.name).toBe('medusa')
		expect(race.description).toBe("hi, i'm a medusa")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'cria de megalokk',
			'natureza venenosa',
			'olhar atordoante',
		])
		expect(race.attributes).toEqual({
			for: 0,
			des: 4,
			con: 0,
			int: 0,
			sab: 0,
			car: 2,
		})
	})
	it('should get valid osteon race', () => {
		const race = manager['osteon']
		expect(race.name).toBe('osteon')
		expect(race.description).toBe("hi, i'm a osteon")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'armadura óssea',
			'memória póstuma',
			'natureza esquelética',
			'preço da não vida',
		])
		expect(typeof race.attributes).toBe('function')
		race.attributes = race.attributes('for', 'des', 'car')
		expect(race.attributes).toEqual({
			for: 2,
			des: 2,
			con: -2,
			int: 0,
			sab: 0,
			car: 2,
		})
	})
	it('should get valid sereia race', () => {
		const race = manager['sereia']
		expect(race.name).toBe('sereia')
		expect(race.description).toBe("hi, i'm a sereia")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'canção dos mares',
			'mestre do tridente',
			'transformação anfíbia',
		])
		expect(typeof race.attributes).toBe('function')
		race.attributes = race.attributes('for', 'des', 'car')
		expect(race.attributes).toEqual({
			for: 2,
			des: 2,
			con: 0,
			int: 0,
			sab: 0,
			car: 2,
		})
	})
	it('should get valid sílfide race', () => {
		const race = manager['sílfide']
		expect(race.name).toBe('sílfide')
		expect(race.description).toBe("hi, i'm a sílfide")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'asas de borboleta',
			'espírito da natureza',
			'magia das fadas',
		])
		expect(race.attributes).toEqual({
			for: -4,
			des: 2,
			con: 0,
			int: 0,
			sab: 0,
			car: 4,
		})
	})
	it('should get valid aggelus race', () => {
		const race = manager['aggelus']
		expect(race.name).toBe('aggelus')
		expect(race.description).toBe("hi, i'm a aggelus")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual(['herança divina', 'luz sagrada'])
		expect(race.attributes).toEqual({
			for: 0,
			des: 0,
			con: 0,
			int: 0,
			sab: 4,
			car: 2,
		})
	})
	it('should get valid sulfure race', () => {
		const race = manager['sulfure']
		expect(race.name).toBe('sulfure')
		expect(race.description).toBe("hi, i'm a sulfure")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual(['herança divina', 'sombras profanas'])
		expect(race.attributes).toEqual({
			for: 0,
			des: 4,
			con: 0,
			int: 2,
			sab: 0,
			car: 0,
		})
	})
	it('should get valid trog race', () => {
		const race = manager['trog']
		expect(race.name).toBe('trog')
		expect(race.description).toBe("hi, i'm a trog")
		expect(race.size).toBe('médio')
		expect(race.speed).toBe(9)
		expect(race.abilities).toEqual([
			'mau cheiro',
			'mordida',
			'reptiliano',
			'sangue frio',
		])
		expect(race.attributes).toEqual({
			for: 2,
			des: 0,
			con: 4,
			int: -2,
			sab: 0,
			car: 0,
		})
	})
})
