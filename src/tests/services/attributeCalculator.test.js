import * as calculator from '../../services/attribute-calculator.js'
const { modifierCalculator, rollCalculator, pointCalculator } = calculator

let diceIndex = 0
const fakeDice = (values) => ({
	detailed: () => {
		diceIndex++
		return { rolls: values[diceIndex - 1] }
	},
})

describe('attributeCalculator', () => {
	describe('modifierCalculator', () => {
		describe('calculate', () => {
			it('should calculate even number correctly', () => {
				const res = modifierCalculator.calculate(10)
				expect(res).toBe(0)
			})
			it('should calculate odd number correctly', () => {
				const res = modifierCalculator.calculate(9)
				expect(res).toBe(-1)
			})
			it('should throw if given not integer', () => {
				expect(() => modifierCalculator.calculate(1.2)).toThrow()
			})
			it('should throw if given less than 3', () => {
				expect(() => modifierCalculator.calculate(2)).toThrow()
			})
			it('should throw if given more than 38', () => {
				expect(() => modifierCalculator.calculate(40)).toThrow()
			})
		})
		describe('calculateMany', () => {
			it('should return correctly', () => {
				const res = modifierCalculator.calculateMany([10, 9, 10, 9, 10, 9])
				expect(res).toStrictEqual([0, -1, 0, -1, 0, -1])
			})
			it('should throw if given not array', () => {
				expect(() => {
					modifierCalculator.calculateMany('no array')
				}).toThrow()
			})
			it('should throw if given empty array', () => {
				expect(() => {
					modifierCalculator.calculateMany([])
				}).toThrow()
			})
			it('should throw if given array with more than 6 elements', () => {
				expect(() => {
					modifierCalculator.calculateMany([1, 2, 3, 4, 5, 6, 7])
				}).toThrow()
			})
		})
		describe('validate', () => {
			it('should return true if given valid stuff', () => {
				const res = modifierCalculator.validate(10, 0)
				expect(res).toBe(true)
			})
			it('should return false if given invalid stuff', () => {
				const res = modifierCalculator.validate(10, 1)
				expect(res).toBe(false)
			})
		})
		describe('validateMany', () => {
			it('should return true if given valid stuff', () => {
				const res = modifierCalculator.validateMany(
					[10, 9, 10, 9, 10, 9],
					[0, -1, 0, -1, 0, -1]
				)
				expect(res).toBe(true)
			})
			it('should return false if given invalid stuff', () => {
				const res = modifierCalculator.validateMany(
					[10, 9, 10, 9, 10, 9],
					[1, 2, 3, 4, 5, 6]
				)
				expect(res).toBe(false)
			})
		})
	})
	describe('rollCalculator', () => {
		describe('validate', () => {
			it('should return true if modifier sum greater than 6 [1]', () => {
				const res = rollCalculator.validate([12, 12, 12, 12, 12, 12])
				expect(res).toBe(true)
			})
			it('should return true if modifier sum greater than 6 [2]', () => {
				const res = rollCalculator.validate([12, 10, 14, 16, 18, 12])
				expect(res).toBe(true)
			})
			it('should return false if modifier sum less than 6', () => {
				const res = rollCalculator.validate([10, 10, 10, 10, 10, 10])
				expect(res).toBe(false)
			})
			it('should return true if modifier sum less than 6 given 0 as expectSum', () => {
				const res = rollCalculator.validate([10, 10, 10, 10, 10, 10], 0)
				expect(res).toBe(true)
			})
			it('should return false if modifier sum greater than 6 given 300 as expectSum', () => {
				const res = rollCalculator.validate([12, 10, 14, 16, 18, 12], 300)
				expect(res).toBe(false)
			})
		})
		describe('generate', () => {
			it('should return correctly', () => {
				diceIndex = 0
				const values = [
					[6, 6, 6, 5],
					[5, 5, 5, 4],
					[4, 4, 4, 3],
					[3, 3, 3, 2],
					[3, 2, 2, 1],
					[5, 2, 2, 1],
				]
				const res = rollCalculator.generate(fakeDice(values))
				expect(res.attribute).toBe(18)
				expect(res.modifier).toBe(4)
				expect(res.rolls).toStrictEqual([5, 6, 6, 6])
			})
		})
		describe('generateMany', () => {
			it('should return correctly', () => {
				diceIndex = 0
				const values = [
					[6, 6, 6, 5],
					[5, 5, 5, 4],
					[4, 4, 4, 3],
					[3, 3, 3, 2],
					[3, 2, 2, 1],
					[5, 2, 2, 1],
				]
				const res = rollCalculator.generateMany(fakeDice(values))
				expect(res[0].attribute).toBe(18)
				expect(res[0].modifier).toBe(4)
				expect(res[0].rolls).toStrictEqual([5, 6, 6, 6])

				expect(res[1].attribute).toBe(15)
				expect(res[1].modifier).toBe(2)
				expect(res[1].rolls).toStrictEqual([4, 5, 5, 5])

				expect(res[2].attribute).toBe(12)
				expect(res[2].modifier).toBe(1)
				expect(res[2].rolls).toStrictEqual([3, 4, 4, 4])

				expect(res[3].attribute).toBe(9)
				expect(res[3].modifier).toBe(-1)
				expect(res[3].rolls).toStrictEqual([2, 3, 3, 3])

				expect(res[4].attribute).toBe(7)
				expect(res[4].modifier).toBe(-2)
				expect(res[4].rolls).toStrictEqual([1, 2, 2, 3])

				expect(res[5].attribute).toBe(9)
				expect(res[5].modifier).toBe(-1)
				expect(res[5].rolls).toStrictEqual([1, 2, 2, 5])
			})
		})
		describe('generateValid', () => {
			it('should return correctly', () => {
				diceIndex = 0
				const values = [
					[6, 6, 6, 5],
					[5, 5, 5, 4],
					[4, 4, 3, 3],
					[3, 3, 4, 2],
					[3, 3, 4, 1],
					[3, 5, 2, 1],
				]

				const res = rollCalculator.generateValid(fakeDice(values))
				expect(res[0].attribute).toBe(10)
				expect(res[0].modifier).toBe(0)
				expect(res[0].rolls).toStrictEqual([2, 3, 3, 4])

				expect(res[1].attribute).toBe(10)
				expect(res[1].modifier).toBe(0)
				expect(res[1].rolls).toStrictEqual([1, 3, 3, 4])

				expect(res[2].attribute).toBe(10)
				expect(res[2].modifier).toBe(0)
				expect(res[2].rolls).toStrictEqual([1, 2, 3, 5])

				expect(res[3].attribute).toBe(11)
				expect(res[3].modifier).toBe(0)
				expect(res[3].rolls).toStrictEqual([3, 3, 4, 4])

				expect(res[4].attribute).toBe(15)
				expect(res[4].modifier).toBe(2)
				expect(res[4].rolls).toStrictEqual([4, 5, 5, 5])

				expect(res[5].attribute).toBe(18)
				expect(res[5].modifier).toBe(4)
				expect(res[5].rolls).toStrictEqual([5, 6, 6, 6])
			})
			it('should return correctly needing a extra roll', () => {
				diceIndex = 0
				const values = [
					[6, 6, 5, 5],
					[5, 5, 5, 4],
					[4, 4, 3, 3],
					[3, 3, 4, 2],
					[3, 3, 4, 1],
					[3, 5, 2, 1],
					[5, 5, 2, 1],
				]

				const res = rollCalculator.generateValid(fakeDice(values))
				expect(res[0].attribute).toBe(10)
				expect(res[0].modifier).toBe(0)
				expect(res[0].rolls).toStrictEqual([1, 3, 3, 4])

				expect(res[1].attribute).toBe(10)
				expect(res[1].modifier).toBe(0)
				expect(res[1].rolls).toStrictEqual([1, 2, 3, 5])

				expect(res[2].attribute).toBe(11)
				expect(res[2].modifier).toBe(0)
				expect(res[2].rolls).toStrictEqual([3, 3, 4, 4])

				expect(res[3].attribute).toBe(12)
				expect(res[3].modifier).toBe(1)
				expect(res[3].rolls).toStrictEqual([1, 2, 5, 5])

				expect(res[4].attribute).toBe(15)
				expect(res[4].modifier).toBe(2)
				expect(res[4].rolls).toStrictEqual([4, 5, 5, 5])

				expect(res[5].attribute).toBe(17)
				expect(res[5].modifier).toBe(3)
				expect(res[5].rolls).toStrictEqual([5, 5, 6, 6])
			})
			it('should throw if given 25 as expectSum', () => {
				diceIndex = 0
				expect(() => {
					rollCalculator.generateValid(fakeDice, 25)
				}).toThrow()
			})
			it('should throw if given not number as expectSum', () => {
				diceIndex = 0
				expect(() => {
					rollCalculator.generateValid(fakeDice, 'not number')
				}).toThrow()
			})
		})
		describe('pointCalculator', () => {
			it('should return 0 given right values', () => {
				const res = pointCalculator.difference([17, 15, 13, 12, 10, 8])
				expect(res).toBe(0)
			})
			it('should return -2 given more values', () => {
				const res = pointCalculator.difference([17, 15, 13, 14, 10, 8])
				expect(res).toBe(-2)
			})
			it('should return +2 given less values', () => {
				const res = pointCalculator.difference([17, 15, 13, 10, 10, 8])
				expect(res).toBe(2)
			})
			it('should return +10 given less values given value 30 in wallet', () => {
				const res = pointCalculator.difference([17, 15, 13, 12, 10, 8], {
					wallet: 30,
				})
				expect(res).toBe(10)
			})
			it('should return 0 given a specifc price object', () => {
				const res = pointCalculator.difference([17, 15, 13, 12, 10, 8], {
					8: 8,
					10: 10,
					12: 12,
					13: 13,
					15: 15,
					17: 17,
					wallet: 75,
				})
				expect(res).toBe(0)
			})
		})
	})
})
