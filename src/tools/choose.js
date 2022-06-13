const defaultCallback = (chosen) => {
	return chosen
}

export default (label, options, quantity, callback = defaultCallback) => {
	const choose = (...args) => {
		return callback(args)
	}
	return Object.assign({}, { label, options, quantity, choose })
}
