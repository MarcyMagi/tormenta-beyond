export default {
	name: 'versátil',
	description: 'você se torna treinado...',
	passives: [
		choose('1ª vantagem', skills, 1, (chosen) => {
			return (sheet) => {
				console.log('1 perícia!')
			}
		}),
		choose('2ª vantagem', ['perícia', 'poder'], 1, (advantage) => {
			switch (advantage[0]) {
				case 'perícia':
					return choose('perícia', skills, 1, (chosen) => {
						return (sheet) => {
							console.log('2 perícia!')
						}
					})
					break
				case 'poder':
					return choose('poder', powers, 1, (chosen) => {
						return (sheet) => {
							console.log('1 poder!')
						}
					})
				default:
					throw new Error('versátil error')
			}
		}),
	],
}
