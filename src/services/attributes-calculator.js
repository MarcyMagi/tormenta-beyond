import config from '../configs/attributes.config.js'
import _ from 'lodash'
import { numberCheck, arrayCheck } from '../helpers/common-checks.js'

const sumReduce = (prev, cur) => prev + cur
const sorter = (a, b) => a - b
const pricesParser = (prices) => {
	const defaultPrices = config.pointPrices
	const filterPrices = _.pick(prices, ...Object.keys(defaultPrices))

	return _.merge(defaultPrices, filterPrices)
}

const attributeCheck = (value) => {
	numberCheck(value)
	if (value < config.minAttValue) {
		throw new Error(`attribute must be greater than ${config.minAttValue}`)
	}
	if (value > config.maxAttValue) {
		throw new Error(`attribute must be less than ${config.maxAttValue}`)
	}
}

const attributeArrCheck = (values) => {
	arrayCheck(values)
	if (values.length > config.maxAttArr) {
		throw new Error(`attribute array cannot have more than ${config.maxAttArr}`)
	}
	for (const value of values) {
		attributeCheck(value)
	}
}

export const modifierCalculator = {
	calculate: (attribute) => {
		attributeCheck(attribute)
		return Math.floor((attribute - 10) / 2)
	},
	calculateMany: (attributes) => {
		attributeArrCheck(attributes)
		const reduceFun = (prev, cur) => {
			prev.push(modifierCalculator.calculate(cur))
			return prev
		}
		return attributes.reduce(reduceFun, [])
	},
	validate: (attribute, modifier) => {
		attributeCheck(attribute)
		numberCheck(modifier)
		const shouldModifier = modifierCalculator.calculate(attribute)
		return shouldModifier === modifier
	},
	validateMany: (attributes, modifiers) => {
		attributeArrCheck(attributes)
		if (attributes.length !== modifiers.length) {
			throw new Error(
				'modifiers array must have same length as attributes array'
			)
		}
		arrayCheck(modifiers)
		const shouldModifiers = modifierCalculator.calculateMany(attributes)
		for (let i = 0; i < modifiers.length; i++) {
			if (shouldModifiers[i] !== modifiers[i]) {
				return false
			}
		}
		return true
	},
}
export const rollCalculator = {
	validate: (attributes, expectSum = config.expectSum) => {
		attributeArrCheck(attributes)
		numberCheck(expectSum)
		const modifiers = modifierCalculator.calculateMany(attributes)
		const sum = modifiers.reduce(sumReduce, 0)
		if (sum < expectSum) {
			return false
		}
		return true
	},
	generate: (Dice) => {
		const rolls = Dice.detailed('4d6').rolls
		rolls.sort(sorter)
		const rollsCopy = [...rolls]
		rollsCopy.shift()
		const attribute = rollsCopy.reduce(sumReduce, 0)
		const modifier = modifierCalculator.calculate(attribute)
		return { attribute, modifier, rolls }
	},
	generateMany: (Dice) => {
		const attributes = []
		for (let i = 0; i < config.maxAttArr; i++) {
			const attribute = rollCalculator.generate(Dice)
			attributes.push(attribute)
		}
		return attributes
	},
	generateValid: (Dice, expectSum = config.expectSum) => {
		numberCheck(expectSum)
		if (expectSum > 24) {
			throw new Error('expectSum cannot be greater than 24')
		}
		let attributes = rollCalculator.generateMany(Dice)
		for (let i = 0; i < config.rollsLimit; i++) {
			attributes.sort((a, b) => a.attribute - b.attribute)
			let attributeIsolated = [...attributes]
			attributeIsolated = attributeIsolated.reduce((prev, cur) => {
				prev.push(cur.attribute)
				return prev
			}, [])
			if (rollCalculator.validate(attributeIsolated, expectSum)) {
				return attributes
			}
			attributes.shift()
			attributes.push(rollCalculator.generate(Dice))
		}
		throw new Error('rollsLimit break')
	},
}
export const pointCalculator = {
	difference: (attributes, prices = {}) => {
		prices = pricesParser(prices)
		attributeArrCheck(attributes)
		let sum = attributes.reduce((prev, cur) => prev + prices[cur], 0)
		return prices.wallet - sum
	},
}
