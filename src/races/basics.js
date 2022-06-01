export default (state) => {
	const name = state.name
	const description = state.description
	const abilities = state.abilities
	const size = 'médio'
	const speed = 9
	if (name === '') {
		throw new Error('race basics error: name cannot be empty string')
	}
	return Object.assign({}, { name, description, abilities, size, speed })
}
