import folderLoader from './folder-loader.js'
import loaderUtils from '../utils/loaderUtils.js'
import * as config from '../config.js'

export default async () => {
	const utils = loaderUtils(config)
	const races = await folderLoader('races', utils)
	return Object.assign({}, { races })
}
