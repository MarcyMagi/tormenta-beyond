export default (name, description, tale, modifiers, abilities) => {
	return Object.assign(
		{},
		{
			name,
			description,
			tale,
			modifiers,
			abilities,
		}
	)
}
