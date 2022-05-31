import { defaultAttributes } from '../config/sheet-defaults'
const validate = (attributes) => {
	for (const [key, value] of Object.entries(attributes)) {
		if (!defaultAttributes.includes(key)) {
			throw new Error(`attribute error: invalid '${key}' attribute`)
		}
		if (!Number.isInteger(value)) {
			throw new Error(`attribute error: attribute '${key}' must be integer`)
		}
	}
}

export default (attributesObj = {}) => {
	validate(attributesObj)
	let attributes = {}
	for (const attName of defaultAttributes) {
		attributes[attName] = attributesObj[attName] ? attributesObj[attName] : 0
	}
	return Object.assign({}, attributes)
}
