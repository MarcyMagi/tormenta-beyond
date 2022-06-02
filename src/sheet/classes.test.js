import classes from './classes'

describe('classes manager test', () => {
	it('should loaded all classes', () => {
		expect(classes['arcanista']).toBeDefined()
		expect(classes['bárbaro']).toBeDefined()
		expect(classes['bardo']).toBeDefined()
		expect(classes['bucaneiro']).toBeDefined()
		expect(classes['caçador']).toBeDefined()
		expect(classes['cavaleiro']).toBeDefined()
		expect(classes['clérigo']).toBeDefined()
		expect(classes['druida']).toBeDefined()
		expect(classes['guerreiro']).toBeDefined()
		expect(classes['inventor']).toBeDefined()
		expect(classes['ladino']).toBeDefined()
		expect(classes['lutador']).toBeDefined()
		expect(classes['nobre']).toBeDefined()
		expect(classes['paladino']).toBeDefined()
	})
})
