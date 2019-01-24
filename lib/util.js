'use strict'

const {createHmac} = require('crypto')

function validade(v) {
	return /^[a-zA-Z]{3}\-?[a-zA-Z0-9]{4}$/.test(v)
}

function xml(...args) {
	const [token, androidVersion, date, placa] = args
	return `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<v:Envelope xmlns:v="http://schemas.xmlsoap.org/soap/envelope/">
    <v:Header>
        <b>Google Android SDK built for x86</b>
        <c>ANDROID</c>
        <d>${androidVersion}</d>
        <e>4.3.2</e>
        <f>10.0.2.15</f>
        <g>${token}</g>
        <h>0.0</h>
        <i>0.0</i>
        <k></k>
        <l>${date}</l>
        <m>8797e74f0d6eb7b1ff3dc114d4aa12d3</m>
    </v:Header>
    <v:Body>
        <n0:getStatus xmlns:n0="http://soap.ws.placa.service.sinesp.serpro.gov.br/">
            <a>${placa}</a>
        </n0:getStatus>
    </v:Body>
</v:Envelope>
`
}

function token(placa, chave) {
	return `${createHmac('sha1', `${placa}${chave}`).update(placa).digest('hex')}`
}

function date() {
	const date = new Date().toISOString()
	const dateSplit = date.split('T')
	return `${dateSplit[0]} ${dateSplit[1].split('.')[0]}`
}

exports.validade = validade
exports.xml = xml
exports.token = token
exports.date = date
