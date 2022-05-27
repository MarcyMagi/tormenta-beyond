import humano from './humano'
import factory from './race.factory'

export default (race, values) => {
	if (race === 'humano') {
		return factory(humano, values)
	}
}
