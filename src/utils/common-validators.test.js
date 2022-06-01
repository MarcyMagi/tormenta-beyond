import * as validator from './common-validators'

describe('custom validators test', () => {
	describe('stringValidator', () => {
		it('should throw given not string', () => {
			expect(() => {
				validator.stringValidator(1, 'value', 'test error')
			}).toThrow('test error: value should be string')
		})
		it('should throw given empty string', () => {
			expect(() => {
				validator.stringValidator('', 'value', 'test error')
			}).toThrow('test error: value cannot be empty string')
		})
	})
	describe('numberValidator', () => {
		it('should throw given not number', () => {
			expect(() => {
				validator.numberValidator('', 'value', 'test error')
			}).toThrow('test error: value should be number')
		})
	})
	describe('intValidator', () => {
		it('should throw given not number', () => {
			expect(() => {
				validator.intValidator('', 'value', 'test error')
			}).toThrow('test error: value should be number')
		})
		it('should throw given not intenger', () => {
			expect(() => {
				validator.intValidator(1.5, 'value', 'test error')
			}).toThrow('test error: value should be integer')
		})
	})
	describe('arrayValidator', () => {
		it('should throw given not array', () => {
			expect(() => {
				validator.arrayValidator('', 'value', 'test error')
			}).toThrow('test error: value should be array')
		})
	})
	describe('stringArrayValidator', () => {
		it('should throw given not array', () => {
			expect(() => {
				validator.stringArrayValitador('', 'value', 'test error')
			}).toThrow('test error: value should be array')
		})
		it('should throw given not string on array', () => {
			expect(() => {
				validator.stringArrayValitador([1], 'value', 'test error')
			}).toThrow('test error: value[0] should be string')
		})
	})
})
