import LevelBehavior from './utils/level-behavior.factory.js'

export default (state) => {
	return LevelBehavior(state, 'hp', 'con')
}
