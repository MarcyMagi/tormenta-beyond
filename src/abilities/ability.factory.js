import _ from 'lodash'
const validateFunc = (func) => {
	if (func.length !== 1) {
		throw new Error('ability error: functions must recieve only one argument')
	}
}
const validateFuncs = (funcs) => {
	for (const func of Object.values(funcs)) {
		if (typeof func === 'function') {
			validateFunc(func)
		}
	}
}

const validateName = (name) => {
	if (typeof name !== 'string') {
		throw new Error('ability error: name must be a string')
	}
	if (name.length === 0) {
		throw new Error('ability error: name cannot be empty string')
	}
}

export default (name, funcs = {}, meta) => {
	validateName(name)
	let abilityObj = {
		meta,
		name: name.toLowerCase(),
		setOnSheet: funcs.setOnSheet,
	}

	validateFuncs(abilityObj)

	abilityObj = _.pickBy(abilityObj, _.identity)

	return Object.assign({}, abilityObj)
}
