'use strict'

const request = require('request')

try {
	if (process.argv.length < 4) {
		throw 'missing parameter'
	}

	const base = process.argv[2].toUpperCase()
	const symbol = process.argv[3].toUpperCase()
	const url = `http://api.fixer.io/latest?base=${base}&symbols=${symbol}`
	console.log(url)
	request.get( url, (err, res, body) => {
		if (err) {
			throw 'could not complete request'
		}
		const json = JSON.parse(body)
		console.log(json.rates)
		const output = JSON.stringify(json.rates, null, 2)
		console.log(output)



		for(let rate in json.rates){ 	// rate is defined in json.rates
		console.log(rate)				// prints rate
		console.log(json.rates[rate].toFixed(2))	// prints rate in rates to 2 decimal places
		}
		
		

	})
} catch(err) {
	console.log(err)
}
