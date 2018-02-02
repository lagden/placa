'use strict'

const dict = new Map()

dict.set(0, {status: 200, message: 'OK'})
dict.set(1, {status: 500, message: 'Erro no processamento da consulta'})
dict.set(3, {status: 404, message: 'Veículo não encontrado'})
dict.set(7, {status: 500, message: 'Versão desatualizada'})
dict.set(400, {status: 400, message: 'Placa inválida'})

module.exports = dict
