import AdderData from './adder-data.factory'
export default (sheet, config, keyAttribute) => {
	let _keyAttribute = keyAttribute
	const _maxAdder = AdderData()
	const _curAdder = AdderData()
	const _attributes = sheet.attributes
	const _init = () => {
		let firstRunned = false
		const classesEntries = Object.entries(config)
		for (const [id, classConfig] of classesEntries) {
			for (let i = 1; i <= classConfig.level; i++) {
				const level1Check = (ifValue, elseValue) => {
					if (firstRunned) {
						return elseValue
					}
					return classConfig.levelOne ? ifValue : elseValue
				}
				const classKey = `${id}_${i}`
				const classValue = level1Check(
					classConfig.levelOne,
					classConfig.levelUp
				)
				let finalValue = classValue
				_maxAdder.set(classKey, classValue)

				if (_keyAttribute) {
					const modValue = _attributes.modifiers()[_keyAttribute]
					finalValue += modValue
					_maxAdder.set(`att_${_keyAttribute}_${classKey}`, modValue)
				}

				if (finalValue < 1) {
					const adjusterValue = 1 - finalValue
					_maxAdder.set(`adjuster_${classKey}`, adjusterValue)
				}
				if (classConfig.levelOne) {
					firstRunned = true
				}
			}
		}
		_curAdder.set('max', max())
	}
	const max = () => {
		return _maxAdder.calculate()
	}
	const maxMeta = () => {
		const dict = _maxAdder.dict()
		const customDict = Object.entries(dict).reduce((obj, [key, value]) => {
			const createClassKey = (classKey) => {
				if (!obj[classKey]) {
					obj[classKey] = {}
				}
			}
			const [arg1, arg2, arg3, arg4] = key.split('_')
			if (arg1 === 'att') {
				const classKey = `${arg3}_${arg4}`
				const attKey = `${arg1}_${arg2}`
				createClassKey(classKey)
				obj[classKey][attKey] = value
			} else if (arg1 === 'adjuster') {
				const classKey = `${arg2}_${arg3}`
				const adjusterKey = arg1
				createClassKey(classKey)
				obj[classKey][adjusterKey] = value
			} else {
				const classKey = `${arg1}_${arg2}`
				createClassKey(classKey)
				obj[classKey]['level'] = value
			}
			return obj
		}, {})
		return customDict
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
	_init()
	return { max, current, apply, maxMeta, currentMeta }
}
