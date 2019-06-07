'use strict'

const {promisify} = require('util')
const {parseString} = require('xml2js')
const got = require('got')
const tunnel = require('tunnel-agent')
const ip = require('node-ip-location')
const publicIp = require('public-ip')
const {date, token, xml, validade} = require('./util')
const PlacaError = require('./error')
const dict = require('./dict')

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
 * @param {string} placa                            - Placa do veículo para a consulta.
 * @param {object} [proxyOpts={}]                   - Opções do Proxy
 * @param {string} [proxyOpts.host='179.97.53.154'] - Proxy host
 * @param {number} [proxyOpts.port=3128]            - Proxy port
 * @return {Object} Os dados do veículo.
 */
async function service(placa, proxyOpts = {host: '179.97.53.154', port: 3128}) {
	let codigo
	if (validade(placa) === false) {
		const _err = dict.get(400)
		throw new PlacaError(_err.message, _err)
	}

	try {
		const {host: hostProxy, port: portProxy} = proxyOpts
		const ua = 'SinespCidadao / 3.0.2.1 CFNetwork / 758.2.8 Darwin / 15.0.0'
		const body = xml(token(placa, CHAVE), ANDROID_VERSION, date(), placa)
		const headers = {
			'Cache-Control': 'no-cache',
			'Content-Length': body.length,
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'User-Agent': ua,
			Host: DOMAIN,
			Connection: 'close'
		}

		const gotOpts = {
			headers,
			body,
			retry: 1,
			timeout: 5 * 1000,
			rejectUnauthorized: false
		}

		const myIp = await publicIp.v4()
		const countryIp = ip.convertIp(myIp)

		/* istanbul ignore next */
		// Adiciona o proxy se o IP não for do Brasil
		if (countryIp !== '巴西') {
			gotOpts.agent = tunnel.httpsOverHttp({
				proxy: {
					host: hostProxy,
					port: portProxy,
					headers: {
						'User-Agent': ua
					}
				}
			})
		}

		const res = await got.post(URL, gotOpts)
		const resParse = await _parseString(res.body, {explicitArray: false})
		const {'soap:Envelope': {'soap:Body': {'ns2:getStatusResponse': {return: result}}}} = resParse

		codigo = Number(result.codigoRetorno)

		if (codigo === 0) {
			result.status = 200
			return result
		}

		throw new Error(result.mensagemRetorno)
	} catch (error) {
		let _err = {}

		/* istanbul ignore next */
		if (dict.has(codigo)) {
			_err = dict.get(codigo)
		}

		const data = {...{status: 500, message: error.message}, ..._err}
		throw new PlacaError(data.message, data)
	}
}

module.exports = service
