import AdderData from './composition/adder-data.factory.js'

export default async (loader, state) => {
	const _dataEntries = Object.entries(await loader('skills', ['description']))

	const calculateLevel = () => {
		const level = state.classes.totalLevel()
		return Math.floor(level / 2)
	}

	const calculateTrain = () => {
		const level = state.classes.totalLevel()
		return level >= 15 ? 6 : level >= 7 ? 4 : 2
	}

	const getAttributeMod = (attribute) => {
		const value = state.attributes.modifiers()[attribute]
		return value
	}

	return _dataEntries.reduce((prev, dict) => {
		const _id = dict[0]
		const _data = dict[1]
		const _label = _data.label
		const _armorPenalty = _data.armorPenalty
		const _onlyTrained = _data.onlyTrained
		let _attribute = _data.attribute
		let _attributeFrom = 'default'
		let _trainedFrom = false

		const _values = AdderData()
		_values.set('attribute', getAttributeMod(_attribute))
		_values.set('level', calculateLevel())
		_values.set('training', 0)
		const meta = () => {
			const metadata = {
				id: _id,
				label: _label,
				attribute: _attribute,
				armorPenalty: _armorPenalty,
				onlyTrained: _onlyTrained,
				attributeFrom: _attributeFrom,
				trainedFrom: _trainedFrom,
				values: _values.dict(),
			}
			return Object.freeze(metadata)
		}
		const train = (label) => {
			if (_trainedFrom) {
				throw new Error('skill [atletismo] error: can only train once')
			}
			_trainedFrom = label
			_values.set('training', calculateTrain())
		}
		const changeAttribute = (label, newAttribute) => {
			_attributeFrom = label
			_attribute = newAttribute
			_values.set('attribute', getAttributeMod(_attribute))
		}
		prev[_id] = Object.assign(
			{
				meta,
				train,
				changeAttribute,
			},
			{
				calculate: _values.calculate,
				set: _values.set,
				remove: _values.remove,
			}
		)
		return prev
	}, {})
}
