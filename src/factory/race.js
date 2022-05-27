import basic from './races/basic'
import customModifiers from './races/custom-modifiers'
export default (state, meta) => {
	return Object.assign(
		{},
		basic(state),
		customModifiers(state, meta.customModifiers)
	)
}
