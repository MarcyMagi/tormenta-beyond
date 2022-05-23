import race from './race.js'
describe('race factory', () => {
	it('should return a valid race', () => {
		const res = race({ for: 2 }, [], 'medio', 9)

		expect(res).toEqual({
			modifiers: {
				for: 2,
			},
			abilities: [],
			size: 'medio',
			speed: 9,
		})
	})
	it.only('should throw if given invalid attribute', () => {
		expect(() => {
			race({ wei: 2 }, [], 'medio', 9)
		}).toThrow()
	})
	it('should throw if given invalid size', () => {
		expect(() => {
			race({ for: 2 }, [], 'BIG', 3)
		}).toThrow()
	})
	it('should throw if given invalid speed', () => {
		expect(() => {
			race({ for: 2 }, [], 'medio', 'rapido')
		}).toThrow()
	})
	it.skip('should throw if given invalid ability', () => {
		expect(() => {
			race({ for: 2 }, ['pro player'], 'medio', 6)
		}).toThrow()
	})
})
