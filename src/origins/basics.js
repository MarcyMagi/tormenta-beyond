import * as validator from '../utils/common-validators'
export default (state) => {
	const name = state.name
	const description = state.description
	const items = state.items

	validator.stringValidator(name)
	validator.stringValidator(description)
	validator.stringArrayValitador(items)

	return Object.assign({}, { name, description, items })
}
