import checkInteraction from './check-interaction.js'
import askUser from './ask-user.js'

export default async (prompt, races) => {
	let chosenRace
	await askUser(async () => {
		const { race } = await prompt.get(['race'])
		console.log(race)
		if (!races[race]) {
			return 'no races with this name. try again'
		}
		chosenRace = races[race]
	})

	if (chosenRace) {
		await checkInteraction(chosenRace, prompt)
		return chosenRace
	}
	throw new Error('fail to choose race.')
}
