import {
	modifierCalculator,
	rollCalculator,
	pointCalculator,
} from './attributes-calculator.js'
import { defaultAttributes } from '../configs/sheet.config.js'
import _ from 'lodash'

const calculateModifier = (attributes) => {
	let modifiersArr = modifierCalculator.calculateMany(attributes.toArray())
	let modifiersObj = {}
	let i = 0
	for (const key of Object.keys(attributes)) {
		modifiersObj[key] = modifiersArr[i]
		i++
	}
	return modifiersObj
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

	let modifiers = calculateModifier(attributes)
	modifiers.toArray = toArray(modifiers)
	modifiers.validate = () => {
		return modifierCalculator.validateMany(
			attributes.toArray(),
			modifiers.toArray()
		)
	}

	return Object.assign({}, { attributes, modifiers })
}
