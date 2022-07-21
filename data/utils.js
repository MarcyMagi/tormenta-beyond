import * as config from '../src/config.js'
import loadFolder from '../src/loader/load-folder.js'
import chooseF from '../src/utils/choose.js'

export const attributeList = config.attributes
export const skillList = await loadFolder('skills')
export const choose = chooseF
