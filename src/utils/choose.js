const userInteraction = 'choose'
export default (label, options, quantity, callback) => {
	const choose = (...values) => {
		if (values.length !== quantity) {
			throw new Error('choose error')
		}
		const chosen = []
		for (const value of values) {
			if (!options.includes(value)) {
				throw new Error('choose error')
			}
			chosen.push(value)
		}
		return callback(chosen)
	}
	return Object.assign(
		{},
		{ userInteraction, label, options, quantity, choose }
	)
}
