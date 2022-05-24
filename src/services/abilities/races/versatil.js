import applyOnSheet from '../composition/applyOnSheet.js'

const name = 'versátil'
const description = ''

export default (e, skill, arg2th, isArg2thPower) => {
	let meta = {}
	meta.skills = [skill]

	if (isArg2thPower) {
		meta.power = arg2th
	} else {
		meta.skills.push(arg2th)
	}

	applyOnSheet(e, (sheet) => {
		for (let skill of meta.skills) {
			sheet.skills[skill].trained = true
		}
		if (meta.power) {
			sheet.powers.push(meta.power)
		}
	})

	return Object.assign({}, { name, description, meta })
}
