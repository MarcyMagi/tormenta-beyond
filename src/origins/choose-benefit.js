import * as validator from '../utils/common-validators'
const errPrefix = 'origin choose benefit error'
export default (state) => {
	const chooseSkills = state.benefit.skills
	const choosePowers = state.benefit.powers

	const dup = chooseSkills.some((r) => choosePowers.includes(r))
	if (dup) {
		throw new Error(
			errPrefix + ': skills and powers has element with same value'
		)
	}

	validator.stringArrayValitador(chooseSkills, 'skills', errPrefix)
	validator.stringArrayValitador(choosePowers, 'powers', errPrefix)

	const func = (arg1, arg2) => {
		validator.stringValidator(arg1, 'arg1', errPrefix)
		validator.stringValidator(arg2, 'arg2', errPrefix)
		const skills = []
		const powers = []
		const add = (arg) => {
			if (chooseSkills.includes(arg)) {
				skills.push(arg)
			} else if (choosePowers.includes(arg)) {
				powers.push(arg)
			} else {
				throw new Error(errPrefix + ': arg is not benefit')
			}
		}
		add(arg1)
		add(arg2)
		return Object.assign({}, { skills, powers })
	}
	return func
}
