export default (errPrefix = 'numeric data', fixValues = {}) => {
	const _fixValues = fixValues
	const _dict = Object.assign({}, fixValues)
	const calculate = () => {
		return Object.values(_dict).reduce((prev, cur) => prev + cur, 0)
	}
	const dict = () => {
		return Object.assign({}, _dict)
	}
	const set = (key, value) => {
		_dict[key] = value
	}
	const remove = (key) => {
		if (_fixValues[key]) {
			throw new Error(errPrefix + ` error: key '${key}' is fix`)
		}
		delete _dict[key]
	}

	return { calculate, dict, set, remove }
}
