import choose from './choose'

const callback = (chosen) => {
	return {
		youHaveChosen: chosen,
	}
}
describe('tool choose', () => {
	it('should create valid', () => {
		const chooseObj = choose('options', [1, 2, 3], 2, callback)
		expect(chooseObj.label).toBe('options')
		expect(chooseObj.options).toEqual([1, 2, 3])
		expect(chooseObj.quantity).toBe(2)
		expect(typeof choose).toBe('function')
		const chosen = chooseObj.choose(1, 3)
		expect(chosen).toEqual({ youHaveChosen: [1, 3] })
	})
})
