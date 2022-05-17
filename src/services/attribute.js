import { rollsLimit } from '../configs/attributes.config.js'
import Dice from 'dice-notation-js'

const sumReduce = (prev, now) => prev + now
const sorter = (a, b) => a - b

const modifierCalculator = {
	calculate: (attribute) => {
		return Math.floor((attribute - 10) / 2)
	},
	calculateMany: (attributes) => {
		const reduceFun = (prev, now) => {
			prev.push(modifierCalculator.calculate(now))
			return prev
		}
		return attributes.reduce(reduceFun, [])
	},
	validate: (attribute, modifier) => {
		const shouldModifier = modifierCalculator.calculate(attribute)
		return shouldModifier === modifier
	},
	validateMany: (attributes, modifiers) => {
		const shouldModifiers = modifierCalculator.calculateMany(attributes)
		for (let i = 0; i < modifiers.length; i++) {
			if (shouldModifiers[i] !== modifiers[i]) {
				return false
			}
		}
		return true
	},
}

const rollCalculator = {
	validate: (attributes) => {
		const modifiers = modifierCalculator.calculateMany(attributes)
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
		const modifier = modifierCalculator.calculate(attribute)
		return { attribute, modifier, rolls }
	},
	generateMany: () => {
		const attributes = []
		for (let i = 0; i < 6; i++) {
			const attribute = rollCalculator.generate()
			attributes.push(attribute)
		}
		return attributes
	},
	generateValid: () => {
		let attributes = rollCalculator.generateMany()
		const attSorter = (a, b) => a.result - b.result
		const modifierSum = (prev, now) => prev.modifier + now.modifier
		for (let i = 0; i < rollsLimit; i++) {
			attributes.sort(attSorter)
			const sum = attributes.reduce(modifierSum, 0)
			if (sum >= 6) {
				return attributes
			}
			attributes.shift()
			attributes.push(rollCalculator.generate())
		}
		throw new Error('rollsLimit break')
	},
}

export { modifierCalculator, rollCalculator }
