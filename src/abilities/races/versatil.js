import { defaultSkills, defaultPower } from '../../configs/sheet.config.js'
import abilityFactory from '../ability.factory.js'

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

	let meta = {}

	for (let skill of skills) {
		validateSkill(skill)
	}

	meta.skills = skills

	if (power) {
		validatePower(power)
		meta.power = power
	}
	const setOnSheet = (sheet) => {
		for (let skill of skills) {
			sheet.skills[skill].trained = true
		}
		if (power) {
			sheet.powers.push(power)
		}
	}

	return Object.assign({}, abilityFactory(name, { setOnSheet }, meta))
}
