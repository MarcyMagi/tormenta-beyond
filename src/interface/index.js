import { races } from '../cache/index.js'
//import ask from './ask-details.js'

const list = (obj) => {
	return Object.values(obj).reduce((prev, cur) => {
		prev.push({ name: cur.display, value: cur.id })
		return prev
	}, [])
}

export default async (prompt) => {
	const { race } = await prompt([
		{
			type: 'list',
			name: 'race',
			message: 'Qual raça você quer?',
			choices: list(races),
		},
	])
	const chosenRace = races[racePrompt.race]
	console.log(chosenRace.modifiers)
}
