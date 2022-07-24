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
		hp = Hp(sheet, 'con')
	})

	it('should get max correctly', () => {
		const max = hp.max()
		expect(max).toBe(19)
	})

	it('should get round max negative per level bonus', () => {
		const testSheet = Object.assign({}, sheet)
		testSheet.attributes = Attributes({ con: -2 })
		hp = Hp(testSheet, 'con')
		const max = hp.max()
		expect(max).toBe(4)
	})
	it('should get current value correctly', () => {
		const cur = hp.current()
		expect(cur).toBe(19)
	})
	it('should apply changes to current', () => {
		hp.apply(-2)
		const cur = hp.current()
		expect(cur).toBe(17)
		const max = hp.max()
		expect(max).toBe(19)
	})
	it('should not add more than max', () => {
		hp.apply(3)
		const cur = hp.current()
		const max = hp.max()
		expect(cur > max).toBe(false)
	})
	it('should not remove more than -max', () => {
		hp.apply(-100)
		const cur = hp.current()
		const max = hp.max()
		expect(cur < -max).toBe(false)
	})
	it('should add fix value to max', () => {
		hp.setFix('fix', 3)
		const max = hp.max()
		expect(max).toBe(22)
		const cur = hp.current()
		expect(cur).toBe(19)
	})
	it('should remove fix value from max', () => {
		hp.setFix('fix', 3)
		hp.removeFix('fix')
		const max = hp.max()
		expect(max).toBe(19)
	})
	it('should update current adding negative fix value', () => {
		hp.setFix('fix', -3)
		const max = hp.max()
		expect(max).toBe(16)
		const cur = hp.current()
		expect(cur).toBe(16)
	})
	it('should keep current removing negative fix value', () => {
		hp.setFix('fix', -3)
		hp.removeFix('fix')
		const max = hp.max()
		expect(max).toBe(19)
		const cur = hp.current()
		expect(cur).toBe(16)
	})
})
