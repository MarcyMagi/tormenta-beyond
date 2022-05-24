import applyOnCondition from '../composition/applyOnCondition.js'

const name = 'conhecimento das rochas'
const description = ''
const advantage = 'visão no escuro'

const addToSkill = (skill) => {
	const exists = skill.others.find((obj) => obj.origin === name)
	if (!exists) {
		skill.others.push({
			origin: name,
			value: 2,
		})
	}
}
const removeFromSkill = (skill) => {
	skill.others = skill.others.filter((obj) => obj.origin !== name)
	console.log(skill.others)
}

export default (e) => {
	const enterFunc = (sheet) => {
		if (!sheet.advantages.includes(advantage)) {
			sheet.advantages.push(advantage)
		}

		addToSkill(sheet.skills.percepcao)
		addToSkill(sheet.skills.sobrevivencia)
	}

	const leaveFunc = (sheet) => {
		sheet.advantages = sheet.advantages.filter((value) => value !== advantage)
		removeFromSkill(sheet.skills.percepcao)
		removeFromSkill(sheet.skills.sobrevivencia)
	}

	applyOnCondition(e, enterFunc, leaveFunc, 'subterraneo')
	return Object.assign({ name, description })
}
