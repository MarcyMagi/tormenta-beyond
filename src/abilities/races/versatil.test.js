import versatil from './versatil'

describe('ability versatil', () => {
	it('should return valid versatil ability given 2 skills', () => {
		const res = versatil('acrobacia', 'skill', 'reflexos')
		expect(res.name).toBe('versátil')
		expect(res.meta.skills).toEqual(['acrobacia', 'reflexos'])
		expect(res.setOnSheet).toBeDefined()
	})
	it('should return valid versatil ability given 1 skill and 1 power', () => {
		const res = versatil('acrobacia', 'power', 'acuidade com arma')
		expect(res.name).toBe('versátil')
		expect(res.meta.skills).toEqual(['acrobacia'])
		expect(res.meta.power).toBe('acuidade com arma')
		expect(res.setOnSheet).toBeDefined()
	})
	it('should fail if given power given skill as second arg', () => {
		expect(() => {
			versatil('acrobacia', 'skill', 'acuidade com arma')
		}).toThrowError('ability versatil error: invalid skill')
	})
	it('should fail if given skill given power as second arg', () => {
		expect(() => {
			versatil('acrobacia', 'power', 'reflexos')
		}).toThrowError('ability versatil error: invalid power')
	})
	it('should fail if given invalid skill in first arg', () => {
		expect(() => {
			versatil('jump', 'power', 'acuidade com arma')
		}).toThrowError('ability versatil error: invalid skill')
	})
	it('should fail if given invalid second arg', () => {
		expect(() => {
			versatil('acrobacia', 'ability', 'reflexos')
		}).toThrowError('ability versatil error: invalid second argument')
	})
	it('should fail if given invalid skill in third arg', () => {
		expect(() => {
			versatil('acrobacia', 'skill', 'jump')
		}).toThrowError('ability versatil error: invalid skill')
	})
	it('should fail if given invalid power in third arg', () => {
		expect(() => {
			versatil('acrobacia', 'power', 'kiki')
		}).toThrowError('ability versatil error: invalid power')
	})
	it('should run setOnSheet and set sheet skills to trained', () => {
		const abilityVersatil = versatil('acrobacia', 'skill', 'reflexos')
		let sheet = {
			skills: {
				acrobacia: {
					attribute: 'for',
					others: {},
				},
				reflexos: {
					attribute: 'for',
					others: {},
				},
				fortitude: {
					attribute: 'for',
					others: {},
				},
			},
			powers: [],
		}
		abilityVersatil.setOnSheet(sheet)
		expect(sheet.skills.acrobacia.trained).toBe(true)
		expect(sheet.skills.reflexos.trained).toBe(true)
		expect(sheet.skills.fortitude.trained).toBeUndefined()
		expect(sheet.powers.length).toBe(0)
	})
	it('should run setOnSheet and set sheet skills to trained', () => {
		const abilityVersatil = versatil('acrobacia', 'power', 'acuidade com arma')
		let sheet = {
			skills: {
				acrobacia: {
					attribute: 'for',
					others: {},
				},
				reflexos: {
					attribute: 'for',
					others: {},
				},
				fortitude: {
					attribute: 'for',
					others: {},
				},
			},
			powers: [],
		}
		abilityVersatil.setOnSheet(sheet)
		expect(sheet.skills.acrobacia.trained).toBe(true)
		expect(sheet.skills.reflexos.trained).toBeUndefined()
		expect(sheet.skills.fortitude.trained).toBeUndefined()
		expect(sheet.powers.length).toBe(1)
		expect(sheet.powers[0]).toBe('acuidade com arma')
	})
})
