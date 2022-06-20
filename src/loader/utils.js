export default (values) => {
	const keys = Object.keys(values)
	const list = () => {
		return keys
	}
	return Object.freeze({ list })
}
