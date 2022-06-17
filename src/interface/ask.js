const ask = async (obj, prompt) => {
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'object') {
			if (value.choose) {
				const askArr = []
				for (let i = 0; i < value.specs.quantity; i++) {
					askArr.push({
						type: 'list',
						name: 'arg_' + i,
						message: value.specs.label + ` [${i + 1}]`,
						choices: value.specs.options,
					})
				}
				for (let i = 0; i < 100; i++) {
					const resObj = await prompt(askArr)
					const resArr = Object.values(resObj)
					try {
						console.log(resArr)
						const chosen = value.choose(...resArr)
						obj[key] = chosen
						break
					} catch (e) {
						console.log(e)
						continue
					}
				}
			} else {
				obj[key] = await ask(value, prompt)
			}
		}
	}
	return obj
}

export default ask
