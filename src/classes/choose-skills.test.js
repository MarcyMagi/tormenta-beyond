import chooseSkills from './choose-skills'
describe('class choose skills test', () => {
	it('should create valid', () => {
		const skillsFunc = chooseSkills({
			skills: {
				fix: ['misticismo', 'vontade'],
				quantity: 1,
				choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
			},
		})
		expect(typeof skillsFunc).toBe('function')
		const skills = skillsFunc('conhecimento')
		expect(skills).toEqual(['misticismo', 'vontade', 'conhecimento'])
	})
	it('should create valid with more quantity', () => {
		const skillsFunc = chooseSkills({
			skills: {
				fix: ['misticismo', 'vontade'],
				quantity: 3,
				choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
			},
		})
		expect(typeof skillsFunc).toBe('function')
		const skills = skillsFunc('conhecimento', 'inciativa', 'ofício')
		expect(skills).toEqual([
			'misticismo',
			'vontade',
			'conhecimento',
			'inciativa',
			'ofício',
		])
	})
	it('should throw choosen less skills', () => {
		expect(() => {
			const skillsFunc = chooseSkills({
				skills: {
					fix: ['misticismo', 'vontade'],
					quantity: 3,
					choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
				},
			})
			skillsFunc('conhecimento')
		}).toThrow()
	})
	it('should throw choosen more skills', () => {
		expect(() => {
			const skillsFunc = chooseSkills({
				skills: {
					fix: ['misticismo', 'vontade'],
					quantity: 1,
					choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
				},
			})
			skillsFunc('conhecimento', 'iniciativa')
		}).toThrow()
	})
	it('should throw choosen invalid skill', () => {
		expect(() => {
			const skillsFunc = chooseSkills({
				skills: {
					fix: ['misticismo', 'vontade'],
					quantity: 1,
					choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
				},
			})
			skillsFunc('misticismo')
		}).toThrow()
	})
	it('should throw choosen same skill', () => {
		expect(() => {
			const skillsFunc = chooseSkills({
				skills: {
					fix: ['misticismo', 'vontade'],
					quantity: 2,
					choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
				},
			})
			skillsFunc('conhecimento', 'conhecimento')
		}).toThrow()
	})
	it('should throw given invalid fix', () => {
		expect(() => {
			chooseSkills({
				skills: {
					fix: [1, 'vontade'],
					quantity: 1,
					choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
				},
			})
		}).toThrow()
	})
	it('should throw given invalid quantity', () => {
		expect(() => {
			chooseSkills({
				skills: {
					fix: ['misticismo', 'vontade'],
					quantity: 'c',
					choose: ['conhecimento', 'inciativa', 'ofício', 'percepção'],
				},
			})
		}).toThrow()
	})
	it('should throw given invalid choose', () => {
		expect(() => {
			chooseSkills({
				skills: {
					fix: ['misticismo', 'vontade'],
					quantity: 1,
					choose: [1, 'inciativa', 'ofício', 'percepção'],
				},
			})
		}).toThrow()
	})
})
