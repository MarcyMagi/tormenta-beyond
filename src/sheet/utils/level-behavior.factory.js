import AdderData from './adder-data.factory'
export default () => {
	const _maxDict = {}
	const _curAdder = AdderData()
	const _updateCurrent = () => {
		_curAdder.set('max', max())
	}
	let _lastLevel = 0
	const addLevel = (label, value) => {
		_lastLevel++
		_maxDict[_lastLevel] = AdderData()
		_maxDict[_lastLevel].set(label, value)
		_updateCurrent()
	}
	const setPerLevel = (label, value) => {
		for (const adderData of Object.values(_maxDict)) {
			adderData.set(label, value)
		}
		_updateCurrent()
	}
	const max = () => {
		const adderValues = Object.values(_maxDict)
		return adderValues.reduce((total, adder) => {
			const value = adder.calculate()
			total += value > 0 ? value : 1
			return total
		}, 0)
	}
	const maxMeta = () => {
		const adderEntries = Object.entries(_maxDict)
		return adderEntries.reduce((obj, [level, adder]) => {
			obj[level] = adder.dict()
			if (adder.calculate() < 1) {
				obj[level].roundOne = true
			}
			return obj
		}, {})
	}
	const current = () => {
		return _curAdder.calculate()
	}
	const currentMeta = () => {
		current()
		return _curAdder.dict()
	}
	const apply = (value, key) => {
		const maxResult = max()
		const curResult = current()
		const checkValue = () => {
			if (value === 0) {
				return
			}
		}
		const fixValue = () => {
			const sum = curResult + value
			if (Math.abs(sum) > Math.abs(maxResult)) {
				const newValue =
					sum > 0 ? maxResult - curResult : -maxResult - curResult
				checkValue()
				value = newValue
			}
		}
		const fixKey = () => {
			if (!key) {
				if (value > 0) {
					key = 'heal'
				} else {
					key = 'damage'
				}
			}
		}
		checkValue()
		fixValue()
		fixKey()
		fixValue()

		const dict = _curAdder.dict()
		for (let i = 1; i < 2003; i++) {
			if (!dict[key + i]) {
				_curAdder.set(key + i, value)
				break
			}
		}
	}
	return { max, current, apply, addLevel, setPerLevel, maxMeta, currentMeta }
}
