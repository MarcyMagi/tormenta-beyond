export default (skills) => {
	const skillIds = Object.keys(skills)
	const list = () => {
		return skillIds
	}
	return Object.freeze({ list })
}
