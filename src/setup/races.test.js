import race from './races.factory.js'
describe('factory race', () => {
	it('should create valid humano', () => {
		const humano = race(
			'humano',
			'O povo mais numeroso em Arton',
			'Humano são como uma praga',
			{
				chooseQuantity: 3,
				chooseValue: 2,
			}
		)

		expect(humano.name).toEqual('humano')
		expect(humano.book()).toEqual({
			description: 'O povo mais numeroso em Arton',
			tale: 'Humano são como uma praga',
		})
		const modifiers = humano.getModifiers('for', 'des', 'sab')
		expect(modifiers).toEqual({
			for: 2,
			des: 2,
			con: 0,
			int: 0,
			sab: 2,
			car: 0,
		})
	})
	it('should create valid anão', () => {
		const anao = race(
			'anão',
			'Anões são o mais resiliente dos povos',
			'Não exista nada mais confiável em Arton que um anão',
			{
				fixModifiers: {
					con: 4,
					sab: 2,
					des: -2,
				},
			}
		)
		expect(anao.name).toEqual('anão')
		expect(anao.book()).toEqual({
			description: 'Anões são o mais resiliente dos povos',
			tale: 'Não exista nada mais confiável em Arton que um anão',
		})
		const modifiers = anao.getModifiers()
		expect(modifiers).toEqual({
			for: 0,
			des: -2,
			con: 4,
			int: 0,
			sab: 2,
			car: 0,
		})
	})
})
