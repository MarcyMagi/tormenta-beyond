export default (attributeNames) => {
	const attributesArr = attributeNames
	const list = () => {
		return attributesArr
	}
	const set = (attributes, value) => {
		const newAttributes = {}
		for (const attribute of attributes) {
			if (attributesArr.includes(attribute)) {
				newAttributes[attribute] = value
			}
		}
		return newAttributes
	}
	return Object.assign({}, { list, set })
}
