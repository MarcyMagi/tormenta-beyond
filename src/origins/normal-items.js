import { stringArrayValitador } from '../utils/common-validators'
export default (state) => {
	const items = state.items
	stringArrayValitador(items)
	return items
}
