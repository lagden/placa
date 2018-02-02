'use strict'

class PlacaError extends Error {
	constructor(message, {status}) {
		super(message)
		this.name = 'PlacaError'
		this.status = status
	}
}

module.exports = PlacaError
