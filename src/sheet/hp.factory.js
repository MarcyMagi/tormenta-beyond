import AdderData from './composition/adder-data.factory'
export default (state, keyAttribute) => {
	const modifiers = state.attributes.modifiers
	const _fixDict = {}
	const customAdder = () => {
		const adder = AdderData()
		const modifier = modifiers()[keyAttribute]
		const classesEntries = Object.entries(state.classes.list)
		let levelIndex = 1
		for (const [key, config] of classesEntries) {
			let isFirst = config.isFirst
			for (let i = 1; i <= config.level(); i++) {
				let sum = 0
				if (isFirst) {
					adder.set(`${key}_${i}*`, config.level1)
					sum += config.level1
					isFirst = false
				} else {
					adder.set(`${key}_${i}`, config.levelup)
					sum += config.levelup
				}
				adder.set(`${keyAttribute}_${levelIndex}`, modifier)
				sum += modifier
				if (sum < 1) {
					adder.set(`${key}_${i}_normalize`, 1 - sum)
				}
				levelIndex++
			}
		}
		for (const [key, value] of Object.entries(_fixDict)) {
			adder.set(key, value)
		}
		return adder
	}
	const updateCurrent = () => {
		_current = _current > max() ? max() : _current < -max() ? -max : _current
	}
	const max = () => {
		return customAdder().calculate()
	}
	let _current = max()
	const current = () => {
		return _current
	}
	const apply = (value) => {
		_current += value
		updateCurrent()
	}
	const setFix = (label, value) => {
		_fixDict[label] = value
		updateCurrent()
	}
	const removeFix = (label) => {
		delete _fixDict[label]
	}
	return { max, current, apply, setFix, removeFix }
}
