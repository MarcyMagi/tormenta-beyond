import basic from './races/basic'
import customModifiers from './races/custom-modifiers'
export default (state, values) => {
	return Object.assign(
		{},
		basic(state),
		customModifiers(state, values.customModifiers)
	)
}
