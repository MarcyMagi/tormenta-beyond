const attributes = ['for', 'des', 'con', 'int', 'sab', 'car']
export default (name, attribute, config = {}) => {
	if (name === '') {
		throw new Error('skill error: name cannot be empty string')
	}
	if (!attributes.includes(attribute)) {
		throw new Error('skill error: attribute must be valid')
	}
	const armorPenalty = config.armorPenalty ? config.armorPenalty : false
	const onlyTrained = config.onlyTrained ? config.onlyTrained : false

	return Object.assign({}, { name, attribute, armorPenalty, onlyTrained })
}
