import LevelBehavior from './level-behavior.factory'
import Attributes from '../attributes.factory'
import { EventEmitter } from 'events'
describe('sheet composition level behavior', () => {
	let levelBehavior
	let sheet = {
		emitter: new EventEmitter(),
	}
	let config = {
		arcanista: {
			levelOne: 8,
			levelUp: 2,
			level: 2,
		},
		barbaro: {
			levelUp: 6,
			level: 1,
		},
	}
	beforeEach(() => {
		sheet.attributes = Attributes({ con: 12, car: 18 }, sheet)
		levelBehavior = LevelBehavior(sheet, config, 'con')
	})
	it('should get max value correctly', () => {
		const max = levelBehavior.max()
		expect(max).toBe(19)
	})
	it('should get max metadata correctly', () => {
		const meta = levelBehavior.maxMeta()
		expect(meta).toEqual({
			arcanista_1: {
				level: 8,
				att_con: 1,
			},
			arcanista_2: {
				level: 2,
				att_con: 1,
			},
			barbaro_1: {
				level: 6,
				att_con: 1,
			},
		})
	})
	it('should update max when change attribute', () => {
		sheet.attributes.setOther('some', { con: 2 })
		const max = levelBehavior.max()
		expect(max).toBe(22)
	})
	it('should get round max negative per level bonus', () => {
		sheet.attributes.setOther('some', { con: -14 })
		const max = levelBehavior.max()
		expect(max).toBe(4)
		const meta = levelBehavior.maxMeta()
		expect(meta).toEqual({
			arcanista_1: {
				level: 8,
				att_con: -6,
			},
			arcanista_2: {
				level: 2,
				att_con: -6,
				adjuster: 5,
			},
			barbaro_1: {
				level: 6,
				att_con: -6,
				adjuster: 1,
			},
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
	it('should return correctly when having level1 two times', () => {
		config = {
			arcanista: {
				levelOne: 8,
				levelUp: 2,
				level: 2,
			},
			barbaro: {
				levelOne: 24,
				levelUp: 6,
				level: 1,
			},
		}
		levelBehavior = LevelBehavior(sheet, config, 'con')
		const max = levelBehavior.max()
		expect(max).toBe(19)
		const meta = levelBehavior.maxMeta()
		expect(meta).toEqual({
			arcanista_1: {
				level: 8,
				att_con: 1,
			},
			arcanista_2: {
				level: 2,
				att_con: 1,
			},
			barbaro_1: {
				level: 6,
				att_con: 1,
			},
		})
	})
	it('should work without attribute', () => {
		levelBehavior = LevelBehavior(sheet, config)
		const max = levelBehavior.max()
		expect(max).toBe(16)
		const meta = levelBehavior.maxMeta()
		expect(meta).toEqual({
			arcanista_1: {
				level: 8,
			},
			arcanista_2: {
				level: 2,
			},
			barbaro_1: {
				level: 6,
			},
		})
	})
})
