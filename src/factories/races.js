import { attributes } from '../cache/index.js'

export default (name, modifiers, abilities) => {
	console.log(name)
	name = name.toLowerCase()
	modifiers = attributes.filter(modifiers)
	return Object.freeze({ name, modifiers, abilities })
}
