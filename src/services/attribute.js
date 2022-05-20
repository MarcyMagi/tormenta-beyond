import {
	modifierCalculator,
	rollCalculator,
	pointCalculator,
} from './attribute-calculator.js'
import Dice from 'dice-notation-js'
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

const toArray = (values) => {
	return () => {
		const filter = _.pick(values, ['for', 'des', 'con', 'int', 'sab', 'car'])
		return Object.values(filter)
	}
}

const factory = (attributes) => {
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
