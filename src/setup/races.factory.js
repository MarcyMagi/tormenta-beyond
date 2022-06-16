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

	const chooseObj = choose(
		name + '[attributes]',
		attributes.list(),
		chooseQuantity,
		(chosen) => {
			const toFilter = chosen.reduce((prev, cur) => {
				prev[cur] = chooseValue
				return prev
			}, fixModifiers)
			return attributes.filter(toFilter)
		}
	)
	if (chooseObj.specs().quantity > 0) {
		questions.push(chooseObj.specs())
	}
	const getModifiers = (...args) => chooseObj.choose(...args)

	return Object.freeze({ name, book, getModifiers, questions })
}
