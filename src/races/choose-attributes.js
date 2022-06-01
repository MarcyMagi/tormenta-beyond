import attributesFactory from '../sheet/attributes.factory'
export default (state) => {
	const attributesConfig = state.attributesConfig
	const fix = attributesFactory(attributesConfig.fix)
	for (const key of Object.keys(fix)) {
		if (fix[key] === 0) {
			delete fix[key]
		}
	}
	const func = (...args) => {
		if (attributesConfig.quantity !== args.length) {
			throw new Error(
				`choose attributes error: function must recieve exactly '${attributesConfig.quantity}' args`
			)
		}
		let attributes = {}
		for (const arg of args) {
			if (fix[arg]) {
				throw new Error(`choose attributes error: attribute '${arg}' is fixed`)
			}
			attributes[arg] = attributesConfig.value
		}
		attributes = Object.assign(attributes, fix)
		attributes = attributesFactory(attributes)

		return Object.assign({}, attributes)
	}
	return func
}
