import loader from '../loader/index.js'
import prompt from 'prompt'

import chooseRace from './chooseRace.js'
const maxTry = 5

const data = await loader()

prompt.start()
const race = await chooseRace(prompt, data.races, maxTry)

console.log({
	race,
})
