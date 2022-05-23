import { defaultSkills } from '../../configs/sheet.config'

const name = 'versátil'

const validate = (specs) => {
	const skillLength = specs.skills.length
	if (skillLength === 0) {
		throw new Error('versátil need at least one skill')
	}
	if (skillLength > 2) {
		throw new Error('versátil cannot have more than two skills')
	}
}

const validateSkill = (skill) => {
	if (!defaultSkills.includes(skill)) {
		throw new Error(`versátil Error: ${skill} is not a skill`)
	}
}

export default (specs) => {
	validate(specs)
	let versatilObj = {
		name,
		skills: {},
	}

	for (const skill of specs.skills) {
		validateSkill(skill)
		versatilObj.skills[skill] = {}
		versatilObj.skills[skill].trained = 1
	}
	versatilObj.power = specs.power

	return Object.assign({}, versatilObj)
}
