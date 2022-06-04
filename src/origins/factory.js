import basics from './basics'
import chooseBenefit from './choose-benefit'

export default (state) => {
	const benefit = chooseBenefit(state)
	return Object.assign({}, basics(state), { benefit })
}
