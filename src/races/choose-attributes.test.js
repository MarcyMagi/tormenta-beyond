import chooseAttributes from './choose-attributes'
describe('race choose attributes', () => {
	it('should create valid given for, des and con', () => {
		const attributesFunc = chooseAttributes({
			attributesConfig: {
				quantity: 3,
				value: 2,
			},
		})
		expect(typeof attributesFunc).toBe('function')
		const attributes = attributesFunc('for', 'des', 'con')
		expect(attributes.for).toBe(2)
		expect(attributes.des).toBe(2)
		expect(attributes.con).toBe(2)
		expect(attributes.int).toBe(0)
		expect(attributes.sab).toBe(0)
		expect(attributes.car).toBe(0)
	})
	it('should create valid given des and car', () => {
		const attributesFunc = chooseAttributes({
			attributesConfig: {
				quantity: 2,
				value: 4,
			},
		})
		expect(typeof attributesFunc).toBe('function')
		const attributes = attributesFunc('des', 'car')
		expect(attributes.for).toBe(0)
		expect(attributes.des).toBe(4)
		expect(attributes.con).toBe(0)
		expect(attributes.int).toBe(0)
		expect(attributes.sab).toBe(0)
		expect(attributes.car).toBe(4)
	})
	it('should throw if given more args then needed', () => {
		expect(() => {
			const attributesFunc = chooseAttributes({
				attributesConfig: {
					quantity: 2,
					value: 4,
				},
			})
			attributesFunc('for', 'des', 'con')
		}).toThrow('choose attributes error: function must recieve exactly 2 args')
	})
	it('shour throw if given less args then needed', () => {
		expect(() => {
			const attributesFunc = chooseAttributes({
				attributesConfig: {
					quantity: 3,
					value: 4,
				},
			})
			attributesFunc('for')
		}).toThrow('choose attributes error: function must recieve exactly 3 args')
	})
	it('should throw if given weird attribute', () => {
		expect(() => {
			const attributesFunc = chooseAttributes({
				attributesConfig: {
					quantity: 1,
					value: 4,
				},
			})
			attributesFunc('wei')
		}).toThrow("attribute error: invalid 'wei' attribute")
	})
})
