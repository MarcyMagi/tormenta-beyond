import ability from './ability.js'
describe('abilities factory', () => {
	const applyInSkill = (sheet) => {}
	it('should return a valid ability', () => {
		const res = ability('i am a ability', { applyInSkill })
		console.log(res)
		expect(res.name).toBe('i am a ability')
		expect(res).toHaveProperty('applyInSkill')
	})
	it('should return a valid ability ignoring not used functions', () => {
		const applyOnHugsAndKisses = (sheet) => {}

		const res = ability('i am a ability', {
			applyInSkill,
			applyOnHugsAndKisses,
		})
		expect(res.name).toBe('i am a ability')
		expect(res).toHaveProperty('applyInSkill')
		expect(res).not.toHaveProperty('applyOnHugsAndKisses')
	})
	it('should return with name lowercase', () => {
		const res = ability('HOW DO I STOP SCREAMING')
		expect(res.name).toBe('how do i stop screaming')
	})
	it('should throw with no name', () => {
		expect(() => {
			ability()
		}).toThrowError('ability error: name must be a string')
	})
	it('should throw with empty string name', () => {
		expect(() => {
			ability('')
		}).toThrowError('ability error: name cannot be empty string')
	})
	it('should throw with function with no args', () => {
		expect(() => {
			ability('no args!', {
				applyInSkill: () => {},
			})
		}).toThrowError('ability error: functions must recieve only one argument')
	})
	it('should throw with function with more than one arg', () => {
		expect(() => {
			ability('to much args!', {
				applyInSkill: (sheet, something) => {},
			})
		}).toThrowError('ability error: functions must recieve only one argument')
	})
})
