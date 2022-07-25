import Attributes from './attributes.factory'
import Hp from './hp.factory'
import { jest } from '@jest/globals'
describe('sheet hp factory', () => {
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
	const hp = Hp(sheet)
	it('should create correctly', () => {
		const max = hp.max()
		expect(max).toBe(19)
		let metaMax = hp.metaMax()
		expect(metaMax).toEqual({ 'arcanista_1*': 9, arcanista_2: 3, barbaro_1: 7 })
		hp.apply(-2)
		const cur = hp.current()
		expect(cur).toBe(17)
		const metaCur = hp.metaCurrent()
		expect(metaCur).toEqual({ max: 19, damage1: -2 })
		hp.setFix('some', 2)
		metaMax = hp.metaMax()
		expect(metaMax).toEqual({
			'arcanista_1*': 9,
			arcanista_2: 3,
			barbaro_1: 7,
			some: 2,
		})
		hp.removeFix('some')
		metaMax = hp.metaMax()
		expect(metaMax).toEqual({
			'arcanista_1*': 9,
			arcanista_2: 3,
			barbaro_1: 7,
		})
	})
})
