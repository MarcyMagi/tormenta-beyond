import attributesUtils from './attributes-utils.js'
import choose from './choose.js'
export default (config) => {
	return {
		attributes: attributesUtils(config.defaultAttributes),
		choose,
	}
}
