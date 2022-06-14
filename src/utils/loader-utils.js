import _attributesUtils from './attributes-utils.js'
import _choose from './choose.js'
export default (config) => {
	const attributesUtils = _attributesUtils(config.defaultAttributes)
	const choose = _choose
	return Object.freeze({ attributesUtils, choose })
}
