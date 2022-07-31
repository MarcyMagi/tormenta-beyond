import { jest } from '@jest/globals'

export default () => {
	let classCounter = 1
	const mockClass = jest.fn((skills) => {
		const tClass = {
			label: 'class' + classCounter,
			hp: {
				levelOne: 8,
				levelUp: 2,
			},
			mp: {
				levelUp: 6,
			},
			skills: skills,
			proficiency: [],
			abilities: {},
		}
		classCounter++
		return tClass
	})
	return mockClass
}
