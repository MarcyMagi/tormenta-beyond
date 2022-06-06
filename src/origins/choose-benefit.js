import * as validator from '../utils/common-validators'
import chooseSetup from '../utils/choose-setup'
const errPrefix = 'origin benefit error'
export default (benefit) => {
	const chooseSkills = benefit.skills
	const choosePowers = benefit.powers
	validator.stringArrayValitador(chooseSkills, 'skills', errPrefix)
	validator.stringArrayValitador(choosePowers, 'powers', errPrefix)

	const chooseFunc = chooseSetup(
		{
			choose: [...chooseSkills, ...choosePowers],
			quantity: 2,
			fix: [],
		},
		errPrefix
	)

	const func = (arg1, arg2) => {
		validator.stringValidator(arg1, 'arg1', errPrefix)
		validator.stringValidator(arg2, 'arg2', errPrefix)
		const chosen = chooseFunc(...[arg1, arg2])
		const shareRecude = (type) => {
			return [
				(prev, cur) => {
					if (type.includes(cur)) {
						prev.push(cur)
					}
					return prev
				},
				[],
			]
		}
		const skills = chosen.reduce(...shareRecude(chooseSkills))
		const powers = chosen.reduce(...shareRecude(choosePowers))

		return Object.assign({}, { skills, powers })
	}
	return func
}
