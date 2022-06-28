import * as config from '../config.js'
import loadFolder from '../loader/load-folder.js'
import chooseF from '../utils/choose.js'

export const attributeList = config.attributes
export const skillList = await loadFolder('skills')
export const choose = chooseF
