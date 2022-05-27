import humano from './data/races/humano'
import factory from './factory/race'

export default (race, values) => {
	if (race === 'humano') {
		return factory(humano, values)
	}
}
