import loader from '../loader/index.js'
import prompt from 'prompt'
import chooseRace from './choose-race.js'

const start = async (customPrompt) => {
	const data = await loader()

	customPrompt.start()
	const race = await chooseRace(prompt, data.races)

	console.log({
		race,
	})
}

start(prompt)
