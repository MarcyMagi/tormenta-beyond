export default (e, func) => {
	return e.on('applyOnSheet', (sheet) => {
		func(sheet)
	})
}
