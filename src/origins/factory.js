import basics from './basics'
import normalItems from './normal-items'
import chooseItems from './choose-items'
import chooseBenefit from './choose-benefit'

export default (state) => {
	const benefit = chooseBenefit(state.benefit)
	let items
	if (state.itemsConfig) {
		items = chooseItems(state.itemsConfig)
	} else {
		items = normalItems(state)
	}
	return Object.assign({}, basics(state), { items }, { benefit })
}
