const attributeCheck = (attributes) => {
	for (const attribute of attributes) {
		if (!Number.isInteger(attribute)) {
			throw new Error('attribute error: not integer')
		}
	}
}

export default (attributes) => {
	const base = {
		for: attributes.for,
		des: attributes.des,
		con: attributes.con,
		int: attributes.int,
		sab: attributes.sab,
		car: attributes.car,
	}
	const meta = {
		base,
	}

	const final = base
	attributeCheck(Object.values(final))
	return Object.assign({}, { meta }, final)
}
