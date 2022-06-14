export default async (prompt, races, maxTry) => {
	let chosenRace
	for (let i = 0; i < maxTry; i++) {
		const { race } = await prompt.get(['race'])
		if (!races[race]) {
			console.log('no races with this name. try again')
			continue
		}
		chosenRace = races[race]
		break
	}
	if (chosenRace) {
		for (const [key, value] of Object.entries(chosenRace)) {
			const interaction = value.userInteraction
			if (!interaction) {
				continue
			} else if (interaction === 'choose') {
				for (let i = 0; i < maxTry; i++) {
					const args = []
					for (let count = 1; count <= value.quantity; count++) {
						const res = await prompt.get([`${value.label} [${count}]`])
						args.push(Object.values(res)[0])
					}
					try {
						const newValue = value.choose(...args)
						chosenRace[key] = newValue
						break
					} catch {
						console.log('fail to choose. try again')
						continue
					}
				}
			}
		}
		return chosenRace
	}
	throw new Error('fail to choose race.')
}
