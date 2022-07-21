export default (attributeNames) => {
	const list = () => {
		return attributeNames
	}
	const filter = (toFilter, fillZeros = false) => {
		const filterKeys = Object.keys(toFilter)
		const filtered = attributeNames.reduce((prev, cur) => {
			if (!filterKeys.includes(cur)) {
				if (fillZeros) {
					prev[cur] = 0
				}
				return prev
			}
			prev[cur] = toFilter[cur]
			return prev
		}, {})

		return filtered
	}
	return Object.freeze({ list, filter })
}
