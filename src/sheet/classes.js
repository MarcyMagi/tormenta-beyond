import extractFolder from '../utils/extract-folder'
import factory from '../classes/factory'

let classes = {}
const configs = await extractFolder('./src/data/classes')

for (const key of Object.keys(configs)) {
	const obj = factory(configs[key])
	classes[obj.name] = obj
}

export default classes
