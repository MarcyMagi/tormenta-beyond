import attributesFactory from '../sheet/attributes.factory'
export default (state) => {
	const attributesConfig = state.attributes
	const func = (...args) => {
		if (attributesConfig.quantity !== args.length) {
			throw new Error(
				`choose attributes error: function must recieve exactly ${attributesConfig.quantity} args`
			)
		}
		let attributes = {}
		for (const arg of args) {
			attributes[arg] = attributesConfig.value
		}
		attributes = attributesFactory(attributes)

		return Object.assign({}, attributes)
	}
	return func
}
