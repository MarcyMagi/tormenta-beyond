import chooseSetup from '../utils/choose-setup'
const errPrefix = 'origin choose items'
export default (itemsConfig) => {
	return chooseSetup(itemsConfig, errPrefix)
}
