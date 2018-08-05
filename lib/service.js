'use strict'

const {promisify} = require('util')
const {parseString} = require('xml2js')
const got = require('got')
const {date, token, xml, validade} = require('./util')
const PlacaError = require('./error')
const dict = require('./dict')

// Perigo!!!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const _parseString = promisify(parseString)

const PROTOCOL = 'https://'
const DOMAIN = 'cidadao.sinesp.gov.br' // '189.9.194.154'
const VERSION = 'v4'
const ENDPOINT = `/sinesp-cidadao/mobile/consultar-placa/${VERSION}`
const URL = `${PROTOCOL}${DOMAIN}${ENDPOINT}`
const SECRET = 'g8LzUadkEHs7mbRqbX5l'
const ANDROID_VERSION = '8.1.0'
const CHAVE = `#${ANDROID_VERSION}#${SECRET}`

/**
 * Consulta de placas de veículos na base de dados do SINESP Cidadão.
 * @param {string} placa - Placa do veículo para a consulta.
 * @return {Object} Os dados do veículo.
 */
async function service(placa) {
	let codigo
	if (validade(placa) === false) {
		const _err = dict.get(400)
		throw new PlacaError(_err.message, _err)
	}
	try {
		const body = xml(token(placa, CHAVE), ANDROID_VERSION, date(), placa)
		const headers = {
			'Cache-Control': 'no-cache',
			'Content-Length': body.length,
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'User-Agent': 'SinespCidadao / 3.0.2.1 CFNetwork / 758.2.8 Darwin / 15.0.0',
			Host: 'sinespcidadao.sinesp.gov.br',
			Connection: 'close'
		}
		const res = await got.post(URL, {
			headers,
			body
		})
		const resParse = await _parseString(res.body, {explicitArray: false})
		const {'soap:Envelope': {'soap:Body': {'ns2:getStatusResponse': {return: result}}}} = resParse

		codigo = Number(result.codigoRetorno)
		if (codigo === 0) {
			result.status = 200
			return result
		}
		throw new Error(result.mensagemRetorno)
	} catch (err) {
		let _err = {}
		if (dict.has(codigo)) {
			_err = dict.get(codigo)
		}
		const data = {...{status: 500, message: err.message}, ..._err}
		throw new PlacaError(data.message, data)
	}
}

module.exports = service
