import race from './race'
describe('factory race', () => {
	it('should create valid', () => {
		const newRace = race(
			'new',
			'hello world!',
			'this new people, imaright?',
			{
				for: 2,
				des: 2,
				con: 2,
			},
			['newbie']
		)
		expect(newRace).toEqual({
			name: 'new',
			description: 'hello world!',
			tale: 'this new people, imaright?',
			modifiers: {
				for: 2,
				des: 2,
				con: 2,
			},
			abilities: ['newbie'],
		})
	})
})
