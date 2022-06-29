// Add actions

const changeAttributeValue = (attribute, attributesObj) => {
	return attributesObj.modifiers()[attribute]
}
const changeLevelValues = (level, trained) => {
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
	return [levelValue, trainedValue]
}

export default (id, attribute, attributeObj, level) => {
	let attributeFrom = 'default'
	let trainFrom = false
	let trained = false

	let attributeValue = changeAttributeValue(attribute, attributeObj)
	let [levelValue, trainedValue] = changeLevelValues(level, trained)

	const others = {}

	const train = (label) => {
		if (trained) {
			throw new Error(`skill [${id}] error: can only train once`)
		}
		trainFrom = label
		trained = true
		trainedValue = changeLevelValues(level, trained)[1]
	}
	const changeAttribute = (label, newAttribute) => {
		attributeFrom = label
		attribute = newAttribute
		attributeValue = changeAttributeValue(attribute, attributeObj)
	}
	const levelUp = (plusLevel = 1) => {
		level += plusLevel
		const newValues = changeLevelValues(level, trained)
		levelValue = newValues[0]
		trainedValue = newValues[1]
	}
	const setOthers = (label, value) => {
		others[label] = value
	}
	const deleteOthers = (label) => {
		delete others[label]
	}
	const calculate = () => {
		attributeObj.modifiers()
		let total = attributeValue + levelValue + trainedValue
		for (const otherValue of Object.values(others)) {
			total += otherValue
		}
		return total
	}
	const getData = () => {
		return {
			id,
			attribute,
			attributeValue,
			attributeFrom,
			trained,
			trainedValue,
			trainFrom,
			levelValue,
			others,
		}
	}
	return Object.freeze({
		train,
		changeAttribute,
		levelUp,
		setOthers,
		deleteOthers,
		calculate,
		getData,
	})
}
