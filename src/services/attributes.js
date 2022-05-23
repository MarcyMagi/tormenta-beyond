import {
	modifierCalculator,
	rollCalculator,
	pointCalculator,
} from './attributes-calculator.js'
import { defaultAttributes } from '../configs/sheet.config.js'
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
	return _.pick(values, defaultAttributes)
}

const toArray = (values) => {
	return () => {
		values = filter(values)
		return Object.values(values)
	}
}

export default (attributes) => {
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
