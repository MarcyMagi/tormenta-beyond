import * as validator from '../utils/common-validators'
const errPrefix = 'choose skills error'
export default (state) => {
	const fix = state.skills.fix
	const quantity = state.skills.quantity
	const choose = state.skills.choose

	validator.stringArrayValitador(fix, 'fix', errPrefix)
	validator.intValidator(quantity, 'quantity', errPrefix)
	validator.stringArrayValitador(choose, 'choose', errPrefix)

	const func = (...args) => {
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
