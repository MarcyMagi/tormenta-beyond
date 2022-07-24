import SkillsHandler from './skills-handler.js'
import Attribute from './attributes.factory.js'

export default async (loader, config) => {
	const racesDict = await loader('races')
	const state = {
		character: config.character,
		player: config.player,
		race: racesDict[config.race.id].label,
		//dev workaround
		classes: {
			totalLevel: () => 1,
		},
	}

	state.attributes = Attribute(config.baseAttributes)
	state.skills = await SkillsHandler(loader, state)
	return Object.assign({}, state)
}
