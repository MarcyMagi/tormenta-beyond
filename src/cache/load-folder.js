import path from 'path'
import fs from 'fs'

const dataDir = path.resolve('./src')

export default async (folderName, utils) => {
	const folderPath = `${dataDir}/${folderName}`
	const obj = {}
	const folderArr = fs.readdirSync(folderPath)
	for await (const fileName of folderArr) {
		const defaultData = await import(`${folderPath}/${fileName}`)
		const data = defaultData.default(utils)
		obj[data.id] = Object.freeze(data)
	}
	return obj
}
