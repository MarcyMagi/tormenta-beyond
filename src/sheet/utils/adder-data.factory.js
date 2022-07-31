export default () => {
	const _dict = {}
	const calculate = () => {
		const calc = Object.values(_dict).reduce((prev, cur) => prev + cur, 0)
		return calc
	}
	const dict = () => {
		return Object.assign({}, _dict)
	}
	const set = (key, value) => {
		_dict[key] = value
	}
	const remove = (key) => {
		delete _dict[key]
	}

	return { calculate, dict, set, remove }
}
