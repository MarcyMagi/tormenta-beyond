import { defaultAttributes, defaultSizes } from '../configs/sheet.config.js'

export default (modifiers, abilities, size = 'médio', speed = 9) => {
	const validateModifiers = () => {
		for (const modifier of Object.keys(modifiers)) {
			if (!defaultAttributes.includes(modifier)) {
				throw new Error('race error: one or more modifiers is not valid')
			}
		}
	}
	const validateSize = () => {
		if (!defaultSizes.includes(size)) {
			throw new Error('race error: size is not valid')
		}
	}
	const validateSpeed = () => {
		if (!Number.isInteger(speed)) {
			throw new Error('race error: speed must be integer')
		}
	}

	validateModifiers()
	validateSize()
	validateSpeed()
	return Object.assign({}, { modifiers, abilities, size, speed })
}
