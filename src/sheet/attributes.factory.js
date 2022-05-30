import attributesValidate from './attributes.validate'

export default (attributesObj) => {
	const attributes = {
		for: attributesObj.for,
		des: attributesObj.des,
		con: attributesObj.con,
		int: attributesObj.int,
		sab: attributesObj.sab,
		car: attributesObj.car,
	}
	attributesValidate(attributes)
	return Object.assign({}, attributes)
}
