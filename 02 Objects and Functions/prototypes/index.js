
String.prototype.palindrome = require('./palindrome')
String.prototype.capitalise = require('./capitalise')

const phrases = ['eve',
               'kayak',
               'mom',
               'wow',
               'noon',
               'Not a palindrome']

for (const phrase of phrases) {
	if (phrase.palindrome()) {
		console.log(`"${phrase}" is a palindrome`)
	} else {
		console.log(`"${phrase}" is NOT a palindrome`)
	}
}

for(const phrase of phrases){ 
	let answer = phrase.capitalise()
	console.log(`"${phrase}" capitalised is "${answer}" capitalise`)
}



/*
for (const phrase of phrases) {
	const answer = phrase.palindrome() ? '' : 'NOT '
	console.log(`"${phrase}" is ${answer}a palindrome`)
}
*/
