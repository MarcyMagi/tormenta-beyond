import loadFolder from '../loader/load-folder.js'
import skillFactory from './skills.factory.js'

export default async (config) => {
	const skillsData = await loadFolder('skills')

	const sheet = {}

	const onConfig = () => {
		for (let i in config.effects) {
			if (config.effects[i].on === 'config') {
				config.effects[i].callback(config)
				config.effects.splice(i, 1)
			}
		}
	}

	const loadSkills = () => {
		const skills = {}
		for (const skillData of skillsData) {
			const id = skillData.id
			skills[id] = skillFactory(id, skillData.attribute, sheet)
		}
		sheet.skills = skills
	}

	const applyEffects = () => {
		for (const effect of config.effects) {
			effect.callback(sheet)
		}
	}

	onConfig()
	loadSkills()
	applyEffects()
	return sheet
}
