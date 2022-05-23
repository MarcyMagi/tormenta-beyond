import { defaultSkills, defaultPower } from '../configs/sheet.config.js'
import ability from './ability.js'

const name = 'versátil'

const validateSkill = (skill) => {
	if (!defaultSkills.includes(skill)) {
		throw new Error('ability versatil error: invalid skill')
	}
}

const validatePower = (power) => {
	if (power && !defaultPower.includes(power)) {
		throw new Error('ability versatil error: invalid power')
	}
}

export default (skill1th, type2th, value2th) => {
	let skills = [skill1th]
	let power
	switch (type2th) {
		case 'skill':
			skills.push(value2th)
			break
		case 'power':
			power = value2th
			break
		default:
			throw new Error('ability versatil error: invalid second argument')
	}

	for (let skill of skills) {
		validateSkill(skill)
	}
	const applyInSkill = (sheet) => {}

	let applyInPower
	if (power) {
		validatePower(power)
		applyInPower = (sheet) => {}
	}

	const meta = {
		skills,
		power,
	}

	return Object.assign({}, ability(name, { applyInSkill, applyInPower }, meta))
}
