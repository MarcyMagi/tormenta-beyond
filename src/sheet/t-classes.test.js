import TClasses from './t-classes.factory'
import tClassArcanista from '../../data/t-classes/arcanista'
import { EventEmitter } from 'events'
describe.skip('sheet factory classes', () => {
	const sheet = {
		emitter: new EventEmitter(),
	}
	const arcanistaConfig = tClassArcanista()
	let tClass
	beforeEach(() => {
		tClass = TClasses(arcanistaConfig)
	})
	it('should get HP metadata correctly', () => {
		expect(tClass.hpMeta()).toEqual({
			levelOne: 8,
			levelUp: 2,
		})
	})
	it('should get MP metadata correctly', () => {
		expect(tClass.hpMeta()).toEqual({
			levelUp: 6,
		})
	})
})
