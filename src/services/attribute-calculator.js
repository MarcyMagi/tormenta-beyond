import config from '../configs/attributes.config.js'
import Dice from 'dice-notation-js'

const sumReduce = (prev, cur) => prev + cur
const sorter = (a, b) => a - b

export const modifier = {
	calculate: (attribute) => {
		return Math.floor((attribute - 10) / 2)
	},
	calculateMany: (attributes) => {
		const reduceFun = (prev, cur) => {
			prev.push(modifier.calculate(cur))
			return prev
		}
		return attributes.reduce(reduceFun, [])
	},
	validate: (attribute, modifier) => {
		const shouldModifier = modifier.calculate(attribute)
		return shouldModifier === modifier
	},
	validateMany: (attributes, modifiers) => {
		const shouldModifiers = modifier.calculateMany(attributes)
		for (let i = 0; i < modifiers.length; i++) {
			if (shouldModifiers[i] !== modifiers[i]) {
				return false
			}
		}
		return true
	},
}
export const roll = {
	validate: (attributes) => {
		const modifiers = modifier.calculateMany(attributes)
		const sum = modifiers.reduce(sumReduce, 0)
		if (sum < 6) {
			return false
		}
		return true
	},
	generate: () => {
		const rolls = Dice.detailed('4d6').rolls
		rolls.sort(sorter)
		rolls.shift()
		const attribute = rolls.reduce(sumReduce, 0)
		const modifier = modifier.calculate(attribute)
		return { attribute, modifier, rolls }
	},
	generateMany: () => {
		const attributes = []
		for (let i = 0; i < 6; i++) {
			const attribute = roll.generate()
			attributes.push(attribute)
		}
		return attributes
	},
	generateValid: (expectSum = 6) => {
		let attributes = roll.generateMany()
		const attSorter = (a, b) => a.result - b.result
		const modifierSum = (prev, cur) => prev.modifier + cur.modifier
		for (let i = 0; i < config.rollsLimit; i++) {
			attributes.sort(attSorter)
			const sum = attributes.reduce(modifierSum, 0)
			if (sum >= expectSum) {
				return attributes
			}
			attributes.shift()
			attributes.push(roll.generate())
		}
		throw new Error('rollsLimit break')
	},
}
export const point = {
	difference: (attributes, prices = config.pointPrices) => {
		let sum = attributes.reduce((prev, cur) => prev + prices[cur], 0)
		return sum
	},
}
