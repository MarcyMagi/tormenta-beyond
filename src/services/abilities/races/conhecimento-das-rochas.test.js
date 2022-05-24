import conhecimentoDasRochas from './conhecimento-das-rochas.js'
import { EventEmitter } from 'events'

describe('ability conhecimento das rochas', () => {
	it('should return valid ability conhecimento das rochas', () => {
		const e = {
			on: () => {},
		}
		const ability = conhecimentoDasRochas(e)
		expect(ability.name).toBe('conhecimento das rochas')
		expect(ability.description).toBeDefined()
	})
	it('should apply changes when enter condition', () => {
		const e = new EventEmitter()
		conhecimentoDasRochas(e)
		const sheet = {
			skills: {
				percepcao: {
					others: [],
				},
				sobrevivencia: {
					others: [],
				},
			},
			advantages: [],
		}
		e.emit('enterCondition[subterraneo]', sheet)

		const sheetPercepcao = sheet.skills.percepcao
		const sheetSobrevivencia = sheet.skills.sobrevivencia

		expect(sheetPercepcao.others[0].origin).toBe('conhecimento das rochas')
		expect(sheetPercepcao.others[0].value).toBe(2)

		expect(sheetSobrevivencia.others[0].origin).toBe('conhecimento das rochas')
		expect(sheetSobrevivencia.others[0].value).toBe(2)

		expect(sheet.advantages[0]).toBe('visão no escuro')
	})
	it('should apply changes when enter condition', () => {
		const e = new EventEmitter()
		conhecimentoDasRochas(e)
		const sheet = {
			skills: {
				percepcao: {
					others: [
						{
							origin: 'conhecimento das rochas',
							value: 2,
						},
					],
				},
				sobrevivencia: {
					others: [
						{
							origin: 'conhecimento das rochas',
							value: 2,
						},
					],
				},
			},
			advantages: ['visão no escuro'],
		}
		e.emit('leaveCondition[subterraneo]', sheet)

		const sheetPercepcao = sheet.skills.percepcao
		const sheetSobrevivencia = sheet.skills.sobrevivencia

		expect(sheetPercepcao.others[0]).toBeUndefined()
		expect(sheetSobrevivencia.others[0]).toBeUndefined()
		expect(sheet.advantages[0]).toBeUndefined()
	})
})
