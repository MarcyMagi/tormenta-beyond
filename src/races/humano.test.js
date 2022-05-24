import humano from './humano.js'

describe('race humano', () => {
	it('should return valid humano race given for, des and con', () => {
		const res = humano(['for', 'des', 'con'])('acrobacia', 'skill', 'reflexos')
		expect(res.modifiers).toEqual({
			for: 2,
			des: 2,
			con: 2,
		})
		expect(res.abilities[0].name).toBe('versátil')
		expect(res.size).toBe('médio')
		expect(res.speed).toBe(9)
	})
	it('should return valid humano race given con, sab and car and power', () => {
		const res = humano(['con', 'sab', 'car'])(
			'acrobacia',
			'power',
			'acuidade com arma'
		)
		expect(res.modifiers).toEqual({
			con: 2,
			sab: 2,
			car: 2,
		})
		expect(res.abilities[0].name).toBe('versátil')
		expect(res.size).toBe('médio')
		expect(res.speed).toBe(9)
	})
	it('should fail if given invalid attribute', () => {
		expect(() => {
			humano(['con', 'sab', 'wei'])('acrobacia', 'skill', 'reflexos')
		}).toThrowError('race error: one or more modifiers is not valid')
	})
	it('should fail if given invalid less attributes', () => {
		expect(() => {
			humano(['con', 'sab'])('acrobacia', 'skill', 'reflexos')
		}).toThrowError('race humano error: should recieve 3 attributes')
	})
	it('should fail if given invalid more attributes', () => {
		expect(() => {
			humano(['for', 'con', 'sab', 'car'])('acrobacia', 'skill', 'reflexos')
		}).toThrowError('race humano error: should recieve 3 attributes')
	})
	it('should fail if given invalid versátil', () => {
		expect(() => {
			humano(['for', 'con', 'sab'])('acrobacia', 'skill', 'otherthing')
		}).toThrowError('ability versatil error: invalid skill')
	})
})
