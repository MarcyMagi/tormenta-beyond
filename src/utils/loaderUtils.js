import _attributesUtils from './attributesUtils.js'
import _choose from './choose.js'
export default (config) => {
	const attributesUtils = _attributesUtils(config.defaultAttributes)
	const choose = _choose
	return Object.assign({}, { attributesUtils, choose })
}
