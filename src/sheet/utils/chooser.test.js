import chooser from './chooser.js'
import { jest } from '@jest/globals'
import { choose } from '../../../data/utils.js'

describe('sheet utils chooser', () => {
	const nameMock = jest.fn((name) => name)
	const skillsMock = jest.fn((fi, se, th) => [fi, se, th])
	let choise
	const recChoise = choose(
		'Choose subrace',
		['foo', 'bar'],
		1,
		jest.fn((sub) => ({
			name: sub,
			skills: choose('choose Skill', ['A', 'B'], 1, (skill) => skill),
		}))
	)
	beforeEach(() => {
		choise = {
			name: choose('Choose name', ['foo', 'bar'], 1, nameMock),
			skills: choose(
				'Choose 3 skills',
				['A', 'B', 'C', 'D', 'E'],
				3,
				skillsMock
			),
			fixData: 'hello',
		}
	})
	it('should return correctly', () => {
		const chosen = chooser(choise, {
			name: ['foo'],
			skills: ['B', 'D', 'A'],
		})
		expect(nameMock.mock.calls.length).toBe(1)
		expect(skillsMock.mock.calls.length).toBe(1)
		expect(chosen).toEqual({
			name: 'foo',
			skills: ['B', 'D', 'A'],
			fixData: 'hello',
		})
	})
	it('should fail given more or less agrs', () => {
		expect(() => {
			const chosen = chooser(choise, {
				name: ['foo'],
				skills: ['B', 'A'],
			})
		}).toThrow()
	})
	it('should fail if invalid arg', () => {
		expect(() => {
			chooser(choise, {
				name: ['baz'],
				skills: ['B', 'D', 'A'],
			})
		}).toThrow()
	})
	it('should work recursively', () => {
		const recChoiseInside = {
			some: Object.assign({}, recChoise),
		}
		const chosen = chooser(recChoiseInside, {
			some: ['foo'],
			skills: ['A'],
		})
		expect(chosen).toEqual({ some: { name: 'foo', skills: 'A' } })
	})
	it('should work on root', () => {
		const rootChoise = Object.assign({}, recChoise)
		const chosen = chooser(rootChoise, { root: ['bar'], skills: ['A'] })
		expect(chosen).toEqual({ name: 'bar', skills: 'A' })
	})
})
