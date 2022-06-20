export default (utils) => {
	const choose = utils.choose
	const attributeList = utils.attributes.list()
	const attributesFill = utils.attributes.fill
	const skillList = utils.skills.list()
	const powerList = utils.powers.list()
	return {
		id: 'humano',
		display: 'Humano',
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
				name: 'versátil',
				description: 'você se torna treinado ...',
				magic: false,
				action: 'passive',
				condition: false,
				mp: false,
				level: false,
				resistance: false,
				actions: [
					choose('1ª perícia', skillList, 1, (skill) => {
						return (sheet) => {
							sheet.skills[skill].train()
						}
					}),
					choose('2ª vantagem', ['perícia', 'poder'], 1, (vantagem) => {
						if (vantagem === 'perícia') {
							return choose('2ª perícia', skillList, 1, (skill) => {
								return (sheet) => {
									sheet.skills[skill].train()
								}
							})
						}
						if (vantagem === 'poder') {
							return choose('poder', powerList, 1, (power) => {
								return (sheet) => {
									sheet.powers.add(power)
								}
							})
						}
					}),
				],
			},
		},
	}
}
