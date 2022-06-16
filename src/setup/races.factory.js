import choose from '../utils/choose.js'
import { attributes } from '../cache/index.js'

export default (name, description, tale, modifiersConfig) => {
	const chooseQuantity = modifiersConfig.chooseQuantity
		? modifiersConfig.chooseQuantity
		: 0
	const chooseValue = modifiersConfig.chooseValue
	const fixModifiers = modifiersConfig.fixModifiers
		? modifiersConfig.fixModifiers
		: {}

	const book = () => {
		return Object.freeze({ description, tale })
	}
	const questions = []

	const modifiersArr = []
	const valuesArr = []
	for (const [key, value] of Object.entries(fixModifiers)) {
		modifiersArr.push(key)
		valuesArr.push(value)
	}
	valuesArr.push(...Array(chooseQuantity).fill(chooseValue))

	const chooseObj = choose(
		name + '[attributes]',
		attributes.list(),
		chooseQuantity,
		(chosen) => {
			modifiersArr.push(...chosen)
			return attributes.new(modifiersArr, valuesArr)
		}
	)
	questions.push(chooseObj.specs())
	const getModifiers = (...args) => chooseObj.choose(...args)

	return Object.freeze({ name, book, getModifiers, questions })
}
