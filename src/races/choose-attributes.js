import attributesFactory from '../sheet/attributes.factory'
import * as validator from '../utils/common-validators'
const errPrefix = 'choose attributes error'
export default (state) => {
	const quantity = state.attributesConfig.quantity
	const value = state.attributesConfig.value
	const fix = attributesFactory(state.attributesConfig.fix)

	validator.intValidator(quantity, 'quantity', errPrefix)
	validator.intValidator(value, 'value', errPrefix)

	for (const key of Object.keys(fix)) {
		if (fix[key] === 0) {
			delete fix[key]
		}
	}
	const func = (...args) => {
		validator.argsLength(quantity, args, 'function', errPrefix)
		let attributes = {}
		for (const arg of args) {
			if (fix[arg]) {
				throw new Error(`${errPrefix}: attribute '${arg}' is fixed`)
			}
			attributes[arg] = value
		}
		attributes = Object.assign(attributes, fix)
		attributes = attributesFactory(attributes)

		return Object.assign({}, attributes)
	}
	return func
}
