import factory from './factory.js'

const config = {
	effects: [
		{
			on: 'load',
			callback: (sheet) => {
				sheet.skills['acrobacia'].train()
			},
		},
		{
			on: 'config',
			callback: (config) => {
				config.effects.push({
					on: 'load',
					callback: (sheet) => {
						console.log('yey!')
					},
				})
			},
		},
	],
}

const sheet = await factory(config)

console.log(sheet)
