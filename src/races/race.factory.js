import basic from './composition/basic.js'
import customModifiers from './composition/custom-modifiers.js'
export default (state, values) => {
	return Object.assign(
		{},
		basic(state),
		customModifiers(state, values.customModifiers)
	)
}
