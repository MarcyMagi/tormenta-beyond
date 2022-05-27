export default (state) => {
	const name = state.name
	const description = state.description

	if (!state.modifiers) {
		state.modifiers = {}
	}
	const modifiers = {
		for: state.modifiers.for ? state.modifiers.for : 0,
		des: state.modifiers.des ? state.modifiers.des : 0,
		con: state.modifiers.con ? state.modifiers.con : 0,
		int: state.modifiers.int ? state.modifiers.int : 0,
		sab: state.modifiers.sab ? state.modifiers.sab : 0,
		car: state.modifiers.car ? state.modifiers.car : 0,
	}
	const type = 'ability'
	return Object.assign({}, { name, description, modifiers, type })
}
