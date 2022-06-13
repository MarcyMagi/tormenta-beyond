import attributesFactory from './attributes'
export default (config) => {
	const attributes = attributesFactory(config.baseAttributes)
	return Object.assign(
		{},
		{
			attributes,
		}
	)
}
