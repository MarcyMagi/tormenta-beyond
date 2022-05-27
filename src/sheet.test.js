import sheet from './sheet.factory.js'
describe('sheet', () => {
	it('should create humano character', () => {
		const config = {
			attributes: {
				for: 10,
				des: 18,
				con: 11,
				int: 12,
				sab: 13,
				car: 14,
			},
			race: {
				name: 'humano',
				config: {
					customModifiers: ['for', 'des', 'con'],
				},
			},
		}

		const newSheet = sheet(config)

		const tAtributes = newSheet.attributes
		expect(tAtributes.for).toBe(12)
		expect(tAtributes.des).toBe(20)
		expect(tAtributes.con).toBe(13)
		expect(tAtributes.int).toBe(12)
		expect(tAtributes.sab).toBe(13)
		expect(tAtributes.car).toBe(14)

		const tRace = newSheet.race
		expect(tRace.name).toBe('humano')
		expect(tRace.description).toBe("hi, i'm a human")

		const tAbilities = newSheet.abilities
		expect(tAbilities[0].name).toBe('versátil')
		expect(tAbilities[0].description).toBe("hey, i'm versátil!")

		const tSkills = newSheet.skills
		expect(tSkills['acrobacia'].trained).toBe(true)

		const tPowers = newSheet.powers
		expect(tPowers[0].name).toBe('esquiva')
		expect(tPowers[0].description).toBe('existo')
	})
})
