import path from 'path'
import fs from 'fs'
export default async (srcPath) => {
	const obj = {}
	const folder = path.resolve(srcPath)
	const files = fs.readdirSync(folder)
	for await (const file of files) {
		const moduleObj = await import(folder + '/' + file)
		const raw = moduleObj.default
		obj[path.parse(file).name] = raw
	}
	return Object.assign({}, obj)
}
