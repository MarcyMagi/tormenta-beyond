import AttributesUtils from '../utils/attributes.js'
import AdderData from './composition/adder-data.factory.js'
import { attributes as attributesLabels } from '../config.js'

export default (baseValues) => {
	const _attributesUtils = AttributesUtils(attributesLabels)
	const _dict = {}
	const init = () => {
		const _baseData = _attributesUtils.filter(baseValues, true)
		for (const [key, value] of Object.entries(_baseData)) {
			const newAttribute = AdderData()
			newAttribute.set('base', value)
			_dict[key] = newAttribute
		}
	}
	const values = () => {
		return attributesLabels.reduce((obj, value) => {
			obj[value] = _dict[value].calculate()
			return obj
		}, {})
	}
	const modifiers = () => {
		const entries = Object.entries(values())
		return entries.reduce((obj, [key, value]) => {
			obj[key] = Math.floor((value - 10) / 2)
			return obj
		}, {})
	}
	const meta = () => {
		return attributesLabels.reduce((obj, value) => {
			obj[value] = _dict[value].dict()
			return obj
		}, {})
	}
	const setOther = (label, objAttributes) => {
		const otherValues = _attributesUtils.filter(objAttributes)
		for (const [key, value] of Object.entries(otherValues)) {
			_dict[key].set(label, value)
		}
	}
	const removeOther = (label) => {
		for (const attributeLabel of attributesLabels) {
			_dict[attributeLabel].remove(label)
		}
	}
	init()
	return Object.freeze({ values, modifiers, meta, setOther, removeOther })
}
