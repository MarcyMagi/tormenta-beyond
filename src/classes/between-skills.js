import { stringArrayValitador } from '../utils/common-validators'
const errPrefix = 'class between skills error'
export default (fixConfig) => {
	const between = fixConfig.between
	const fix = fixConfig.fix
	stringArrayValitador(between, 'between', errPrefix)
	stringArrayValitador(fix, 'fix', errPrefix)

	const func = (skill) => {
		const skills = []
		if (!between.includes(skill)) {
			throw new Error(errPrefix + ': invalid between skill')
		}
		skills.push(skill)
		skills.push(...fix)
		return skills
	}
	return func
}
