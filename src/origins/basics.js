import * as validator from '../utils/common-validators'
export default (state) => {
	const name = state.name
	const description = state.description

	validator.stringValidator(name)
	validator.stringValidator(description)

	return Object.assign({}, { name, description })
}
