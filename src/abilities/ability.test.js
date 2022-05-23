import ability from './ability.js'
describe('abilities factory', () => {
	it('should return a valid ability', () => {
		const funcs = {
			applyOnSkill: (sheet) => {},
		}

		const compareAbility = Object.assign({ name: 'i am a ability' }, funcs)

		const res = ability('i am a ability', funcs)
		expect(res).toEqual(compareAbility)
	})
	it('should return a valid ability ignoring not used functions', () => {
		const funcs = {
			applyOnSkill: (sheet) => {},
			applyOnHugsAndKisses: (sheet) => {},
		}
		let compareFuncs = Object.assign({}, funcs)
		compareFuncs.applyOnHugsAndKisses = undefined

		const compareAbility = Object.assign(
			{ name: 'i am a ability' },
			compareFuncs
		)

		const res = ability('i am a ability', funcs)
		expect(res).toEqual(compareAbility)
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
				applyOnSkill: () => {},
			})
		}).toThrowError('ability error: functions must recieve only one argument')
	})
	it('should throw with function with more than one arg', () => {
		expect(() => {
			ability('to much args!', {
				applyOnSkill: (sheet, something) => {},
			})
		}).toThrowError('ability error: functions must recieve only one argument')
	})
})
