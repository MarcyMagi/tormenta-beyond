import Hp from './hp.factory'
import { jest } from '@jest/globals'
describe('sheet hp factory', () => {
	let hp
	let sheet = {
		attributes: {
			modifiers: jest.fn().mockReturnValue({
				con: 1,
				car: 4,
			}),
		},
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

	it.only('should get max correctly', () => {
		const max = hp.max()
		expect(max).toBe(19)
	})

	it('should get max correctly with negative levelUp', () => {
		sheet.attributes.modifiers.mockReturnValueOnce({ con: -6, car: 3 })
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
	it.skip('should add fix value to max', () => {
		hp.setFix('fix', 3)
		const max = hp.max()
		expect(max).toBe(22)
		const cur = hp.cur()
		expect(cur).toBe(19)
	})
})
