import { EventEmitter } from 'events'
import Attributes from './attributes.factory.js'
import LevelBehavior from './utils/level-behavior.factory.js'
import skillsCollection from './skills-collection'
export default async (loader, config = {}) => {
	const sheet = {
		emitter: new EventEmitter(),
		character: config.character,
		player: config.player,
		// race, origin, t-class, divinity
		attributes: Attributes(),
	}
	sheet.hp = LevelBehavior(sheet)
	sheet.mp = LevelBehavior(sheet)
	await skillsCollection(loader, sheet)
	if (!config.baseAttributes) {
		return sheet
	}
	sheet.attributes.set('base', config.baseAttributes)
	return sheet
}
