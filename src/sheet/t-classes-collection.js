//make it a factory
import LevelBehavior from './utils/level-behavior.factory.js'

export default async (loader, personalConfigs, sheet) => {
	const loadedClasses = await loader('t-classes')
	for (const [key, personalConfig] of Object.entries(personalConfigs)) {
		const staticConfig = loadedClasses[key]
	}
}
