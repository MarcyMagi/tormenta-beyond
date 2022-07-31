import loadFolder from '../src/loader/load-folder.js'
import chooseF from '../src/utils/choose.js'

export const attributesList = ['for', 'des', 'con', 'int', 'sab', 'car']
export const skillsList = await loadFolder('skills')
export const choose = chooseF
