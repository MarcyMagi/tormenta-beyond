import factory from './factory/ability'
import versatil from './data/abilities/versatil'

export default (ability, origin, meta) => {
	let newAbility
	if (ability === 'versátil') {
		newAbility = factory(versatil, origin, meta)
	}
	return newAbility
}
