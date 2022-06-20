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
		modifiers: choose('+2 em três atributos', attributeList, 3, (chosen) =>
			attributesFill(chosen, [2, 2, 2])
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
					choose('1ª perícia', skillList, 1, () => {
						return () => {}
					}),
					choose('2ª vantagem', ['perícia', 'poder'], 1, (chosen) => {
						chosen = chosen[0]
						if (chosen === 'perícia') {
							return choose('2ª perícia', skillList, 1, () => {
								return () => {}
							})
						}
						if (chosen === 'poder') {
							return choose('poder', powerList, 1, () => {
								return () => {}
							})
						}
					}),
				],
			},
		},
	}
}
