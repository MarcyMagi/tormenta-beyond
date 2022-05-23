import human from '../../services/races/humano.js'
describe('humano', () => {
	it('should create correctly with 2 skills', () => {
		const classModifiers = ['for', 'des', 'con']
		const versatilSpecs = {
			skills: ['acrobacia', 'reflexos'],
		}

		const res = human(classModifiers, versatilSpecs)
		expect(res.classModifiers).toEqual({
			for: 2,
			des: 2,
			con: 2,
		})
		expect(res.abilities.length).toBe(1)
		expect(res.abilities[0]).toEqual({
			name: 'versátil',
			specs: versatilSpecs,
		})
	})
})
