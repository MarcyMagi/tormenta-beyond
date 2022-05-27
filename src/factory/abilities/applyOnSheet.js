export default (state, meta) => {
	const applyOnSheet = state.applyOnSheet(meta)
	return { applyOnSheet }
}
