import versatil from './versatil'

describe('ability versatil', () => {
	it('should return valid versatil ability given 2 skills', () => {
		const res = versatil('acrobacia', 'skill', 'reflexos')
		expect(res.name).toBe('versátil')
		expect(res.meta.skills).toEqual(['acrobacia', 'reflexos'])
		expect(res.applyInSkill).toBeDefined()
		expect(res.applyInPower).toBeUndefined()
	})
	it('should return valid versatil ability given 1 skill and 1 power', () => {
		const res = versatil('acrobacia', 'power', 'acuidade com arma')
		expect(res.name).toBe('versátil')
		expect(res.meta.skills).toEqual(['acrobacia'])
		expect(res.meta.power).toBe('acuidade com arma')
		expect(res.applyInSkill).toBeDefined()
		expect(res.applyInPower).toBeDefined()
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
})
