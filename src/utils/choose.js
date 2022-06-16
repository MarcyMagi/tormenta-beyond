export default (label, options, quantity, callback) => {
	const choose = (...values) => {
		if (values.length !== quantity) {
			throw new Error(
				`choose error: "${label}" must recieve "${quantity}" args`
			)
		}
		const chosen = []
		for (const value of values) {
			if (!options.includes(value)) {
				throw new Error(`choose error: "${label}" invalid arg "${value}"`)
			}
			chosen.push(value)
		}
		return callback(chosen)
	}
	const specs = () => {
		return Object.freeze({ label, options, quantity })
	}

	return Object.freeze({ specs, choose })
}
