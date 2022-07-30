import choose from './choose'
import { jest } from '@jest/globals'
describe('utils choose', () => {
	it('should return correct', () => {
		const chooseObj = choose(
			'+2 em três atributos',
			['for', 'des', 'con', 'int', 'sab', 'car'],
			3,
			jest.fn((chosen1, chosen2, chosen3) => ({
				value: [chosen1, chosen2, chosen3],
			}))
		)
		const specs = chooseObj.specs
		expect(specs).toEqual({
			label: '+2 em três atributos',
			options: ['for', 'des', 'con', 'int', 'sab', 'car'],
			quantity: 3,
		})
		const chosen = chooseObj.choose('for', 'des', 'con')
		expect(chosen).toEqual({ value: ['for', 'des', 'con'] })
	})

	const failTest = choose('test', ['for', 'des', 'con'], 2, (chosen) => chosen)

	it('should throw choosing invalid args', () => {
		expect(() => {
			failTest.choose('sab', 'int')
		}).toThrow('choose error: "test" invalid arg "sab"')
	})
	it('should throw choosing dups arguments', () => {
		expect(() => {
			failTest.choose('con', 'con')
		}).toThrow('choose error: "test" dup value "con"')
	})
	it('should throw choosing less values', () => {
		expect(() => {
			failTest.choose('for')
		}).toThrow('choose error: "test" must recieve "2" args')
	})
	it('should throw choosing more values', () => {
		expect(() => {
			failTest.choose('for', 'des', 'con')
		}).toThrow('choose error: "test" must recieve "2" args')
	})
})
