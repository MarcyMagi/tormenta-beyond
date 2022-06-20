import attributesLoader from './attributes.js'
import skillsLoader from './skills.js'
import choose from '../utils/choose.js'
import * as config from '../config.js'
import loadFolder from './load-folder.js'

const utils = { choose }
export const attributes = attributesLoader(config.attributes)
utils.attributes = attributes
export const skills = await loadFolder('skills', utils)
utils.skills = skillsLoader(skills)

export const races = await loadFolder('races', utils)
