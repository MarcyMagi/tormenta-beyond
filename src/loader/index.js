import attributesLoader from './attributes.js'
import utilsLoader from './utils.js'
import choose from '../utils/choose.js'
import * as config from '../config.js'
import loadFolder from './load-folder.js'

const utils = { choose }
export const attributes = attributesLoader(config.attributes)
utils.attributes = attributes
export const skills = await loadFolder('skills', utils)
utils.skills = utilsLoader(skills)
export const powers = await loadFolder('powers', utils)
utils.powers = utilsLoader(powers)

export const races = await loadFolder('races', utils)
