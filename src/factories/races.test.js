import races from './races'

describe('factory race', () => {
	it('should create valid', () => {
		const race = races('new Race', { for: 2, con: 2, des: 2 }, [])
		expect(race.name).toBe('new race')
		expect(race.modifiers).toEqual({
			for: 2,
			des: 2,
			con: 2,
			int: 0,
			sab: 0,
			car: 0,
		})
		expect(race.abilities).toEqual([])
	})
})
