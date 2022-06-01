import fs from 'fs'
import path from 'path'
import factory from './factory'

let races = {}

const racesFolder = path.resolve('./src/data/races')
const racesFiles = fs.readdirSync(racesFolder)
for await (const file of racesFiles) {
	const mod = await import(racesFolder + '/' + file)
	const raw = mod.default
	races[raw.name] = factory(raw)
}

export default { races }
