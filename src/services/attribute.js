import {
	modifierCalculator,
	rollCalculator,
	pointCalculator,
} from './attribute-calculator.js'
import _ from 'lodash'

const extractModifier = (attributes) => {
	let modifiers = modifierCalculator.calculateMany(attributes.toArray())
	return {
		for: modifiers[0],
		des: modifiers[1],
		con: modifiers[2],
		int: modifiers[3],
		sab: modifiers[4],
		car: modifiers[5],
	}
}
const filter = (values) => {
	return _.pick(values, ['for', 'des', 'con', 'int', 'sab', 'car'])
}

const toArray = (values) => {
	return () => {
		values = filter(values)
		return Object.values(values)
	}
}

const factory = (attributes) => {
	attributes = filter(attributes)
	attributes.toArray = toArray(attributes)
	attributes.validateRoll = (expectSum) => {
		return rollCalculator.validate(attributes.toArray(), expectSum)
	}
	attributes.toExpend = (prices) => {
		return pointCalculator.difference(attributes.toArray(), prices)
	}

	let modifiers = extractModifier(attributes)
	modifiers.toArray = toArray(modifiers)
	modifiers.validate = () => {
		return modifierCalculator.validateMany(
			attributes.toArray(),
			modifiers.toArray()
		)
	}

	return Object.assign({}, { attributes, modifiers })
}

export default factory
