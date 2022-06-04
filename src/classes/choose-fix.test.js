import chooseFix from './choose-fix'
describe('class choose fix skills test', () => {
	it('should create valid', () => {
		const fixFunc = chooseFix({
			choose: ['luta', 'pontaria'],
			fix: ['reflexos'],
		})
		expect(typeof fixFunc).toBe('function')
		const fix = fixFunc('pontaria')
		expect(fix).toEqual(['pontaria', 'reflexos'])
	})
	it('should throw given invalid skill on return func', () => {
		expect(() => {
			const fixFunc = chooseFix({
				choose: ['luta', 'pontaria'],
				fix: ['reflexos'],
			})
			fixFunc('reflexos')
		}).toThrow("class choose fix error: argument 'reflexos' not valid")
	})
	it('should throw given not array in choose', () => {
		expect(() => {
			chooseFix({
				choose: 1,
			})
		}).toThrow('class choose fix error: choose should be array')
	})
	it('should throw given not string element in choose', () => {
		expect(() => {
			chooseFix({
				choose: [1],
			})
		}).toThrow('class choose fix error: choose[0] should be string')
	})
	it('should throw given not array in fix', () => {
		expect(() => {
			chooseFix({
				choose: ['luta', 'pontaria'],
				fix: 1,
			})
		}).toThrow('class choose fix error: fix should be array')
	})
	it('should throw given not string element in fix', () => {
		expect(() => {
			chooseFix({
				choose: ['luta', 'pontaria'],
				fix: [1],
			})
		}).toThrow('class choose fix error: fix[0] should be string')
	})
})
