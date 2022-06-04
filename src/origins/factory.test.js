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
})
