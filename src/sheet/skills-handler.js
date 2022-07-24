import Skill from './skill.factory.js'
export default async (loader, state) => {
	const data = await loader('skills', ['description'])
	const handler = {}
	for await (const [id, config] of Object.entries(data)) {
		handler[id] = Skill(id, config, state)
	}
	return handler
}
