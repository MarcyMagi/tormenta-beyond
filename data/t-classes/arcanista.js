export default () => {
	return {
		hp: {
			levelOne: 8,
			levelUp: 2,
		},
		mp: {
			levelUp: 6,
		},
		skills: {
			fix: ['misticismo', 'vontade'],
			quantity: 1,
			options: ['conhecimento', 'inciativa', 'oficio', 'percepcao'],
		},
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
