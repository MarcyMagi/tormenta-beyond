import chooseAttributes from './choose-attributes'
describe('race choose attributes', () => {
	it('should create valid given for, des and con', () => {
		const attributesFunc = chooseAttributes({
			quantity: 3,
			value: 2,
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
			quantity: 2,
			value: 4,
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
	it('should create valid given fix attribute', () => {
		const attributeFunc = chooseAttributes({
			quantity: 3,
			value: 2,
			fix: {
				car: -2,
			},
		})
		const attributes = attributeFunc('for', 'des', 'con')
		expect(attributes.for).toBe(2)
		expect(attributes.des).toBe(2)
		expect(attributes.con).toBe(2)
		expect(attributes.int).toBe(0)
		expect(attributes.sab).toBe(0)
		expect(attributes.car).toBe(-2)
	})
	it('should throw if given weird attribute on fix', () => {
		expect(() => {
			chooseAttributes({
				quantity: 3,
				value: 2,
				fix: {
					wei: -2,
				},
			})
		}).toThrow("attribute error: invalid 'wei' attribute")
	})
	it('should throw when given fix attribute as arg', () => {
		const attributeFunc = chooseAttributes({
			quantity: 3,
			value: 2,
			fix: {
				car: -2,
			},
		})
		expect(() => {
			attributeFunc('for', 'des', 'car')
		}).toThrow("choose attributes error: argument 'car' not valid")
	})
	it('should throw if given more args then needed', () => {
		expect(() => {
			const attributesFunc = chooseAttributes({
				quantity: 2,
				value: 4,
			})
			attributesFunc('for', 'des', 'con')
		}).toThrow("choose attributes error: function should recieve '2' args")
	})
	it('shour throw if given less args then needed', () => {
		expect(() => {
			const attributesFunc = chooseAttributes({
				quantity: 3,
				value: 4,
			})
			attributesFunc('for')
		}).toThrow("choose attributes error: function should recieve '3' args")
	})
	it('should throw if given weird attribute', () => {
		expect(() => {
			const attributesFunc = chooseAttributes({
				quantity: 1,
				value: 4,
			})
			attributesFunc('wei')
		}).toThrow("choose attributes error: argument 'wei' not valid")
	})
	it('should throw if given not number quantity', () => {
		expect(() => {
			chooseAttributes({
				quantity: 'c',
				value: 4,
			})
		}).toThrow()
	})
	it('should throw if given not int quantity', () => {
		expect(() => {
			chooseAttributes({
				quantity: 1.2,
				value: 4,
			})
		}).toThrow()
	})
	it('should throw if given not number value', () => {
		expect(() => {
			chooseAttributes({
				quantity: 1,
				value: 'c',
			})
		}).toThrow()
	})
	it('should throw if given not int value', () => {
		expect(() => {
			chooseAttributes({
				quantity: 1,
				value: 4.2,
			})
		}).toThrow()
	})
})
