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

	const getAttributeMod = (_attribute) => {
		return state.attributes.modifiers()[_attribute]
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

		const _values = {
			attribute: getAttributeMod(_attribute),
			level: calculateLevel(),
		}

		const calculate = () => {
			return Object.values(_values).reduce((prev, cur) => (prev += cur), 0)
		}
		const meta = () => {
			const metadata = {
				id: _id,
				label: _label,
				attribute: _attribute,
				armorPenalty: _armorPenalty,
				onlyTrained: _onlyTrained,
				attributeFrom: _attributeFrom,
				trainedFrom: _trainedFrom,
				values: _values,
			}
			return Object.freeze(metadata)
		}
		const train = (label) => {
			if (_trainedFrom) {
				throw new Error('skill [atletismo] error: can only train once')
			}
			_trainedFrom = label
			_values[label] = calculateTrain()
		}
		const changeAttribute = (label, newAttribute) => {
			_attributeFrom = label
			_attribute = newAttribute
			_values.attribute = getAttributeMod(_attribute)
		}
		const setOther = (label, other) => {
			_values[label] = other
		}
		const removeOther = (label) => {
			delete _values[label]
		}
		prev[_id] = {
			calculate,
			meta,
			train,
			changeAttribute,
			setOther,
			removeOther,
		}
		return prev
	}, {})
}
