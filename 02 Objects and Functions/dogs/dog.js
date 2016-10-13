'use strict'

function Dog(name, breed, weight, trained=true) {
	this.name = name
	this.breed = breed
	this.weight = weight
	this.trained = trained;
}

Dog.prototype.species = 'Canine'
Dog.prototype.sitting = false;

Dog.prototype.bark = function() {
	const maxWeight = 25
	if (this.weight > maxWeight) {
		console.log(`${this.name} says Woof!`)
	} else {
		console.log(`${this.name} says Yip!`)
	}
}

Dog.prototype.run = function() {
	console.log('Run!')
}

Dog.prototype.wag = function() {
	console.log('Wag!')
}

Dog.prototype.sit = function() {
	if (this.sitting) {
		console.log(`${this.name} is already sitting`)
	} else if (this.trained) {
		console.log(`${this.name} is trained and sitting`)
	} else {
		this.sitting=true
		console.log(`${this.name} is already sitting`)	
	}
}




module.exports = Dog
