/**
 * Consulta module.
 * @module consulta
 */

'use strict'

const service = require('./lib/service')

/**
 * Consulta de placas de veículos na base de dados do SINESP Cidadão.
 * @param {string} placa - Placa do veículo para a consulta.
 * @return {Object} Os dados do veículo.
 */
function consulta(placa) {
	return service(placa)
}

module.exports = consulta
