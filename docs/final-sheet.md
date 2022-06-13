The final sheet elements should look like this:

```json
{
	"name": "myCharacter",
	"player": "me",
	"race": "humano",
	"origin": "artista",
	"classes": {
		"bardo": 2,
		"barbaro": 3,
		"lvl1": "bardo"
	},
	"divinity": "valkaria",
	"baseAttributes": {
		"for": 17,
		"des": 15,
		"con": 13,
		"int": 12,
		"sab": 10,
		"car": 8
	},
	"attributes": {
		"for": 19,
		"des": 17,
		"con": 15,
		"int": 12,
		"sab": 10,
		"car": 8
	},
	"pv": 20,
	"pm": 8,
	"skills": {
		"acrobacia": {
			"value": 10,
			"attribute": "des",
			"trained": true
		}
		//...
	},
	"size": "médio",
	"speed": 9,
	"defense": 10,
	"proficiencies": ["armas simples"],
	"xp": 0,
	"inventory": [
		{
			"itemType": "weapon",
			"itemName": "adaga",
			"price": 2,
			"damage": "1d4",
			"threat": 19,
			"critical": 2,
			"range": "curto",
			"weight": 0.5,
			"damageType": "perfuração"
		},
		{
			"itemType": "armor",
			"itemName": "armadura acolchoada",
			"price": 5,
			"bonus": 1,
			"penality": 0,
			"weight": 5
		},
		{
			"itemType": "shield",
			"itemName": "escudo leve",
			"price": 5,
			"bonus": 1,
			"penality": -1,
			"weight": 3
		}
	],
	"equiped": {
		"rightHand": "adaga",
		"leftHand": "escudo leve",
		"body": "armadura acolchoada"
	},
	"attacks": {
		"adaga": {}
	}
}
```
