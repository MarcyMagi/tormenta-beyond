import path from 'path'
import fs from 'fs'

const dataDir = path.resolve('./data')

export default async (folderName, ignoreKeys = []) => {
	const folderPath = `${dataDir}/${folderName}`
	const dict = {}
	const folderArr = fs.readdirSync(folderPath)
	for await (const fileName of folderArr) {
		const defaultData = await import(`${folderPath}/${fileName}`)
		const data = defaultData.default()
		for (const ignore of ignoreKeys) {
			delete data[ignore]
		}
		const id = data.id
		delete data.id
		dict[id] = data
	}
	return dict
}
