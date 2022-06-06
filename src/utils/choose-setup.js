import * as validator from './common-validators'
export default (config, errMessage = 'choose error') => {
	const choose = config.choose
	const quantity = config.quantity
	const fix = config.fix

	validator.arrayValidator(choose, 'choose', errMessage)
	validator.arrayDup(choose, 'choose', errMessage)
	validator.arrayValidator(fix, 'fix', errMessage)
	validator.arrayDup(fix, 'fix', errMessage)
	validator.intValidator(quantity)
	if (quantity < 1) {
		throw new Error(errMessage + ': quantity cannot be less than 1')
	}

	const all = [...choose, ...fix]
	validator.arrayDup(all, 'choose/fix combine', errMessage)

	return (...args) => {
		if (args.length !== quantity) {
			throw new Error(
				`${errMessage}: function should recieve '${quantity}' args`
			)
		}
		const arr = []
		for (const arg of args) {
			if (!choose.includes(arg)) {
				throw new Error(`${errMessage}: argument '${arg}' not valid`)
			}
			if (arr.includes(arg)) {
				throw new Error(`${errMessage}: same values arguments`)
			}
			arr.push(arg)
		}
		arr.push(...fix)

		return arr
	}
}
