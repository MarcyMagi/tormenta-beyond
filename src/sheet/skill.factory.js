import { defaultAttributes } from '../config/sheet-defaults.js'
export default (name, attribute, config = {}) => {
	if (name === '') {
		throw new Error('skill error: name cannot be empty string')
	}
	if (!defaultAttributes.includes(attribute)) {
		throw new Error('skill error: attribute must be valid')
	}
	const armorPenalty = config.armorPenalty ? config.armorPenalty : false
	const onlyTrained = config.onlyTrained ? config.onlyTrained : false

	return Object.assign({}, { name, attribute, armorPenalty, onlyTrained })
}
