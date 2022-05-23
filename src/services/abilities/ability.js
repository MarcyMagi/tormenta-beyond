import _ from 'lodash'

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

export default (name, funcs = {}, meta) => {
	let abilityObj = {
		meta,
		name: name.toLowerCase(),
		applyOnSkill: funcs.applyOnSkill,
		applyOnPower: funcs.applyOnPower,
	}

	validateFuncs(abilityObj)

	abilityObj = _.pickBy(abilityObj, _.identity)

	return Object.assign({}, abilityObj)
}
