import raceFactory from './race.js'
import versatil from '../abilities/versatil.js'

const validateAttributes = (attributes) => {
	if (attributes.length !== 3) {
		throw new Error('race humano error: should recieve 3 attributes')
	}
}

export default (attributes) => {
	validateAttributes(attributes)
	let modifiers = {}
	for (const attribute of attributes) {
		modifiers[attribute] = 2
	}

	return (skill1th, type2th, value2th) => {
		let abilities = [versatil(skill1th, type2th, value2th)]
		return raceFactory(modifiers, abilities)
	}
}
