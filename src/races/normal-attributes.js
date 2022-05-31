import attributeFactory from '../sheet/attributes.factory'
export default (state) => {
	let stateAtt = state.attributes
	const attributes = attributeFactory(stateAtt)
	return Object.assign({}, { attributes })
}
