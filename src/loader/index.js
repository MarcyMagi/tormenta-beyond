import attributesLoader from './attributes.js'
import utilsLoader from './utils.js'
import choose from '../utils/choose.js'
import loadFolder from './load-folder.js'

export default async (config) => {
	const utils = {
		choose,
	}
	utils.attributes = attributesLoader(config.attributes)

	const skills = await loadFolder('skills', utils, ['description'])
	utils.skills = utilsLoader(skills)

	const powers = await loadFolder('powers', utils, ['description'])
	utils.powers = utilsLoader(powers)

	const races = await loadFolder('races', utils, ['description', 'tale'])
	utils.races = utilsLoader(races)

	return {
		utils,
		skills,
		powers,
		races,
	}
}
