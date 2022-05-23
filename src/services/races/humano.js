import { defaultAttributes } from '../../configs/sheet.config.js'

export default (classModifiers, versatilSpecs) => {
	if (classModifiers.length !== 3) {
		throw new Error('attributeModifiers must have 3 elements')
	}

	let modifiers = {}
	for (const attribute of classModifiers) {
		if (!defaultAttributes.includes(attribute)) {
			throw new Error('attribute does not exists')
		}
		modifiers[attribute] = 2
	}

	let abilities = [
		{
			name: 'versátil',
			specs: versatilSpecs,
		},
	]

	return { classModifiers: modifiers, abilities }
}
