import { defaultAttributes } from '../config/sheet-defaults'
export default (state) => {
	const attributesConfig = state.attributes
	const func = (...args) => {
		if (attributesConfig.quantity !== args.length) {
			throw new Error(
				`choose attributes error: function must recieve exactly ${attributesConfig.quantity} args`
			)
		}
		let attributes = {
			for: 0,
			des: 0,
			con: 0,
			int: 0,
			sab: 0,
			car: 0,
		}
		for (const arg of args) {
			if (!defaultAttributes.includes(arg)) {
				throw new Error('choose attributes error: invalid attribute')
			}
			attributes[arg] = attributesConfig.value
		}

		return Object.assign({}, attributes)
	}
	return func
}
