import AttributesUtils from '../utils/attributes.js'
import { attributes as attributesLabels } from '../config.js'

const attributesUtils = AttributesUtils(attributesLabels)

export default (baseValues) => {
	const _attributesDict = attributesLabels.reduce((prev, cur) => {
		prev[cur] = {}
		return prev
	}, {})
	const _baseData = attributesUtils.filter(baseValues, true)
	for (const [key, value] of Object.entries(_baseData)) {
		_attributesDict[key]['base'] = value
	}
	const values = () => {
		return attributesLabels.reduce((ret, label) => {
			const attributeDict = _attributesDict[label]
			ret[label] = Object.values(attributeDict).reduce((total, value) => {
				total += value
				return total
			}, 0)
			return ret
		}, {})
	}
	const modifiers = () => {
		return Object.entries(values()).reduce((prev, cur) => {
			prev[cur[0]] = Math.floor((cur[1] - 10) / 2)
			return prev
		}, {})
	}
	const meta = () => {
		return Object.assign({}, _attributesDict)
	}
	const setOther = (label, objAttributes) => {
		const otherValues = attributesUtils.filter(objAttributes)
		for (const [key, value] of Object.entries(otherValues)) {
			_attributesDict[key][label] = value
		}
	}
	const removeOther = (label) => {
		for (const attributeLabel of attributesLabels) {
			delete _attributesDict[attributeLabel][label]
		}
	}
	return Object.freeze({ values, modifiers, meta, setOther, removeOther })
}
