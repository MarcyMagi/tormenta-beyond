import * as validator from './common-validators'
export default (config, errMessage = 'choose error') => {
	const choose = config.choose
	const quantity = config.quantity
	const fix = config.fix

	validator.arrayValidator(choose)
	validator.intValidator(quantity)
	validator.arrayValidator(fix)

	const crossDup = choose.some((r) => fix.includes(r))

	if (crossDup) {
		throw new Error(errMessage + ': dup choose')
	}
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
