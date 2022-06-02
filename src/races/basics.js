import * as validators from '../utils/common-validators'
import { defaultSize } from '../config/sheet-defaults'
const errPrefix = 'race basics error'
export default (state) => {
	const name = state.name
	const description = state.description
	const abilities = state.abilities ? state.abilities : []
	const size = state.size ? state.size : 'médio'
	const speed = state.speed ? state.speed : 9

	validators.stringValidator(name, 'name', errPrefix)
	validators.stringValidator(description, 'description', errPrefix)
	validators.stringArrayValitador(abilities, 'abilities', errPrefix)
	if (!defaultSize.includes(size)) {
		throw new Error(errPrefix + ': invalid size')
	}
	validators.intValidator(speed, 'speed', errPrefix)

	return Object.assign({}, { name, description, abilities, size, speed })
}
