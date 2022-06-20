import * as config from '../config.js'
import loader from '../loader/index.js'
import inquirer from 'inquirer'
import ask from './ask.js'
const prompt = inquirer.prompt
const data = await loader(config)

const { race } = await prompt([
	{
		type: 'list',
		name: 'race',
		message: 'Qual raça você quer?',
		choices: data.utils.races.list(),
	},
])
const chosenRace = Object.assign({}, data.races[race])
const raceAnwser = await ask(chosenRace, prompt)
