export const numberCheck = (value) => {
	if (!Number.isInteger(value)) {
		throw new Error('argument must be a integer')
	}
}

export const arrayCheck = (values) => {
	if (!Array.isArray(values)) {
		throw new Error('argument should be a array')
	}
	if (values.length === 0) {
		throw new Error('array cannot be empty')
	}
}
