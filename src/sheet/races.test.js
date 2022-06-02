import races from './races'

describe('races manager test', () => {
	it('should loaded all races', () => {
		expect(races['humano']).toBeDefined()
		expect(races['anão']).toBeDefined()
		expect(races['dahllan']).toBeDefined()
		expect(races['elfo']).toBeDefined()
		expect(races['goblin']).toBeDefined()
		expect(races['lefou']).toBeDefined()
		expect(races['minotauro']).toBeDefined()
		expect(races['qareen']).toBeDefined()
		expect(races['golem']).toBeDefined()
		expect(races['hynne']).toBeDefined()
		expect(races['kliren']).toBeDefined()
		expect(races['medusa']).toBeDefined()
		expect(races['osteon']).toBeDefined()
		expect(races['sereia']).toBeDefined()
		expect(races['sílfide']).toBeDefined()
		expect(races['aggelus']).toBeDefined()
		expect(races['sulfure']).toBeDefined()
		expect(races['trog']).toBeDefined()
	})
})
