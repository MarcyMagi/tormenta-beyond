import * as validator from '../utils/common-validators'
import chooseFix from './choose-fix'
import chooseSetup from '../utils/choose-setup'
const errPrefix = 'choose skills error'
export default (skills) => {
	const quantity = skills.quantity
	const choose = skills.choose

	validator.intValidator(quantity, 'quantity', errPrefix)
	validator.stringArrayValitador(choose, 'choose', errPrefix)

	let fix

	if (skills.fixConfig) {
		fix = chooseFix(skills.fixConfig)
	} else {
		fix = skills.fix
		validator.stringArrayValitador(fix, 'fix', errPrefix)
	}

	return (...args) => {
		if (typeof fix === 'function') {
			const fixArg = args.shift()
			fix = fix(fixArg)
		}
		const chooseConfig = {
			quantity,
			choose,
			fix,
		}
		const chooseFunc = chooseSetup(chooseConfig, errPrefix)
		const chosen = chooseFunc(...args)
		return chosen
	}
}
