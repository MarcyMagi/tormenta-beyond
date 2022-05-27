import factory from './factory/race'
import humano from './data/races/humano'

export default (race, meta) => {
	let newRace
	if (race === 'humano') {
		newRace = factory(humano, meta)
	}
	return newRace
}
