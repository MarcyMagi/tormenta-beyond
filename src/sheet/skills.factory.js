// Add actions
export default (id, attribute, sheet) => {
	let attributeOrigin = 'default'
	let trainOrigin = false
	let trained = false
	const others = {}

	const train = (label) => {
		if (trained) {
			throw new Error(`skill [${id}] error: can only train once`)
		}
		trainOrigin = label
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
	const calculate = () => {
		const attributeValue = sheet.modifiers[attribute]
		const levelValue = Math.floor(sheet.level / 2)
		let trainedValue
		if (trained) {
			if (sheet.level >= 15) {
				trainedValue = 6
			} else if (sheet.level >= 7) {
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
			id,
			attribute,
			attributeOrigin,
			trained,
			trainOrigin,
			others,
		}
	}
	return Object.freeze({
		train,
		changeAttribute,
		setOthers,
		deleteOthers,
		calculate,
		data,
	})
}
