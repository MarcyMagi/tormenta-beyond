import folderLoader from './folder-loader.js'
import basicUtils from '../utils/basic-utils.js'
import * as config from '../config.js'

const convertUtil = (obj) => {
	return {
		list: () => {
			return Object.keys(obj)
		},
	}
}

export default async () => {
	const utils = basicUtils(config)
	const skills = await folderLoader('skills', utils)
	utils.skills = convertUtil(skills)
	const races = await folderLoader('races', utils)
	return Object.freeze({ races })
}
