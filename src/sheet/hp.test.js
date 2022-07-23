import Hp from './hp.factory'
import { jest } from '@jest/globals'
describe('sheet hp factory', () => {
	let hp
	let sheet = {
		classes: {
			totalLevel: jest.fn().mockReturnValue(9),
		},
	}
	beforeEach(() => {
		hp = Hp(sheet)
	})
})
