import attributesFactory from './attributes.factory.js'
import choose from '../utils/choose.js'
import * as config from '../config.js'
import loadFolder from './load-folder.js'

const utils = { choose }
export const attributes = attributesFactory(config.attributes)
utils.attributes = attributes

export const races = await loadFolder('races', utils)
