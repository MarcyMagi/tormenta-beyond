import attributesFactory from '../sheet/attributes.factory'
import * as validator from '../utils/common-validators'
import chooseSetup from '../utils/choose-setup'

const errPrefix = 'choose attributes error'
const attributeKeys = Object.keys(attributesFactory())

export default (attributesConfig) => {
	const quantity = attributesConfig.quantity
	const value = attributesConfig.value
	const fix = attributesFactory(attributesConfig.fix, true)

	validator.intValidator(quantity, 'quantity', errPrefix)
	validator.intValidator(value, 'value', errPrefix)

	const fixKeys = Object.keys(fix)
	const chooseKeys = attributeKeys.filter((key) => !fixKeys.includes(key))

	const chooseConfig = {
		choose: chooseKeys,
		fix: [],
		quantity,
	}

	const choose = chooseSetup(chooseConfig, errPrefix)

	const func = (...args) => {
		let attributes = fix
		let chosenAttributes
		chosenAttributes = choose(...args)
		for (const chosenAttribute of chosenAttributes) {
			attributes[chosenAttribute] = value
		}
		attributes = attributesFactory(attributes)

		return Object.assign({}, attributes)
	}
	return func
}
