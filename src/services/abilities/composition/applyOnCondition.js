export default (e, enterFunc, leaveFunc, condition) => {
	e.on(`enterCondition[${condition}]`, (sheet) => {
		enterFunc(sheet)
	})
	e.on(`leaveCondition[${condition}]`, (sheet) => {
		leaveFunc(sheet)
	})
}
