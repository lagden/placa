'use strict'

import test from 'ava'
import placa from '..'

test('placa', async t => {
	const r = await placa('GKC3998')
	t.is(r.status, 200)
	t.is(r.modelo, 'FIAT/MOBI EASY ON')
})

test('not found', async t => {
	const err = await t.throwsAsync(placa('AAA0000'))
	t.is(err.status, 404)
	t.is(err.message, 'Veículo não encontrado')
})

test('invalid', async t => {
	const err = await t.throwsAsync(placa('1234567'))
	t.is(err.status, 400)
	t.is(err.message, 'Placa inválida')
})
