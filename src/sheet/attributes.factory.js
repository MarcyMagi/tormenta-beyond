import AttributesUtils from '../utils/attributes.js'
import AdderData from './utils/adder-data.factory.js'
import { attributesList } from '../../data/utils.js'

export default () => {
	const _attributesUtils = AttributesUtils(attributesList)
	const _dict = attributesList.reduce((obj, att) => {
		obj[att] = AdderData()
		return obj
	}, {})
	const values = () => {
		return attributesList.reduce((obj, value) => {
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
		return attributesList.reduce((obj, value) => {
			obj[value] = _dict[value].dict()
			return obj
		}, {})
	}
	const set = (label, objAttributes) => {
		const otherValues = _attributesUtils.filter(objAttributes)
		for (const [key, value] of Object.entries(otherValues)) {
			_dict[key].set(label, value)
		}
	}
	const remove = (label) => {
		for (const attributeLabel of attributesList) {
			_dict[attributeLabel].remove(label)
		}
	}
	return Object.freeze({ values, modifiers, meta, set, remove })
}
