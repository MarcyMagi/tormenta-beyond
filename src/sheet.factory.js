import raceManager from './races/manager'
export default (config) => {
	const baseAttributes = config.attributes
	const baseRace = config.race

	const race = raceManager(baseRace.name, baseRace.config)

	let attributes = Object.assign({}, baseAttributes)
	attributes.for += race.modifiers.for
	attributes.des += race.modifiers.des
	attributes.con += race.modifiers.con
	attributes.int += race.modifiers.int
	attributes.sab += race.modifiers.sab
	attributes.car += race.modifiers.car

	return Object.assign({}, { attributes, race })
}
