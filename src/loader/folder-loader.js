import fs from 'fs'
import path from 'path'

const directory = path.resolve('./src')

export default async (folderName, utils) => {
	const pathFolder = `${directory}/${folderName}`
	const folder = fs.readdirSync(pathFolder)
	const data = {}
	for await (const file of folder) {
		const func = (await import(`${pathFolder}/${file}`)).default
		const raw = func(utils)
		data[raw.name] = raw
	}
	return Object.freeze(data)
}
