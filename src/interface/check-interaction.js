import askUser from './ask-user.js'
export default async (obj, prompt) => {
	for (const [key, value] of Object.entries(obj)) {
		const interaction = value.userInteraction
		if (!interaction) {
			continue
		} else if (interaction === 'choose') {
			const specs = value.specs()
			await askUser(async () => {
				const args = []
				for (let count = 1; count <= specs.quantity; count++) {
					const res = await prompt.get([`${specs.label} [${count}]`])
					args.push(Object.values(res)[0])
				}
				try {
					const newValue = value.choose(...args)
					obj[key] = newValue
				} catch {
					return 'fail to choose. try again'
				}
			})
		}
	}
}
