export default () => {
	return {
		hp: {
			levelOne: 8,
			levelUp: 2,
		},
		mp: {
			levelUp: 6,
		},
		fixSkills: ['misticismo', 'vontade'],
		chooseSkills: {
			quantity: 1,
			options: ['conhecimento', 'inciativa', 'oficio', 'percepção'],
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
