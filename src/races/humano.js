export default (utils) => {
	const choose = utils.choose
	const skillsList = ['acrobacia']
	const attributesList = utils.attributes.list()
	const attributesSet = utils.attributes.set
	return {
		id: 'humano',
		display: 'Humano',
		description: 'O povo mais numeroso de Arton',
		tale: 'Humanos são como uma praga',
		modifiers: choose('+2 em três atributos', attributesList, 3, (chosen) =>
			attributesSet(chosen, [2, 2, 2])
		),
		abilities: [
			{
				name: 'versátil',
				description: 'você se torna treinado ...',
				magic: false,
				action: 'passive',
				condition: false,
				mp: false,
				level: false,
				resistance: false,
				actions: [choose('1ª skill', skillsList, 1, () => {})],
			},
		],
	}
}
