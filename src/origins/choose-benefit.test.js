import chooseBenefit from './choose-benefit'
describe('origin choose benefit', () => {
	it('should create valid given 1 skill 1 power', () => {
		const choose = chooseBenefit({
			benefit: {
				skills: ['acrobacia', 'adestramento'],
				powers: ['acuidade com arma', 'esquiva'],
			},
		})
		expect(typeof choose).toBe('function')
		const benefits = choose('acrobacia', 'acuidade com arma')
		expect(benefits.skills).toEqual(['acrobacia'])
		expect(benefits.powers).toEqual(['acuidade com arma'])
	})
	it('should throw given skill and power with same name', () => {
		expect(() => {
			chooseBenefit({
				benefit: {
					skills: ['acrobacia', 'adestramento'],
					powers: ['acuidade com arma', 'acrobacia'],
				},
			})
		}).toThrow(
			'origin choose benefit error: skills and powers has element with same value'
		)
	})
	it('should create valid given 2 skills', () => {
		const choose = chooseBenefit({
			benefit: {
				skills: ['acrobacia', 'adestramento'],
				powers: ['acuidade com arma', 'esquiva'],
			},
		})
		const benefits = choose('acrobacia', 'adestramento')
		expect(benefits.skills).toEqual(['acrobacia', 'adestramento'])
		expect(benefits.powers).toEqual([])
	})
	it('should create valid given 2 powers', () => {
		const choose = chooseBenefit({
			benefit: {
				skills: ['acrobacia', 'adestramento'],
				powers: ['acuidade com arma', 'esquiva'],
			},
		})
		const benefits = choose('acuidade com arma', 'esquiva')
		expect(benefits.skills).toEqual([])
		expect(benefits.powers).toEqual(['acuidade com arma', 'esquiva'])
	})
	it('should throw given 1 arg', () => {
		const choose = chooseBenefit({
			benefit: {
				skills: ['acrobacia', 'adestramento'],
				powers: ['acuidade com arma', 'esquiva'],
			},
		})
		expect(() => {
			choose('acrobacia')
		}).toThrow('origin choose benefit error: arg2 should be string')
	})
	it('should throw given not benefit', () => {
		const choose = chooseBenefit({
			benefit: {
				skills: ['acrobacia', 'adestramento'],
				powers: ['acuidade com arma', 'esquiva'],
			},
		})
		expect(() => {
			choose('reflexos', 'acrobacia')
		}).toThrow('origin choose benefit error: arg is not benefit')
	})
})
