const ask = async (obj, prompt) => {
	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === 'object') {
			if (value.choose) {
				const quantity = value.specs.quantity
				const options = value.specs.options
				for (let tryIndex = 0; tryIndex < 100; tryIndex++) {
					const resArr = []
					for (let i = 0; i < quantity; i++) {
						const promptOptions = options.reduce((prev, cur) => {
							if (!resArr.includes(cur)) {
								prev.push(cur)
							}
							return prev
						}, [])
						const resObj = await prompt({
							type: 'list',
							name: 'arg_' + i,
							message: value.specs.label + ` [${i + 1}]`,
							choices: promptOptions,
						})
						resArr.push(Object.values(resObj)[0])
					}
					try {
						const chosen = value.choose(...resArr)
						obj[key] = chosen
						break
					} catch (e) {
						console.log(e.message)
						if (tryIndex < 100) {
							console.log('try again')
						} else {
							throw new Error('ask error: max tries')
						}
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
