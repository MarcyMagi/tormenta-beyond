import { jest } from '@jest/globals'
import Attributes from './attributes.factory.js'
describe('sheet attributes factory', () => {
	let attributes
	const sheet = {
		emitter: {
			emit: jest.fn(),
		},
	}
	beforeEach(() => {
		attributes = Attributes(
			{
				for: 10,
				des: 12,
				con: 14,
				int: 16,
				sab: 17,
				car: 18,
			},
			sheet
		)
	})
	it('should get values correctly', () => {
		expect(attributes.values()).toEqual({
			for: 10,
			des: 12,
			con: 14,
			int: 16,
			sab: 17,
			car: 18,
		})
	})

	it('should get modifiers correctly', () => {
		expect(attributes.modifiers()).toEqual({
			for: 0,
			des: 1,
			con: 2,
			int: 3,
			sab: 3,
			car: 4,
		})
	})

	it('should get metadata correctly', () => {
		expect(attributes.meta()).toEqual({
			for: {
				base: 10,
			},
			des: {
				base: 12,
			},
			con: {
				base: 14,
			},
			int: {
				base: 16,
			},
			sab: {
				base: 17,
			},
			car: {
				base: 18,
			},
		})
	})
	it('should set other', () => {
		attributes.setOther('something', { for: 3, con: -2, wei: 2 })
		expect(attributes.modifiers().for).toBe(1)
		expect(attributes.modifiers().con).toBe(1)
		expect(attributes.modifiers().wei).toBeUndefined()
		expect(attributes.meta().for.something).toBe(3)
		expect(attributes.meta().des).toEqual({ base: 12 })
		expect(attributes.meta().con.something).toBe(-2)
		expect(attributes.meta().wei).toBeUndefined()
	})
	it('should remove other', () => {
		attributes.setOther('something', { for: 3, con: -2 })
		expect(attributes.meta().for.something).toBe(3)
		expect(attributes.meta().con.something).toBe(-2)
		attributes.removeOther('something')
		expect(attributes.meta().for).toEqual({ base: 10 })
		expect(attributes.meta().des).toEqual({ base: 12 })
	})
})
