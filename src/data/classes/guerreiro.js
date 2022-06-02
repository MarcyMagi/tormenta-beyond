export default {
	name: 'guerreiro',
	description: "hi, i'm a guerreiro",
	pv: {
		lvl1: 20,
		lvlup: 5,
	},
	pm: 3,
	skills: {
		fixConfig: {
			between: ['luta', 'pontaria'],
			fix: ['fortitude'],
		},
		quantity: 4,
		choose: [
			'adestramento',
			'atletismo',
			'cavalgar',
			'guerra',
			'iniciativa',
			'luta',
			'ofício',
			'percepção',
			'pontaria',
			'reflexos',
		],
	},
	proficiencies: ['armas marciais', 'armaduras pesadas', 'escudos'],
	abilities: [
		'ataque especial',
		'poder de guerreiro',
		'durão',
		'ataque extra',
		'campeão',
	],
}
