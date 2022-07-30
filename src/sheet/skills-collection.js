import Skill from './skills.factory.js'
export default async (loader, classConfig, sheet) => {
	const data = await loader('skills', ['description'])
	const handler = {}
	for await (const [id, config] of Object.entries(data)) {
		handler[id] = Skill(id, config, classConfig, sheet)
	}
	return { skills: handler }
}
