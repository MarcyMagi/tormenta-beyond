import versatil from './versatil.js'
import { EventEmitter } from 'events'
describe('ability versátil', () => {
	it('should return valid ability versátil given 2 skills', () => {
		const e = {
			on: () => {},
		}
		const ability = versatil(e, 'luta', 'guerra')
		expect(ability.name).toBe('versátil')
		expect(ability.description).toBeDefined()
		expect(ability.meta.skills[0]).toBe('luta')
		expect(ability.meta.skills[1]).toBe('guerra')
		expect(ability.meta.power).toBeUndefined()
	})
	it('should return valid ability versátil given 1 skill and one power', () => {
		const e = {
			on: () => {},
		}
		const ability = versatil(e, 'luta', 'esquiva', true)
		expect(ability.name).toBe('versátil')
		expect(ability.description).toBeDefined()
		expect(ability.meta.skills[0]).toBe('luta')
		expect(ability.meta.skills[1]).toBeUndefined()
		expect(ability.meta.power).toBe('esquiva')
	})
	it('should apply changes on sheet given 2 skills', () => {
		const e = new EventEmitter()
		versatil(e, 'luta', 'guerra')
		const sheet = {
			skills: {
				luta: {},
				guerra: {},
			},
			powers: [],
		}
		e.emit('applyOnSheet', sheet)
		expect(sheet.skills.luta.trained).toBe(true)
		expect(sheet.skills.guerra.trained).toBe(true)
		expect(sheet.powers[0]).toBeUndefined()
	})
	it('should apply changes on sheet given 1 skill and 1 power', () => {
		const e = new EventEmitter()
		versatil(e, 'luta', 'esquiva', true)
		const sheet = {
			skills: {
				luta: {
					trained: false,
				},
				guerra: {
					trained: false,
				},
			},
			powers: [],
		}
		e.emit('applyOnSheet', sheet)
		expect(sheet.skills.luta.trained).toBe(true)
		expect(sheet.skills.guerra.trained).toBe(false)
		expect(sheet.powers[0]).toBe('esquiva')
	})
})
