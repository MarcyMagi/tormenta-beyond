import AdderData from './utils/adder-data.factory'
export default (state, keyAttribute) => {
	let _keyAttribute = keyAttribute
	const _maxAdder = AdderData()
	const _curAdder = AdderData()
	const _attributes = state.attributes
	const _classes = state.classes
	const max = () => {
		const classesEntries = Object.entries(_classes.list)
		for (const [id, config] of classesEntries) {
			let isFirst = config.isFirst
			for (let i = 1; i <= config.level(); i++) {
				const classKey = `${id}_${i}${isFirst ? '*' : ''}`
				const classValue = isFirst ? config.level1 : config.levelup
				const modValue = _attributes.modifiers()[_keyAttribute]
				let finalValue = classValue + modValue
				finalValue = finalValue > 0 ? finalValue : 1
				_maxAdder.set(classKey, finalValue)
				if (isFirst) {
					isFirst = false
				}
			}
		}
		return _maxAdder.calculate()
	}
	const metaMax = () => {
		max()
		return _maxAdder.dict()
	}
	const current = () => {
		_curAdder.set('max', max())
		return _curAdder.calculate()
	}
	const metaCurrent = () => {
		current()
		return _curAdder.dict()
	}
	const apply = (value, key) => {
		if (value === 0) {
			return
		}
		const maxResult = max()
		const curResult = current()
		const sum = curResult + value
		if (Math.abs(sum) > Math.abs(maxResult)) {
			const newValue = sum > 0 ? maxResult - curResult : -maxResult - curResult
			if (newValue === 0) {
				return
			}
			value = newValue
		}
		if (!key) {
			if (value > 0) {
				key = 'heal'
			} else {
				key = 'damage'
			}
		}
		const dict = _curAdder.dict()
		for (let i = 1; i < 2003; i++) {
			if (!dict[key + i]) {
				_curAdder.set(key + i, value)
				break
			}
		}
	}
	const setFix = (key, value) => {
		_maxAdder.set(key, value)
	}
	const removeFix = (key) => {
		_maxAdder.remove(key)
	}
	return { max, current, apply, setFix, removeFix, metaMax, metaCurrent }
}
