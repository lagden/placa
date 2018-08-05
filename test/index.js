'use strict'

import test from 'ava'
import placa from '..'

test('placa', async t => {
	const r = await placa('GKC3998')
	t.is(r.status, 200)
	t.is(r.modelo, 'FIAT/MOBI EASY ON')
})

test('not found', async t => {
	try {
		await placa('AAA0000')
	} catch (err) {
		t.is(err.status, 404)
		t.is(err.message, 'Veículo não encontrado')
	}
})

test('invalid', async t => {
	try {
		await placa('1234567')
	} catch (err) {
		t.is(err.status, 400)
		t.is(err.message, 'Placa inválida')
	}
})
