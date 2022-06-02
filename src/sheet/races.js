import extractFolder from '../utils/extract-folder'
import factory from '../races/factory'

let races = {}
const configs = await extractFolder('./src/data/races')

for (const key of Object.keys(configs)) {
	const obj = factory(configs[key])
	races[obj.name] = obj
}

export default races
