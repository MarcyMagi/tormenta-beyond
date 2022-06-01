const validator = (type, value, key, errPrefix) => {
	if (typeof value !== type) {
		throw new Error(`${errPrefix}: ${key} should be ${type}`)
	}
}
export const stringValidator = (value, key, errPrefix) => {
	validator('string', value, key, errPrefix)
	if (value === '') {
		throw new Error(`${errPrefix}: ${key} cannot be empty string`)
	}
}
export const numberValidator = (value, key, errPrefix) => {
	validator('number', value, key, errPrefix)
}
export const intValidator = (value, key, errPrefix) => {
	numberValidator(value, key, errPrefix)
	if (!Number.isInteger(value)) {
		throw new Error(`${errPrefix}: ${key} should be integer`)
	}
}
export const arrayValidator = (value, key, errPrefix) => {
	if (!Array.isArray(value)) {
		throw new Error(`${errPrefix}: ${key} should be array`)
	}
}
export const stringArrayValitador = (arr, key, errPrefix) => {
	arrayValidator(arr, key, errPrefix)
	for (const i in arr) {
		stringValidator(arr[i], `${key}[${i}]`, errPrefix)
	}
}
