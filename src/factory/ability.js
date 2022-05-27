import basic from './abilities/basic'
import applyOnSheet from './abilities/applyOnSheet'

export default (state, origin, meta) => {
	return Object.assign({}, basic(state, origin), applyOnSheet(state, meta))
}
