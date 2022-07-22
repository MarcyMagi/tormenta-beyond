import AttributesUtils from '../utils/attributes.js'
import AdderData from './composition/adder-data.factory.js'
import { attributes as attributesLabels } from '../config.js'

export default (baseValues) => {
	const attributesUtils = AttributesUtils(attributesLabels)
	const _baseData = attributesUtils.filter(baseValues, true)
	const _dict = {}
	for (const [key, value] of Object.entries(_baseData)) {
		_dict[key] = AdderData(`sheet attributes[${key}]`, { base: value })
	}
	const values = (attributesArr = attributesLabels) => {
		return attributesArr.reduce((prev, cur) => {
			prev[cur] = _dict[cur].calculate()
			return prev
		}, {})
	}
	const modifiers = (attributesArr = attributesLabels) => {
		return attributesArr.reduce((prev, cur) => {
			prev[cur] = Math.floor((_dict[cur].calculate() - 10) / 2)
			return prev
		}, {})
	}
	const meta = () => {
		return attributesLabels.reduce((prev, cur) => {
			prev[cur] = _dict[cur].dict()
			return prev
		}, {})
	}
	const setOther = (label, objAttributes) => {
		const otherValues = attributesUtils.filter(objAttributes)
		for (const [key, value] of Object.entries(otherValues)) {
			_dict[key].set(label, value)
		}
	}
	const removeOther = (label) => {
		for (const attributeLabel of attributesLabels) {
			_dict[attributeLabel].remove(label)
		}
	}
	return Object.freeze({ values, modifiers, meta, setOther, removeOther })
}
