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
	it('should create valid without fix', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
		})
		expect(typeof chooseFunc).toBe('function')
		const chosen = chooseFunc('a', 'b')
		expect(chosen).toEqual(['a', 'b'])
	})
	it('should throw same value in choose and fix', () => {
		expect(() => {
			chooseSetup({
				choose: ['a', 'b', 'z'],
				quantity: 2,
				fix: ['z'],
			})
		}).toThrow('choose error: duplicate values on choose/fix combine')
	})
	it('should throw given more args', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a', 'b', 'c')
		}).toThrow("choose error: function should recieve '2' args")
	})
	it('should throw given less args', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a')
		}).toThrow("choose error: function should recieve '2' args")
	})

	it('should throw given fix value as arg', () => {
		const chooseFunc = chooseSetup({
			choose: ['a', 'b', 'c'],
			quantity: 2,
			fix: ['z'],
		})
		expect(() => {
			chooseFunc('a', 'z')
		}).toThrow("choose error: argument 'z' not valid")
	})
	it('should throw given equal elements on choose', () => {
		expect(() => {
			chooseSetup({
				choose: ['a', 'a', 'c'],
				quantity: 2,
				fix: ['z'],
			})
		}).toThrow('choose error: duplicate values on choose')
	})
	it('should throw given equal elements on choose', () => {
		expect(() => {
			chooseSetup({
				choose: ['a', 'b', 'c'],
				quantity: 2,
				fix: ['z', 'z'],
			})
		}).toThrow('choose error: duplicate values on fix')
	})
	it('should throw given < 1 on quantity', () => {
		expect(() => {
			chooseSetup({
				choose: ['a', 'b', 'c'],
				quantity: 0,
				fix: ['z'],
			})
		}).toThrow('choose error: quantity cannot be less than 1')
	})
	it('should throw given same arg 2 times', () => {
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
