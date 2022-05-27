export default (state) => {
	const name = state.name
	const description = state.description
	if (!state.modifiers) {
		state.modifiers = {}
	}
	const type = 'race'
	const modifiers = {
		for: state.modifiers.for ? state.modifiers.for : 0,
		des: state.modifiers.des ? state.modifiers.des : 0,
		con: state.modifiers.con ? state.modifiers.con : 0,
		int: state.modifiers.int ? state.modifiers.int : 0,
		sab: state.modifiers.sab ? state.modifiers.sab : 0,
		car: state.modifiers.car ? state.modifiers.car : 0,
	}

	let abilities = state.abilities

	for (let i in abilities) {
		const abilityName = abilities[i]
		abilities[i] = {}
		abilities[i].name = abilityName
		abilities[i].origin = {
			type: type,
			value: name,
		}
	}
	return Object.assign({}, { name, description, modifiers, abilities, type })
}
