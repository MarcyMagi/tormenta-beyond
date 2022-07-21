import Skills from './skills.factory.js'
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
	state.skills = await Skills(loader, state)
	return Object.assign({}, state)
}
