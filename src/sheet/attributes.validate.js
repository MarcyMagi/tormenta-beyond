export default (attributes) => {
	const err = []
	for (const [key, value] of Object.entries(attributes)) {
		if (!Number.isInteger(value)) {
			err.push(key)
		}
	}
	if (err.length > 0) {
		throw new Error(
			`attribute validate error: attribute [${err.join(', ')}] must be integer`
		)
	}
}
