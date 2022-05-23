import versatil from '../../services/abilities/versatil.js'

describe('ablitity versátil with 2 skills', () => {
	it('should return corretly', () => {
		const res = versatil({ skills: ['acrobacia', 'reflexos'] })
		expect(res).toEqual({
			name: 'versátil',
			skills: {
				acrobacia: {
					trained: 1,
				},
				reflexos: {
					trained: 1,
				},
			},
		})
	})
	it('should return corretly with 1 skill + 1 power', () => {
		const res = versatil({ skills: ['acrobacia'], power: 'foco em arma' })
		expect(res).toEqual({
			name: 'versátil',
			skills: {
				acrobacia: {
					trained: 1,
				},
			},
			power: 'foco em arma',
		})
	})
	it('should fail with 3 skills', () => {
		expect(() => {
			versatil({ skills: ['acrobacia', 'reflexos', 'conhecimento'] })
		}).toThrow()
	})
	it('should fail with 3 skills + power', () => {
		expect(() => {
			versatil({
				skills: ['acrobacia', 'reflexos', 'conhecimento'],
				power: 'foco em arma',
			})
		}).toThrow()
	})
	it('should fail with no skills', () => {
		expect(() => {
			versatil({})
		}).toThrow()
	})
	it('should fail with only power', () => {
		expect(() => {
			versatil({ power: 'foco em arma' })
		}).toThrow()
	})
	it('should fail with unexisting skills', () => {
		expect(() => {
			versatil({ skills: ['morrer', 'andar'] })
		}).toThrow()
	})
})
