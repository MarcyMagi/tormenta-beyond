import AdderData from './composition/adder-data.factory'
export default (state, keyAttribute) => {
	const _adder = AdderData()
	const _attributes = state.attributes
	const _classes = state.classes
	let _current = 0
	const init = () => {
		let levelIndex = 1
		const classesEntries = Object.entries(_classes.list)
		const modifier = _attributes.modifiers()[keyAttribute]
		for (const [key, config] of classesEntries) {
			let isFirst = config.isFirst
			for (let i = 1; i <= config.level(); i++) {
				let sum = 0
				if (isFirst) {
					_adder.set(`${key}_${i}*`, config.level1)
					sum += config.level1
					isFirst = false
				} else {
					_adder.set(`${key}_${i}`, config.levelup)
					sum += config.levelup
				}
				_adder.set(`${keyAttribute}_${levelIndex}`, modifier)
				sum += modifier
				if (sum < 1) {
					_adder.set(`${key}_${i}_normalize`, 1 - sum)
				}
				levelIndex++
			}
		}
		_current = max()
	}
	const updateCurrent = () => {
		_current = _current > max() ? max() : _current < -max() ? -max : _current
	}
	const max = () => {
		return _adder.calculate()
	}
	const current = () => {
		return _current
	}
	const apply = (value) => {
		_current += value
		updateCurrent()
	}
	const setFix = (key, value) => {
		_adder.set(key, value)
		updateCurrent()
	}
	const removeFix = (key) => {
		_adder.remove(key)
	}
	init()
	return { max, current, apply, setFix, removeFix }
}
