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
	it('should create valid with between fix values', () => {
		const skillsFunc = chooseSkills({
			skills: {
				fixConfig: {
					between: ['luta', 'pontaria'],
					fix: ['vontade'],
				},
				quantity: 1,
				choose: ['conhecimento'],
			},
		})
		const skills = skillsFunc('luta', 'conhecimento')
		expect(skills).toEqual(['luta', 'vontade', 'conhecimento'])
	})
	it('should create valid with between fix values', () => {
		const skillsFunc = chooseSkills({
			skills: {
				fixConfig: {
					between: ['luta', 'pontaria'],
					fix: ['vontade'],
				},
				quantity: 1,
				choose: ['luta', 'pontaria'],
			},
		})
		expect(() => {
			skillsFunc('luta', 'luta')
		}).toThrow('choose skills error: duplicate skill')
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
		}).toThrow("choose skills error: function must recieve exactly '3' args")
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
		}).toThrow("choose skills error: function must recieve exactly '1' args")
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
		}).toThrow('choose skills error: invalid choose skill')
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
		}).toThrow('choose skills error: duplicate skill')
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
		}).toThrow('choose skills error: fix[0] should be string')
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
		}).toThrow('choose skills error: quantity should be number')
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
		}).toThrow('choose skills error: choose[0] should be string')
	})
})
