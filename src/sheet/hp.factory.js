import AdderData from './composition/adder-data.factory'
export default (sheet, keyAttribute) => {
	const dict = () => {
		const modifier = sheet.attributes.modifiers()[keyAttribute]
		const classList = Object.entries(sheet.classes.list)
		const adderDict = classList.reduce((dict, [key, obj]) => {
			for (let i = 1; i <= obj.level(); i++) {
				const isFirst = obj.isFirst
				if (isFirst) {
					const adderData = AdderData()
					adderData.set('level', obj.level1)
					adderData.set('modifier', modifier)
					dict[`first${key}[${i}]`] = adderData
					isFirst = false
				}
			}
			return dict
		}, {})
		console.log(adderDict)
	}
	dict()
	return {}
}
