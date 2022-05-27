export default (state, originObj) => {
	const name = state.name
	const description = state.description
	const origin = originObj.value
	const originType = originObj.type
	return Object.assign({}, { name, description, origin, originType })
}
