export default (attributeNames) => {
	const list = () => {
		return attributeNames
	}
	const filter = (toFilter) => {
		const filtered = {}
		const keysToFilter = Object.keys(toFilter)
		for (const attributeName of attributeNames) {
			filtered[attributeName] = keysToFilter.includes(attributeName)
				? toFilter[attributeName]
				: 0
		}
		return filtered
	}
	return Object.freeze({ list, filter })
}
