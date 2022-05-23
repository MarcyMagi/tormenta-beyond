const validateFunc = (func) => {
	if (func.length !== 1) {
		throw new Error('ability functions must recieve only one argument')
	}
}

const validateFuncs = (obj) => {
	for (const value of Object.values(obj)) {
		if (typeof value === 'function') {
			validateFunc(value)
		}
	}
}

export default (ability) => {
	const abilityObj = {
		meta: ability.meta,
		name: ability.name.toLowerCase(),
		applyOnSkill: ability.applyOnSkill,
		applyOnPower: ability.applyOnPower,
	}

	validateFuncs(abilityObj)

	return Object.assign({}, abilityObj)
}
