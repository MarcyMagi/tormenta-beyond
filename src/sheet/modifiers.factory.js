import attributeValidate from './attributes.validate'
export default (attributesObj) => {
	const modifiers = {
		for: Math.floor((attributesObj.for - 10) / 2),
		des: Math.floor((attributesObj.des - 10) / 2),
		con: Math.floor((attributesObj.con - 10) / 2),
		int: Math.floor((attributesObj.int - 10) / 2),
		sab: Math.floor((attributesObj.sab - 10) / 2),
		car: Math.floor((attributesObj.car - 10) / 2),
	}
	attributeValidate(modifiers)
	return Object.assign({}, modifiers)
}
