import AttributesUtils from '../utils/attributes.js'
import { attributes as attributesList } from '../config.js'

const attributesUtils = AttributesUtils(attributesList)

export default (base) => {
	const filterBase = attributesUtils.filter(base)
	const data = {}
	for (const [key, value] of Object.entries(filterBase)) {
		data[key] = {}
		data[key].base = value
		data[key].others = []
	}
	const values = () => {
		const attributes = {}
		for (const [key, value] of Object.entries(data)) {
			let sum = value.base
			for (const other of value.others) {
				sum += other.value
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

	const addOther = (label, otherAttributes) => {
		otherAttributes = attributesUtils.filter(otherAttributes)
		for (const [key, value] of Object.entries(otherAttributes)) {
			if (value !== 0) {
				data[key].others.push({
					from: label,
					value,
				})
			}
		}
	}
	const removeOther = (label) => {
		for (const key of Object.keys(data)) {
			const index = data[key].others.findIndex((ele) => ele.from === label)
			console.log(data[key].others)
			if (index > -1) {
				data[key].others.splice(index)
			}
		}
	}

	return Object.freeze({ values, modifiers, getData, addOther, removeOther })
}
