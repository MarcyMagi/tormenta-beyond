export default {
	name: 'versátil',
	description: "hey, i'm versátil!",
	applyOnSheet: (meta) => {
		return (sheet) => {
			let skills = meta.skills
			let power = meta.power
			for (const skill of skills) {
				sheet.skills[skill].trained = true
			}
			if (power) {
				sheet.powers.push(power)
			}
		}
	},
}
