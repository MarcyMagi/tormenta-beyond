import _ from 'lodash'
import raceManager from './race-manager'
import abilityManager from './ability-manager'
import applyOnSheet from './factory/abilities/applyOnSheet'
export default (config) => {
	const baseAttributes = config.attributes
	const baseRace = config.race
	const abilityConfigs = config.abilities

	let abilityProperties = []

	const race = raceManager(baseRace.name, baseRace.meta)
	abilityProperties = _.merge(abilityProperties, race.abilities)

	let abilities = []
	let applyOnSheet = []
	let powers = []

	for (const ability of abilityProperties) {
		const evalAbility = abilityManager(
			ability.name,
			ability.origin,
			abilityConfigs[ability.name]
		)
		applyOnSheet.push(evalAbility.applyOnSheet)
		delete evalAbility.applyOnSheet
		abilities.push(evalAbility)
	}

	let attributes = Object.assign({}, baseAttributes)
	attributes.for += race.modifiers.for
	attributes.des += race.modifiers.des
	attributes.con += race.modifiers.con
	attributes.int += race.modifiers.int
	attributes.sab += race.modifiers.sab
	attributes.car += race.modifiers.car

	let skills = {
		acrobacia: {
			attribute: 'for',
			trained: true,
		},
	}

	let sheet = { attributes, race, abilities, skills, powers }

	for (const func of applyOnSheet) {
		func(sheet)
	}

	return Object.assign({}, sheet)
}
