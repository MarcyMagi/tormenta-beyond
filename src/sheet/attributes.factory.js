import AttributesUtils from '../utils/attributes.js'
import { attributes as attributesList } from '../config.js'

const attributesUtils = AttributesUtils(attributesList)

export default (base, sheet) => {
	const emitter = sheet.emitter
	const filterBase = attributesUtils.filter(base)
	const data = {}
	for (const [key, value] of Object.entries(filterBase)) {
		data[key] = {}
		data[key].base = value
		data[key].others = {}
	}
	const values = () => {
		const attributes = {}
		for (const [key, value] of Object.entries(data)) {
			let sum = value.base
			for (const otherValue of Object.values(value.others)) {
				sum += otherValue
			}
			attributes[key] = sum
		}
		return attributes
	}
	const modifiers = () => {
		const attributes = values()
		for (const [key, value] of Object.entries(attributes)) {
			attributes[key] = Math.floor((value - 10) / 2)
		}
		return attributes
	}

	const getData = () => {
		return Object.assign({}, data)
	}

	const setOther = (label, otherAttributes) => {
		otherAttributes = attributesUtils.filter(otherAttributes)
		for (const [key, value] of Object.entries(otherAttributes)) {
			if (value !== 0) {
				data[key].others[label] = value
			}
		}
		emitter.emit('updateAttributes')
	}
	const removeOther = (label) => {
		for (const key of Object.keys(data)) {
			if (data[key].others[label]) {
				delete data[key].others[label]
			}
		}
		emitter.emit('updateAttributes')
	}

	return Object.freeze({
		values,
		modifiers,
		getData,
		setOther,
		removeOther,
	})
}
