import * as validators from '../utils/common-validators'
const errPrefix = 'race basics error'
export default (state) => {
	const name = state.name
	const description = state.description
	const pv = {
		lvl1: state.pv.lvl1,
		lvlup: state.pv.lvlup,
	}
	const pm = state.pm
	const proficiencies = state.proficiencies ? state.proficiencies : []
	const abilities = state.abilities ? state.abilities : []

	validators.stringValidator(name, 'name', errPrefix)
	validators.stringValidator(description, 'description', errPrefix)
	validators.intValidator(pv.lvl1, 'pvp.lvl1', errPrefix)
	validators.intValidator(pv.lvlup, 'pvp.lvlup', errPrefix)
	validators.intValidator(pm, 'pm', errPrefix)
	validators.stringArrayValitador(proficiencies, 'proficiencies', errPrefix)
	validators.stringArrayValitador(abilities, 'abilities', errPrefix)

	return Object.assign(
		{},
		{ name, description, pv, pm, proficiencies, abilities }
	)
}
