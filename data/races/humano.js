import { choose, attributeList, skillList } from '../utils.js'

export default () => {
	return {
		id: 'humano',
		label: 'Humano',
		description: 'O povo mais numeroso de Arton',
		tale: 'Humanos são como uma praga',
		modifiers: choose(
			'+2 em três atributos',
			attributeList,
			3,
			(...attributes) => attributesFill(attributes, [2, 2, 2])
		),
		abilities: {
			versatil: {
				name: 'Versátil',
				description: 'você se torna treinado ...',
				effects: [
					choose('1ª perícia', skillList, 1, (skill) => {
						return {
							on: 'load',
							callback: (sheet) => {
								sheet.skills[skill].train()
							},
						}
					}),
					choose('2ª vantagem', ['perícia', 'poder'], 1, (advantage) => {
						if (advantage === 'perícia') {
							return {
								on: 'load',
								callback: (sheet) => {
									sheet.skills[skill].train()
								},
							}
						}
						if (advantage === 'poder') {
							return choose('poder', powerList, 1, (power) => {
								return {
									on: 'config',
									callback: (config) => {
										config.effects.push(power)
									},
								}
							})
						}
					}),
				],
			},
		},
	}
}
