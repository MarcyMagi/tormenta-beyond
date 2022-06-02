import basics from './basics'
import chooseSkills from './choose-skills'

export default (state) => {
	const skills = chooseSkills(state)
	return Object.assign({}, basics(state), { skills })
}
