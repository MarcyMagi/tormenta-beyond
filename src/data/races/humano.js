export default {
	name: 'humano',
	description: 'O povo mais numeroso em Arton',
	tale: 'Humanos são como uma praga',
	modifiers: choose(
		'+2 em três atributos diferentes',
		attributes,
		3,
		applyAttributes
	),
	abilities: ['versátil'],
}
