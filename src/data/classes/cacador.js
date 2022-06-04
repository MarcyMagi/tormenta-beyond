export default {
	name: 'caçador',
	description: "hi, i'm a caçador",
	pv: {
		lvl1: 16,
		lvlup: 4,
	},
	pm: 4,
	skills: {
		fixConfig: {
			choose: ['luta', 'pontaria'],
			fix: ['sobrevivência'],
		},
		quantity: 4,
		choose: [
			'adestramento',
			'atletismo',
			'cavalgar',
			'cura',
			'fortitude',
			'furtividade',
			'iniciativa',
			'investigação',
			'luta',
			'ofício',
			'pontaria',
			'reflexos',
		],
	},
	proficiencies: ['armas marciais', 'escudos'],
	abilities: [
		'marca da presa',
		'rastreador',
		'poder de caçador',
		'explorador',
		'caminho do explorador',
		'mestre caçador',
	],
}
