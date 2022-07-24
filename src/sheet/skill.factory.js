import AdderData from './composition/adder-data.factory.js'

const updateAttribute = (values, obj, attribute) => {
	const attributeValue = obj.modifiers()[attribute]
	values.set('attribute', attributeValue)
}

export default (id, config, state) => {
	const _id = id
	const _label = config.label
	const _values = AdderData()
	const _classes = state.classes
	const _attributes = state.attributes
	let _armorPenalty = config.armorPenalty
	let _onlyTrained = config.onlyTrained
	let _attribute = config.attribute
	let _attributeFrom = 'default'
	let _trainedFrom = false

	const init = () => {
		const levelValue = Math.floor(_classes.totalLevel() / 2)
		_values.set('level', levelValue)
		updateAttribute(_values, _attributes, _attribute)
		_values.set('training', 0)
	}

	const meta = () => {
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
	const train = (key) => {
		if (_trainedFrom) {
			throw new Error(`skill "${_id}" error: can only train once"`)
		}
		_trainedFrom = key
		const level = _classes.totalLevel()
		const trainValue = level >= 15 ? 6 : level >= 7 ? 4 : 2
		_values.set('training', trainValue)
	}
	const changeAttribute = (key, newAttribute) => {
		_attributeFrom = key
		_attribute = newAttribute
		updateAttribute(_values, _attributes, _attribute)
	}
	init()
	return Object.assign(
		{},
		{ calculate: _values.calculate, set: _values.set, remove: _values.remove },
		{ meta, train, changeAttribute }
	)
}
