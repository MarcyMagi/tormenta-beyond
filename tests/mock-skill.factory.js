import { jest } from '@jest/globals'

export default () => {
	let skillNumber = 1
	const mockSkill = jest.fn((attribute) => {
		const skill = {
			label: 'skill' + skillNumber,
			description: '',
			attribute: attribute,
			armorPenalty: false,
			onlyTrained: false,
		}
		skillNumber++
		return skill
	})
	return mockSkill
}
