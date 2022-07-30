const chooser = (choise, chosenDict) => {
	if (chosenDict.root) {
		if (choise.choose) {
			choise = choise.choose(...chosenDict.root)
		}
		delete chosenDict.root
	}

	const choiseEntries = Object.entries(choise)
	for (const [key, value] of choiseEntries) {
		if (typeof value !== 'object' || !value.choose) {
			continue
		}
		choise[key] = choise[key].choose(...chosenDict[key])
		choise[key] = chooser(choise[key], chosenDict)
	}
	return choise
}

export default chooser
