import { stringArrayValitador } from '../utils/common-validators'
import chooseSetup from '../utils/choose-setup'
const errPrefix = 'class choose fix error'
export default (fixConfig) => {
	const choose = fixConfig.choose
	const fix = fixConfig.fix
	stringArrayValitador(choose, 'choose', errPrefix)
	stringArrayValitador(fix, 'fix', errPrefix)

	const chooseConfig = {
		choose,
		fix,
		quantity: 1,
	}

	const chooseFunc = chooseSetup(chooseConfig, errPrefix)

	const func = (skill) => {
		let skills
		skills = chooseFunc(skill)
		return skills
	}
	return func
}
