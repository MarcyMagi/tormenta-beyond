import loadFolder from '../loader/load-folder.js'
import skillFactory from './skills.factory.js'
import attributeFactory from './attributes.factory.js'
import EventEmitter from 'events'

export default async (config) => {
	const skillsData = await loadFolder('skills')
	const raceData = await loadFolder('races')

	const race = raceData.filter((v) => v.id === config.race.id)[0].display

	const sheet = {
		character: config.character,
		player: config.player,
		race,
		emitter: new EventEmitter(),
	}

	const onConfig = () => {
		for (let i in config.effects) {
			if (config.effects[i].on === 'config') {
				config.effects[i].do(config)
				config.effects.splice(i, 1)
			}
		}
	}

	const buildAttributes = () => {
		sheet.attributes = attributeFactory(config.baseAttributes, sheet)
		sheet.attributes.addOther('race', config.race.modifiers)
	}

	const buildSkills = () => {
		const skills = {}
		for (const skillData of skillsData) {
			const id = skillData.id
			skills[id] = skillFactory(id, skillData.attribute, sheet)
		}
		sheet.skills = skills
	}

	const applyEffects = () => {
		for (const effect of config.effects) {
			effect.do(sheet)
		}
	}

	onConfig()
	buildAttributes()
	buildSkills()
	applyEffects()
	return sheet
}
