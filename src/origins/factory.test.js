import factory from './factory'
describe('origin factory', () => {
	it('should create valid', () => {
		const origin = factory({
			name: 'acólito',
			description: "hi, i'm a acólito",
			benefit: {
				skills: ['cura', 'religião', 'vontade'],
				powers: ['medicina', 'membro da igreja', 'vontade de ferro'],
			},
			items: ['símbolo sgrado', 'traje de sacerdote'],
		})
		expect(origin.name).toBe('acólito')
		expect(origin.description).toBe("hi, i'm a acólito")
		expect(typeof origin.benefit).toBe('function')
		expect(origin.items).toEqual(['símbolo sgrado', 'traje de sacerdote'])

		const benefit = origin.benefit('cura', 'medicina')
		expect(benefit.skills).toEqual(['cura'])
		expect(benefit.powers).toEqual(['medicina'])
	})
	it('should create valid using chooseItems', () => {
		const origin = factory({
			name: 'amigo dos animais',
			description: "hi, i'm a amigo dos animais",
			benefit: {
				skills: ['adestramento', 'cavalgar'],
				powers: ['amigo especial'],
			},
			itemsConfig: {
				choose: ['cão de guarda', 'cavalo', 'pônei', 'trobo'],
				quantity: 1,
			},
		})
		expect(origin.name).toBe('amigo dos animais')
		expect(origin.description).toBe("hi, i'm a amigo dos animais")

		expect(typeof origin.benefit).toBe('function')
		const benefit = origin.benefit('adestramento', 'cavalgar')
		expect(benefit.skills).toEqual(['adestramento', 'cavalgar'])
		expect(benefit.powers).toEqual([])

		expect(typeof origin.items).toBe('function')
		const items = origin.items('pônei')
		expect(items).toEqual(['pônei'])
	})
})
