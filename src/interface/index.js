import loader from '../loader/index.js'
import chooseRace from './choose-race.js'

export default async (prompt) => {
	const data = await loader()

	prompt.start()
	const race = await chooseRace(prompt, data.races)

	return Object.freeze({
		race,
	})
}
