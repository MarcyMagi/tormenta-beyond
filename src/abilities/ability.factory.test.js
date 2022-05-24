import abilityFactory from './ability.factory.js'
describe('abilities factory', () => {
	const setOnSheet = (sheet) => {}
	it('should return a valid ability', () => {
		const res = abilityFactory('i am a ability', { setOnSheet })
		expect(res.name).toBe('i am a ability')
		expect(res).toHaveProperty('setOnSheet')
	})
	it('should return a valid ability ignoring not used functions', () => {
		const applyOnHugsAndKisses = (sheet) => {}

		const res = abilityFactory('i am a ability', {
			setOnSheet,
			applyOnHugsAndKisses,
		})
		expect(res.name).toBe('i am a ability')
		expect(res).toHaveProperty('setOnSheet')
		expect(res).not.toHaveProperty('applyOnHugsAndKisses')
	})
	it('should return with name lowercase', () => {
		const res = abilityFactory('HOW DO I STOP SCREAMING')
		expect(res.name).toBe('how do i stop screaming')
	})
	it('should throw with no name', () => {
		expect(() => {
			abilityFactory()
		}).toThrowError('ability error: name must be a string')
	})
	it('should throw with empty string name', () => {
		expect(() => {
			abilityFactory('')
		}).toThrowError('ability error: name cannot be empty string')
	})
	it('should throw with function with no args', () => {
		expect(() => {
			abilityFactory('no args!', {
				setOnSheet: () => {},
			})
		}).toThrowError('ability error: functions must recieve only one argument')
	})
	it('should throw with function with more than one arg', () => {
		expect(() => {
			abilityFactory('to much args!', {
				setOnSheet: (sheet, something) => {},
			})
		}).toThrowError('ability error: functions must recieve only one argument')
	})
})
