import AdderData from './adder-data.factory.js'
export default (constructorConfig, sheet) => {
	const _fixDict = Object.assign({}, constructorConfig.fix)
	const _levelDict = Object.assign({}, constructorConfig.perLevel)

	const dict = () => {
		const level = sheet.classes.totalLevel()
		const levelEntries = Object.entries(_levelDict)
		const newDict = levelEntries.reduce((prev, [key, value]) => {
			prev[key] = Array(level).fill(value, 0, level)
			return prev
		}, {})
		const fixEntries = Object.entries(_fixDict)
		for (const [key, value] of fixEntries) {
			if (typeof value === 'object') {
				const objKey = Object.keys(value)[0]
				const objValue = Object.values(value)[0]
				newDict[key][objKey] = objValue
				continue
			}
			newDict[key] = value
		}
		return newDict
	}
	const max = () => {
		const values = Object.values(dict())
		return values.reduce((prev, cur) => {
			if (typeof cur === 'number') {
				prev += cur
				return prev
			}
			for (const value of cur) {
				prev += value
			}
			return prev
		}, 0)
	}

	let current = max()

	const setPerLevel = (label, value) => {
		_levelDict[label] = value
	}
	const removePerLevel = (key) => {
		delete _levelDict[key]
	}
	const setFix = (label, value) => {
		_fixDict[label] = value
	}
	const removeFix = (key) => {
		delete _fixDict[key]
	}
	const cur = () => {
		return current
	}
	const apply = (value) => {
		current += value
		current = current > max() ? max() : current < -max() ? -max() : current
	}
	return {
		dict,
		max,
		setPerLevel,
		removePerLevel,
		setFix,
		removeFix,
		cur,
		apply,
	}
}
