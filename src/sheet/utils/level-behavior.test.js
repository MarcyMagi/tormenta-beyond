import LevelBehavior from './level-behavior.factory'
import Attributes from '../attributes.factory'
import { jest } from '@jest/globals'
describe('sheet levelBehavior factory', () => {
	let levelBehavior
	let sheet = {
		attributes: Attributes({ con: 12, car: 18 }),
		classes: {
			list: {
				arcanista: {
					hp: {
						level1: 8,
						levelup: 2,
					},
					isFirst: true,
					level: jest.fn().mockReturnValue(2),
				},
				barbaro: {
					hp: {
						level1: 24,
						levelup: 6,
					},
					level: jest.fn().mockReturnValue(1),
				},
			},
			totalLevel: jest.fn().mockReturnValue(3),
		},
	}
	beforeEach(() => {
		sheet.attributes = Attributes({ con: 12, car: 18 })
		levelBehavior = LevelBehavior(sheet, 'hp', 'con')
	})

	it('should get max correctly', () => {
		const max = levelBehavior.max()
		expect(max).toBe(19)
	})
	it('should get max metadata correctly', () => {
		const meta = levelBehavior.metaMax()
		expect(meta).toEqual({ 'arcanista_1*': 9, arcanista_2: 3, barbaro_1: 7 })
	})
	it('should get round max negative per level bonus', () => {
		sheet.attributes.setOther('some', { con: -14 })
		const max = levelBehavior.max()
		expect(max).toBe(4)
		const meta = levelBehavior.metaMax()
		expect(meta).toEqual({ 'arcanista_1*': 2, arcanista_2: 1, barbaro_1: 1 })
	})
	it('should get current value correctly', () => {
		const cur = levelBehavior.current()
		expect(cur).toBe(19)
	})
	it('should get current metadata correctly', () => {
		const meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19 })
	})
	it('should apply changes to current', () => {
		levelBehavior.apply(-2)
		levelBehavior.apply(-3)
		const cur = levelBehavior.current()
		expect(cur).toBe(14)
		const meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -2, damage2: -3 })
	})
	it('should not add more than max', () => {
		levelBehavior.apply(3)
		const cur = levelBehavior.current()
		const max = levelBehavior.max()
		expect(cur).toBe(max)
		let meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19 })
		levelBehavior.apply(-2)
		levelBehavior.apply(4)
		meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -2, heal1: 2 })
	})
	it('should not remove more than -max', () => {
		levelBehavior.apply(-100)
		const cur = levelBehavior.current()
		const max = levelBehavior.max()
		expect(cur).toBe(-max)
		let meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -38 })
		levelBehavior.apply(4)
		levelBehavior.apply(-7)
		meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -38, heal1: 4, damage2: -4 })
	})
	it('should be able to apply with custom key', () => {
		levelBehavior.apply(-2, 'megaDamage')
		let meta = levelBehavior.metaCurrent()
		expect(meta).toEqual({ max: 19, megaDamage1: -2 })
	})
	it('should add fix value to max', () => {
		levelBehavior.setFix('fix', 3)
		const max = levelBehavior.max()
		expect(max).toBe(22)
		const cur = levelBehavior.current()
		expect(cur).toBe(22)
		const meta = levelBehavior.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 9,
			arcanista_2: 3,
			barbaro_1: 7,
			fix: 3,
		})
	})
	it('should remove fix value from max', () => {
		levelBehavior.setFix('fix', 3)
		levelBehavior.removeFix('fix')
		const max = levelBehavior.max()
		expect(max).toBe(19)
		const meta = levelBehavior.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 9,
			arcanista_2: 3,
			barbaro_1: 7,
		})
	})
	it('should update max if attribute change', () => {
		sheet.attributes.setOther('new', { con: 2 })
		const max = levelBehavior.max()
		expect(max).toBe(22)
		const meta = levelBehavior.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 10,
			arcanista_2: 4,
			barbaro_1: 8,
		})
	})
	it('should update max and cur if negative attribute change', () => {
		sheet.attributes.setOther('new', { con: -2 })
		const max = levelBehavior.max()
		expect(max).toBe(16)
		const meta = levelBehavior.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 8,
			arcanista_2: 2,
			barbaro_1: 6,
		})
	})
})
