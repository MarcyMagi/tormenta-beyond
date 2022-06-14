export default (utils) => {
	const choose = utils.choose
	const attributesList = utils.attributesUtils.list()
	const attributesSet = utils.attributesUtils.set
	return {
		name: 'humano',
		description: 'O povo mais numeroso em Arton',
		tale: 'Humanos são como uma praga',
		modifiers: choose('+2 em três atributos', attributesList, 3, (chosen) =>
			attributesSet(chosen, 2)
		),
		abilities: ['versátil'],
	}
}
