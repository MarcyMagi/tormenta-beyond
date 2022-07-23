import { jest } from '@jest/globals'
import PointBehavior from './point-behavior.factory'
describe('sheet composition point behavior', () => {
	let pointBehavior
	beforeEach(() => {
		pointBehavior = PointBehavior(
			{
				fix: {
					class: {
						0: 8,
					},
					other: 1,
				},
				perLevel: { class: 2, con: -1 },
			},
			{
				classes: {
					totalLevel: jest.fn().mockReturnValue(10),
				},
			}
		)
	})
	it('should get max dict', () => {
		const meta = pointBehavior.dict()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
		})
	})
	it('should calculate max', () => {
		const n = pointBehavior.max()
		expect(n).toBe(17)
	})
	it('should set perLevel bonus', () => {
		pointBehavior.setPerLevel('new', 2)
		const meta = pointBehavior.dict()
		const n = pointBehavior.max()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
			new: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		})
		expect(n).toBe(37)
	})
	it('should remove perLevel bonus', () => {
		pointBehavior.setPerLevel('new', 2)
		pointBehavior.removePerLevel('new')
		const meta = pointBehavior.dict()
		const n = pointBehavior.max()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
		})
		expect(n).toBe(17)
	})
	it('should set fix bonus', () => {
		pointBehavior.setFix('new', 3)
		const meta = pointBehavior.dict()
		const n = pointBehavior.max()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
			new: 3,
		})
		expect(n).toBe(20)
	})
	it('should remove fix bonus', () => {
		pointBehavior.setFix('new', 3)
		pointBehavior.removeFix('new')
		const meta = pointBehavior.dict()
		const n = pointBehavior.max()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
		})
		expect(n).toBe(17)
	})
	it('should add fix bonus on perLevel index', () => {
		pointBehavior.setFix('con', { 2: 4 })
		const meta = pointBehavior.dict()
		const n = pointBehavior.max()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, 4, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
		})
		expect(n).toBe(22)
	})
	it('should remove fix bonus on perLevel index', () => {
		pointBehavior.setFix('con', { 2: 4 })
		pointBehavior.removeFix('con')
		const meta = pointBehavior.dict()
		const n = pointBehavior.max()
		expect(meta).toEqual({
			class: [8, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			con: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			other: 1,
		})
		expect(n).toBe(17)
	})
	it('should get cur', () => {
		const cur = pointBehavior.cur()
		expect(cur).toBe(17)
	})
	it('should apply value to cur', () => {
		pointBehavior.apply(-3)
		const cur = pointBehavior.cur()
		expect(cur).toBe(14)
	})
	it('should not apply more then max', () => {
		pointBehavior.apply(5)
		const cur = pointBehavior.cur()
		expect(cur).toBe(17)
	})
	it('should not apply if less then absolute max', () => {
		pointBehavior.apply(-40)
		const cur = pointBehavior.cur()
		expect(cur).toBe(-17)
	})
})
