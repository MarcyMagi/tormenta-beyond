import Hp from './hp.factory'
import Attributes from './attributes.factory'
import { jest } from '@jest/globals'
describe('sheet hp factory', () => {
	let hp
	let sheet = {
		attributes: Attributes({ con: 12, car: 18 }),
		classes: {
			list: {
				arcanista: {
					level1: 8,
					levelup: 2,
					isFirst: true,
					level: jest.fn().mockReturnValue(2),
				},
				barbaro: {
					level1: 24,
					levelup: 6,
					level: jest.fn().mockReturnValue(1),
				},
			},
			totalLevel: jest.fn().mockReturnValue(3),
		},
	}
	beforeEach(() => {
		sheet.attributes = Attributes({ con: 12, car: 18 })
		hp = Hp(sheet, 'con')
	})

	it('should get max correctly', () => {
		const max = hp.max()
		expect(max).toBe(19)
	})
	it('should get max metadata correctly', () => {
		const meta = hp.metaMax()
		expect(meta).toEqual({ 'arcanista_1*': 9, arcanista_2: 3, barbaro_1: 7 })
	})
	it('should get round max negative per level bonus', () => {
		sheet.attributes = Attributes({ con: -2 })
		hp = Hp(sheet, 'con')
		const max = hp.max()
		expect(max).toBe(4)
		const meta = hp.metaMax()
		expect(meta).toEqual({ 'arcanista_1*': 2, arcanista_2: 1, barbaro_1: 1 })
	})
	it('should get current value correctly', () => {
		const cur = hp.current()
		expect(cur).toBe(19)
	})
	it('should get current metadata correctly', () => {
		const meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19 })
	})
	it('should apply changes to current', () => {
		hp.apply(-2)
		hp.apply(-3)
		const cur = hp.current()
		expect(cur).toBe(14)
		const meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -2, damage2: -3 })
	})
	it('should not add more than max', () => {
		hp.apply(3)
		const cur = hp.current()
		const max = hp.max()
		expect(cur).toBe(max)
		let meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19 })
		hp.apply(-2)
		hp.apply(4)
		meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -2, heal1: 2 })
	})
	it('should not remove more than -max', () => {
		hp.apply(-100)
		const cur = hp.current()
		const max = hp.max()
		expect(cur).toBe(-max)
		let meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -38 })
		hp.apply(4)
		hp.apply(-7)
		meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19, damage1: -38, heal1: 4, damage2: -4 })
	})
	it('should be able to apply with custom key', () => {
		hp.apply(-2, 'megaDamage')
		let meta = hp.metaCurrent()
		expect(meta).toEqual({ max: 19, megaDamage1: -2 })
	})
	it('should add fix value to max', () => {
		hp.setFix('fix', 3)
		const max = hp.max()
		expect(max).toBe(22)
		const cur = hp.current()
		expect(cur).toBe(22)
		const meta = hp.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 9,
			arcanista_2: 3,
			barbaro_1: 7,
			fix: 3,
		})
	})
	it('should remove fix value from max', () => {
		hp.setFix('fix', 3)
		hp.removeFix('fix')
		const max = hp.max()
		expect(max).toBe(19)
		const meta = hp.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 9,
			arcanista_2: 3,
			barbaro_1: 7,
		})
	})
	it('should update max if attribute change', () => {
		sheet.attributes.setOther('new', { con: 2 })
		const max = hp.max()
		expect(max).toBe(22)
		const meta = hp.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 10,
			arcanista_2: 4,
			barbaro_1: 8,
		})
	})
	it('should update max and cur if negative attribute change', () => {
		sheet.attributes.setOther('new', { con: -2 })
		const max = hp.max()
		expect(max).toBe(16)
		const meta = hp.metaMax()
		expect(meta).toEqual({
			'arcanista_1*': 8,
			arcanista_2: 2,
			barbaro_1: 6,
		})
	})
})
