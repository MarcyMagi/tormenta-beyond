import index from './index.js'

const data = await index()
const races = data.races
console.log(races['humano'])
