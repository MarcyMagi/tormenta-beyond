import classesHandler from './classes-handler.js'
import SkillsCollection from './skills-collection.factory.js'
import Attribute from './attributes.factory.js'

export default async (loader, config) => {
	const sheet = {
		character: config.character,
		player: config.player,
	}
	sheet.attributes = Attribute(config.baseAttributes)
	Object.assign(sheet, await classesHandler(loader, config.classes, sheet))
	Object.assign(sheet, await SkillsCollection(loader, config.classes, sheet))
	return sheet
}
