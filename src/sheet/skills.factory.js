import AdderData from './utils/adder-data.factory.js'

const updateAttribute = (values, obj, attribute) => {
	const attributeValue = obj.modifiers()[attribute]
	values.set('attribute', attributeValue)
}

export default (id, config, classConfig, sheet) => {
	const _id = id
	const _label = config.label
	const _values = AdderData()
	const _level = Object.values(classConfig).reduce(
		(total, now) => (total += now.level),
		0
	)
	const _attributes = sheet.attributes
	let _armorPenalty = config.armorPenalty
	let _onlyTrained = config.onlyTrained
	let _attribute = config.attribute
	let _attributeFrom = 'default'
	let _trainedFrom = false

	const meta = () => {
		calculate()
		return {
			id: _id,
			label: _label,
			attribute: _attribute,
			armorPenalty: _armorPenalty,
			onlyTrained: _onlyTrained,
			attributeFrom: _attributeFrom,
			trainedFrom: _trainedFrom,
			values: _values.dict(),
		}
	}
	const calculate = () => {
		const levelValue = Math.floor(_level / 2)
		const trainValue = !_trainedFrom
			? 0
			: _level >= 15
			? 6
			: _level >= 7
			? 4
			: 2
		_values.set('training', trainValue)
		_values.set('level', levelValue)
		updateAttribute(_values, _attributes, _attribute)
		return _values.calculate()
	}
	const train = (key) => {
		if (_trainedFrom) {
			throw new Error(`skill "${_id}" error: can only train once"`)
		}
		_trainedFrom = key
	}
	const changeAttribute = (key, newAttribute) => {
		_attributeFrom = key
		_attribute = newAttribute
		updateAttribute(_values, _attributes, _attribute)
	}
	const set = (key, value) => {
		_values.set(key, value)
	}
	const remove = (key) => {
		_values.remove(key)
	}
	return { meta, calculate, train, changeAttribute, set, remove }
}
