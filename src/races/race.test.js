import race from './race.js'
describe('race factory', () => {
	it('should return a valid race', () => {
		const res = race({ for: 2 }, [], 'grande', 9)

		expect(res).toEqual({
			modifiers: {
				for: 2,
			},
			abilities: [],
			size: 'grande',
			speed: 9,
		})
	})

	it('should return a valid race with less attributes', () => {
		const res = race({ for: 2 }, [])

		expect(res).toEqual({
			modifiers: {
				for: 2,
			},
			abilities: [],
			size: 'médio',
			speed: 9,
		})
	})

	it('should throw if given invalid attribute', () => {
		expect(() => {
			race({ wei: 2 }, [], 'médio', 9)
		}).toThrowError('race error: one or more modifiers is not valid')
	})
	it('should throw if given invalid size', () => {
		expect(() => {
			race({ for: 2 }, [], 'BIG', 3)
		}).toThrowError('race error: size is not valid')
	})
	it('should throw if given invalid speed', () => {
		expect(() => {
			race({ for: 2 }, [], 'médio', 'rapido')
		}).toThrowError('race error: speed must be integer')
	})
	it.skip('should throw if given invalid ability', () => {
		expect(() => {
			race({ for: 2 }, ['pro player'], 'médio', 6)
		}).toThrowError()
	})
})
