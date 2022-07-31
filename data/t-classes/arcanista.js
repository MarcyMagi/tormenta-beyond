import { choose } from '../utils.js'
export default () => {
	return {
		id: 'arcanista',
		hp: {
			levelOne: 8,
			levelUp: 2,
		},
		mp: {
			levelUp: 6,
		},
		skills: choose(
			'1 skill',
			['conhecimento', 'inciativa', 'oficio', 'percepcao'],
			1,
			(chosenSkill) => {
				return ['misticismo', 'vontade', chosenSkill]
			}
		),
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
