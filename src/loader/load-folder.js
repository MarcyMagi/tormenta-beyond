import path from 'path'
import fs from 'fs'

const dataDir = path.resolve('./src/tormenta_data')

export default async (folderName, ignoreKeys = []) => {
	const folderPath = `${dataDir}/${folderName}`
	const retArr = []
	const folderArr = fs.readdirSync(folderPath)
	for await (const fileName of folderArr) {
		const defaultData = await import(`${folderPath}/${fileName}`)
		const data = defaultData.default()
		for (const ignore of ignoreKeys) {
			delete data[ignore]
		}
		retArr.push(data)
	}
	return retArr
}
