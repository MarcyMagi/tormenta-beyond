export default (attributeNames) => {
	const attributesArr = attributeNames
	const list = () => {
		return attributesArr
	}
	const set = (attributes, values) => {
		const attributesObj = {}
		for (const attributeName of attributesArr) {
			const index = attributes.indexOf(attributeName)
			attributesObj[attributeName] = index !== -1 ? values[index] : 0
		}
		return attributesObj
	}
	return Object.freeze({ list, new: set })
}
