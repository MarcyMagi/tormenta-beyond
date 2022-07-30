import LevelBehavior from './utils/level-behavior.factory.js'

export default async (loader, personalConfigs, sheet) => {
	const loadedClasses = await loader('t-classes')
	const hpConfig = {}
	const mpConfig = {}
	for (const [key, personalConfig] of Object.entries(personalConfigs)) {
		const classHpConfig = {}
		const staticConfig = loadedClasses[key]
		classHpConfig['levelUp'] = staticConfig.hp.levelUp
		classHpConfig['level'] = personalConfig.level
		if (personalConfig.isFirst) {
			classHpConfig['levelOne'] = staticConfig.hp.levelOne
		}
		const classMpConfig = {}
		classMpConfig['levelUp'] = staticConfig.mp.levelUp
		classMpConfig['level'] = personalConfig.level
		hpConfig[key] = classHpConfig
		mpConfig[key] = classMpConfig
	}
	const hp = LevelBehavior(sheet, hpConfig, 'con')
	const mp = LevelBehavior(sheet, mpConfig)
	return { hp, mp }
}
