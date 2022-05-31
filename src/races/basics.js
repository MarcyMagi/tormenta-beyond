export default (state) => {
	const name = state.name
	const description = state.description
	const abilities = state.abilities
	if (name === '') {
		throw new Error('race basics error: name cannot be empty string')
	}
	return Object.assign({}, { name, description, abilities })
}
