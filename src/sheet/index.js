import { EventEmitter } from 'events'
import ClassesCollection from './classes-collection.js'
import SkillsCollection from './skills-collection.js'
import Attribute from './attributes.factory.js'

export default async (loader, config) => {
	const sheet = {
		character: config.character,
		player: config.player,
		emitter: new EventEmitter(),
	}
	sheet.attributes = Attribute(config.baseAttributes, sheet)
	Object.assign(sheet, await ClassesCollection(loader, config.classes, sheet))
	Object.assign(sheet, await SkillsCollection(loader, config.classes, sheet))
	return sheet
}
