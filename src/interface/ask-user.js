const maxTries = 10
export default async (callback) => {
	for (let i = 0; i < maxTries; i++) {
		const err = await callback(i)
		if (err) {
			console.log(err)
			continue
		}
		break
	}
}
