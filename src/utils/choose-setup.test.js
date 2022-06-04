import chooseSetup from './choose-setup'
describe('choose test', () => {
	it('should create valid', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(typeof chooseFunc).toBe('function')
		const chosen = chooseFunc('a', 'b')
		expect(chosen).toEqual(['a', 'b', 'z'])
	})
	it('should throw if same value in choose and fix', () => {
		expect(() => {
			chooseSetup({
				choose: ['a', 'b', 'z'],
				quantity: 2,
				fix: ['z'],
			})
		}).toThrow('choose error: dup choose')
	})
	it('should throw if given more args', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a', 'b', 'c')
		}).toThrow("choose error: function should recieve '2' args")
	})
	it('should throw if given less args', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a')
		}).toThrow("choose error: function should recieve '2' args")
	})
	it('should throw if given fix value as arg', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a', 'z')
		}).toThrow("choose error: argument 'z' not valid")
	})
	it('should throw if given same arg 2 times', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a', 'a')
		}).toThrow('choose error: same values arguments')
	})
})
