export default (name, attribute, onlyTrained = false, armorPenalty = false) => {
	let attributeOrigin = 'default'
	let trained = false
	const others = {}

	const train = () => {
		if (trained) {
			throw new Error(`skill [${name}] error: can only train once`)
		}
		trained = true
	}
	const changeAttribute = (label, newAttribute) => {
		attributeOrigin = label
		attribute = newAttribute
	}
	const setOthers = (label, value) => {
		others[label] = value
	}
	const deleteOthers = (label) => {
		delete others[label]
	}
	const calculate = (modifers, level) => {
		const attributeValue = modifers[attribute]
		const levelValue = Math.floor(level / 2)
		let trainedValue
		if (trained) {
			if (level >= 15) {
				trainedValue = 6
			} else if (level >= 7) {
				trainedValue = 4
			} else {
				trainedValue = 2
			}
		} else {
			trainedValue = 0
		}
		const meta = {
			level: levelValue,
			trained: trainedValue,
			attribute: attributeValue,
		}
		let total = attributeValue + levelValue + trainedValue
		for (const [otherKey, otherValue] of Object.entries(others)) {
			meta[otherKey] = otherValue
			total += otherValue
		}
		return {
			total,
			meta,
		}
	}
	const data = () => {
		return {
			name,
			attribute,
			attributeOrigin,
			trained,
			onlyTrained,
			armorPenalty,
			others,
		}
	}
	return { train, changeAttribute, setOthers, deleteOthers, calculate, data }
}
