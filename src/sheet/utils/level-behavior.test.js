import LevelBehavior from './level-behavior.factory'
import { EventEmitter } from 'events'
describe('sheet composition level behavior', () => {
	let levelBehavior
	beforeEach(() => {
		levelBehavior = LevelBehavior()
		levelBehavior.addLevel('arcanista', 8)
		levelBehavior.addLevel('arcanista', 2)
		levelBehavior.addLevel('barbaro', 6)
		levelBehavior.setPerLevel('attribute', 1)
	})
	it('should get max value correctly', () => {
		const max = levelBehavior.max()
		expect(max).toBe(19)
	})
	it('should get max metadata correctly', () => {
		const meta = levelBehavior.maxMeta()
		expect(meta).toEqual({
			1: { arcanista: 8, attribute: 1 },
			2: { arcanista: 2, attribute: 1 },
			3: { barbaro: 6, attribute: 1 },
		})
	})
	it('should get round max negative per level bonus', () => {
		levelBehavior.setPerLevel('attribute', -6)
		const max = levelBehavior.max()
		expect(max).toBe(4)
		const meta = levelBehavior.maxMeta()
		expect(meta).toEqual({
			1: { arcanista: 8, attribute: -6 },
			2: { arcanista: 2, attribute: -6, roundOne: true },
			3: { barbaro: 6, attribute: -6, roundOne: true },
		})
	})
	it('should get cur value correctly', () => {
		const cur = levelBehavior.current()
		expect(cur).toBe(19)
	})
	it('should get cur metadata correctly', () => {
		const cur = levelBehavior.currentMeta()
		expect(cur).toEqual({ max: 19 })
	})
	it('should apply values to cur', () => {
		levelBehavior.apply(-4)
		const cur = levelBehavior.current()
		expect(cur).toBe(15)
		const meta = levelBehavior.currentMeta()
		expect(meta).toEqual({ max: 19, damage1: -4 })
	})
	it('should round apply to max when cur is greater', () => {
		levelBehavior.apply(-2)
		levelBehavior.apply(+5)
		const cur = levelBehavior.current()
		expect(cur).toBe(19)
		const meta = levelBehavior.currentMeta()
		expect(meta).toEqual({ max: 19, damage1: -2, heal1: 2 })
	})
	it('should round apply to -max when cur is lesser', () => {
		levelBehavior.apply(-3)
		levelBehavior.apply(-300)
		const cur = levelBehavior.current()
		expect(cur).toBe(-19)
		const meta = levelBehavior.currentMeta()
		expect(meta).toEqual({ max: 19, damage1: -3, damage2: -35 })
	})
})
