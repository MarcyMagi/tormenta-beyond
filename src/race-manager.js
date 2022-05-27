import factory from './factory/race'
import humano from './data/races/humano'
import abilityManager from './ability-manager'

export default (race, meta) => {
	let newRace
	if (race === 'humano') {
		newRace = factory(humano, meta)
	}
	for (const i in newRace.abilities) {
		const abilityName = newRace.abilities[i]
		newRace.abilities[i] = {}
		newRace.abilities[i].name = abilityName
		newRace.abilities[i].origin = {
			type: 'race',
			value: race,
		}
	}
	return newRace
}
