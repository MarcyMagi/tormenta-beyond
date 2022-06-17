export default async (obj, prompt) => {
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'object') {
			if (value.choose) {
				for (let i = 0; i < 100; i++) {
					const { res } = await prompt([
						{
							type: 'list',
							name: 'res',
							message: value.specs.label,
							choices: value.specs.options,
						},
					])
					try {
						const chosen = value.choose(...res)
						obj[key] = chosen
						break
					} catch {
						continue
					}
				}
			}
		}
	}
	return obj
}
