import attributesValidate from '../sheet/attributes.validate'
export default (state) => {
	let stateAtt = state.attributes
	const attributes = {
		for: stateAtt.for ? stateAtt.for : 0,
		des: stateAtt.des ? stateAtt.des : 0,
		con: stateAtt.con ? stateAtt.con : 0,
		int: stateAtt.int ? stateAtt.int : 0,
		sab: stateAtt.sab ? stateAtt.sab : 0,
		car: stateAtt.car ? stateAtt.car : 0,
	}
	attributesValidate(attributes)
	return Object.assign({}, { attributes })
}
