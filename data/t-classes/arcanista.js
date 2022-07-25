export default () => {
	return {
		hp: {
			levelOne: 8,
			levelUp: 2,
		},
		mana: {
			levelUp: 6,
		},
		skills: ['misticismo', 'vontade', 'conhecimento'], //Ou iniciativa, oficio e percepção
		proficiency: [],
		abilities: {
			1: ['caminho-do-arcanista', 'magias'],
			5: ['magias'],
			9: ['magias'],
			13: ['magias'],
			17: ['magias'],
			20: ['alto arcana'],
		},
	}
}
