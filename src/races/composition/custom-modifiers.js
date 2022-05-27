export default (state, attributes) => {
	const modifiers = state.modifiers
	const config = state.customModifiers
	if (attributes.length !== config.max) {
		throw new Error(
			`${state.name} race error: can only change ${config.max} attributes`
		)
	}
	for (const attribute of attributes) {
		modifiers[attribute] = config.value
	}
	return Object.assign({}, { modifiers })
}
