import basics from './basics'
import normalAttributes from './normal-attributes'
import chooseAttributes from './choose-attributes'
export default (state) => {
	let attributes
	if (state.attributesConfig) {
		attributes = chooseAttributes(state.attributesConfig)
	} else {
		attributes = normalAttributes(state)
	}
	return Object.assign({}, basics(state), { attributes })
}
