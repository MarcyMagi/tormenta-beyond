import NumericData from './numeric-data.factory'
describe('sheet composition numeric data', () => {
	let data
	beforeEach(() => {
		data = NumericData('weird data', { level: 10, base: 5 })
	})
	it('should calculate correctly', () => {
		const n = data.calculate()
		expect(n).toBe(15)
	})
	it('should get dict correctly', () => {
		const meta = data.dict()
		expect(meta).toEqual({ level: 10, base: 5 })
	})
	it('should add other', () => {
		data.set('new', -2)
		const n = data.calculate()
		expect(n).toBe(13)
		const meta = data.dict()
		expect(meta).toEqual({ level: 10, base: 5, new: -2 })
	})
	it('should remove other', () => {
		data.set('new', 2)
		data.remove('new')
		const n = data.calculate()
		expect(n).toBe(15)
		const meta = data.dict()
		expect(meta).toEqual({ level: 10, base: 5 })
	})
	it('should throw trying to remove fix', () => {
		expect(() => {
			data.remove('base')
		}).toThrow("weird data error: key 'base' is fix")
	})
})
