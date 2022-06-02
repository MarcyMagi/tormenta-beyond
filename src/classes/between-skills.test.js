import betweenSkills from './between-skills'
describe('class between skills test', () => {
	it('should create valid', () => {
		const fixFunc = betweenSkills({
			between: ['luta', 'pontaria'],
			fix: ['reflexos'],
		})
		expect(typeof fixFunc).toBe('function')
		const fix = fixFunc('pontaria')
		expect(fix).toEqual(['pontaria', 'reflexos'])
	})
	it('should throw given invalid skill on return func', () => {
		expect(() => {
			const fixFunc = betweenSkills({
				between: ['luta', 'pontaria'],
				fix: ['reflexos'],
			})
			fixFunc('reflexos')
		}).toThrow('class between skills error: invalid between skill')
	})
	it('should throw given not array in between', () => {
		expect(() => {
			betweenSkills({
				between: 1,
			})
		}).toThrow('class between skills error: between should be array')
	})
	it('should throw given not string element in between', () => {
		expect(() => {
			betweenSkills({
				between: [1],
			})
		}).toThrow('class between skills error: between[0] should be string')
	})
	it('should throw given not array in fix', () => {
		expect(() => {
			betweenSkills({
				between: ['luta', 'pontaria'],
				fix: 1,
			})
		}).toThrow('class between skills error: fix should be array')
	})
	it('should throw given not string element in fix', () => {
		expect(() => {
			betweenSkills({
				between: ['luta', 'pontaria'],
				fix: [1],
			})
		}).toThrow('class between skills error: fix[0] should be string')
	})
})
