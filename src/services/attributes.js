import {
	modifierCalculator,
	rollCalculator,
	pointCalculator,
	attributeValidators,
} from './attributes-calculator.js'
import { defaultAttributes as configDefaults } from '../configs/attributes.config.js'
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
const filter = (values, defaultAttributes = configDefaults) => {
	const filteredValues = _.pick(values, defaultAttributes)
	console.log(Object.keys(filteredValues).length, defaultAttributes.length)
	if (Object.keys(filteredValues).length !== defaultAttributes.length) {
		throw new Error('attributes error: fail to filter attributes')
	}
	return filteredValues
}

const toArray = (values, defaultAttributes = configDefaults) => {
	return () => {
		values = filter(values, defaultAttributes)
		return Object.values(values)
	}
}

export default (attributes, defaultAttributes = configDefaults) => {
	attributes = filter(attributes, defaultAttributes)
	attributes.toArray = toArray(attributes, defaultAttributes)
	attributes.validateRoll = (expectSum) => {
		return rollCalculator.validate(attributes.toArray(), expectSum)
	}
	attributes.toExpend = (prices) => {
		return pointCalculator.difference(attributes.toArray(), prices)
	}

	let modifiers = calculateModifier(attributes)
	modifiers.toArray = toArray(modifiers, defaultAttributes)
	modifiers.validate = () => {
		return modifierCalculator.validateMany(
			attributes.toArray(),
			modifiers.toArray()
		)
	}

	return Object.assign({}, { attributes, modifiers })
}
