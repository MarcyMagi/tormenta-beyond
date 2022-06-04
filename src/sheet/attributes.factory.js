import { defaultAttributes } from '../config/sheet-defaults'
import { intValidator } from '../utils/common-validators'

export default (attributesObj = {}, ignoreNotGiven = false) => {
	for (const [key, value] of Object.entries(attributesObj)) {
		if (!defaultAttributes.includes(key)) {
			throw new Error(`attribute error: invalid '${key}' attribute`)
		}
		intValidator(value, `'${key}'`, 'attribute error')
	}
	let attributes = {}
	for (const attName of defaultAttributes) {
		if (ignoreNotGiven && !Number.isInteger(attributesObj[attName])) {
			continue
		}
		attributes[attName] = attributesObj[attName] ? attributesObj[attName] : 0
	}

	return Object.assign({}, attributes)
}
