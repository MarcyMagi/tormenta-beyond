export default (attributeNames) => {
	const attributesArr = attributeNames
	const list = () => {
		return attributesArr
	}
	const set = (attributes, values) => {
		const attributesObj = {}
		for (const i in attributes) {
			if (!attributesArr.includes(attributes[i])) {
				throw new Error(
					`attributes utils error: invalid attribute "${attributes[i]}"`
				)
			}
			attributesObj[attributes[i]] = values[i]
		}
		return attributesObj
	}
	return Object.freeze({ list, set })
}
