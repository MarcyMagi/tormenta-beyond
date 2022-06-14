export default (utils) => {
	const choose = utils.choose
	const skillsList = utils.skills.list()
	const attributesList = utils.attributes.list()
	const attributesSet = utils.attributes.set
	return {
		name: 'humano',
		description: 'O povo mais numeroso em Arton',
		tale: 'Humanos são como uma praga',
		modifiers: choose('+2 em três atributos', attributesList, 3, (chosen) =>
			attributesSet(chosen, [2, 2, 2])
		),
		abilities: [
			{
				name: 'versátil',
				description: 'você se torna treinado ...',
				magic: false,
				actions: [
					{
						action: 'passive',
						condition: false,
						mp: false,
						level: false,
						resistance: false,
						execute: choose('1ª skill', skillsList, 1, () => {}),
					},
				],
			},
		],
	}
}
