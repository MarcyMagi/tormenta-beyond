import sheet from './sheet'

const config = {
	baseAttributes: {
		for: 17,
		des: 15,
		con: 13,
		int: 12,
		sab: 10,
		car: 8,
	},
}

const expectResponse = {
	attributes: {
		meta: {
			base: {
				for: 17,
				des: 15,
				con: 13,
				int: 12,
				sab: 10,
				car: 8,
			},
		},
		for: 17,
		des: 15,
		con: 13,
		int: 12,
		sab: 10,
		car: 8,
	},
}

describe('sheet factory', () => {
	it('should create valid', () => {
		const newSheet = sheet(config)
		expect(newSheet).toEqual(expectResponse)
	})
})
