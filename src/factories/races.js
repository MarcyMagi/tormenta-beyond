import { attributes } from '../cache'

export default (name, modifiers, abilities) => {
	name = name.toLowerCase()
	modifiers = attributes.filter(modifiers)
	return Object.freeze({ name, modifiers, abilities })
}
