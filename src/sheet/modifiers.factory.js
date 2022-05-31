import attributesFactory from './attributes.factory'
export default (attributesObj) => {
	let modifiers = attributesFactory(attributesObj)
	for (const key of Object.keys(modifiers)) {
		modifiers[key] = Math.floor((modifiers[key] - 10) / 2)
	}
	return Object.assign({}, modifiers)
}
