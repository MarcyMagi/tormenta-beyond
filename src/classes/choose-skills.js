import * as validator from '../utils/common-validators'
import betweenSkills from './between-skills'
const errPrefix = 'choose skills error'
export default (state) => {
	const quantity = state.skills.quantity
	const choose = state.skills.choose

	validator.intValidator(quantity, 'quantity', errPrefix)
	validator.stringArrayValitador(choose, 'choose', errPrefix)

	let fix

	if (state.skills.fixConfig) {
		console.log(state.name)
		const fixConfig = state.skills.fixConfig
		fix = betweenSkills(fixConfig)
	} else {
		fix = state.skills.fix
		validator.stringArrayValitador(fix, 'fix', errPrefix)
	}

	const func = (...args) => {
		if (typeof fix === 'function') {
			fix = fix(args[0])
			args.shift()
		}

		validator.argsLength(quantity, args, 'function', errPrefix)
		let skills = [...fix]
		for (const arg of args) {
			if (!choose.includes(arg)) {
				throw new Error(`${errPrefix}: invalid choose skill`)
			}
			if (skills.includes(arg)) {
				throw new Error(`${errPrefix}: duplicate skill`)
			}
			skills.push(arg)
		}
		return skills
	}
	return func
}
