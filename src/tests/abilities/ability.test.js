import ability from '../../services/abilities/ability.js'
describe('abilities factory', () => {
	it('should return a valid ability', () => {
		const newAbility = {
			name: 'i am a ability',
			applyOnSkill: (sheet) => {},
		}
		const res = ability(newAbility)
		expect(res).toEqual(newAbility)
	})
	it('should return a valid ability ignoring not used functions', () => {
		const newAbility = {
			name: 'i am a ability',
			applyOnSkill: (sheet) => {},
			applyOnHugsAndKisses: (sheet) => {},
		}
		let compareAbility = Object.assign({}, newAbility)
		compareAbility.applyOnHugsAndKisses = undefined

		const res = ability(newAbility)
		expect(res).toEqual(compareAbility)
	})
	it('should return with name lowercase', () => {
		const newAbility = {
			name: 'HOW DO I STOP SCREAMING',
		}
		const res = ability(newAbility)
		expect(res.name).toBe('how do i stop screaming')
	})
	it('should throw with no name', () => {
		expect(() => {
			ability({})
		}).toThrow()
	})
	it('should throw with function with no args', () => {
		expect(() => {
			ability({
				name: 'no args!',
				applyOnSkill: () => {},
			})
		}).toThrow()
	})
	it('should throw with function with more than one arg', () => {
		expect(() => {
			ability({
				name: 'to much args!',
				applyOnSkill: (sheet, something) => {},
			})
		}).toThrow()
	})
})
