
'use strict'


const defaultSize = 8
const defaultShot = 0

module.exports = function(roast, ounces = defaultSize, shot = defaultShot) { // can't use arrow functions here...

	if (roast === undefined) {
		throw new Error('missing roast type')
	}
	
	this.roast = roast
	this.ounces = ounces	
	this.getSize = () => {

		if (this.ounces <= 8) {
			return 'small'
		} else if (this.ounces >= 9 && this.ounces <= 12) {
			return 'medium'
		} else if (this.ounces >= 16) {
			return 'large'
		}
	}
	
	this.shot = shot
	this.coffeeShots = () => {
		if (this.shot > 2) {
			return 'coffee strong'
		} else {
			return 'none'
		}
	}
	
	this.order = () => {
		let msg
		switch (this.getSize()) {
		case 'small':
		case 'medium':
		case 'large':
			msg = `You've ordered a ${this.getSize()} ${this.roast} coffee. ${this.coffeeShots()} added`
			break
		default:
			msg = `We don't have a ${this.roast} in that size!`
			break
		}
		return msg
	}
}
