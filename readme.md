# Placa

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Dependency Status][dep-img]][dep]
[![devDependency Status][devDep-img]][devDep]

[![XO code style][xo-img]][xo]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/placa.svg
[npm]:             https://www.npmjs.com/package/@tadashi/placa
[ci-img]:          https://travis-ci.org/lagden/placa.svg
[ci]:              https://travis-ci.org/lagden/placa
[coveralls-img]:   https://coveralls.io/repos/github/lagden/placa/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/placa?branch=master
[dep-img]:         https://david-dm.org/lagden/placa.svg
[dep]:             https://david-dm.org/lagden/placa
[devDep-img]:      https://david-dm.org/lagden/placa/dev-status.svg
[devDep]:          https://david-dm.org/lagden/placa#info=devDependencies
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo
[greenkeeper-img]: https://badges.greenkeeper.io/lagden/placa.svg
[greenkeeper]:     https://greenkeeper.io/


Consulta de placas de veículos na base de dados do SINESP Cidadão  
Inspirado no projeto feito em Python de [Victor Torres](https://github.com/victor-torres/sinesp-client)


## Instalação

```
$ npm i -S @tadashi/placa
```


## Uso

```js
const consulta = require('@tadashi/placa');

(async () => {
  try {
    const r = await consulta('GKC3998')
    console.log(r.modelo)
    //=> FIAT/MOBI EASY ON
  } catch (err) {
    console.log(err.message)
  }
})()
```


### API

#### consulta(placa \[, proxyOpts \])

Nome        | Tipo                 | Requerido | Default                            | Descrição
----------- | -------------------- |:---------:|:----------------------------------:| ------------
placa       | string               | sim       | -                                  | Placa do veículo
proxyOpts   | object               | não       | {host: '201.92.20.5', port: 53281} | Configuração do proxy


Site com lista de proxy gratuito: http://free-proxy.cz/en/proxylist/country/BR/http/ping/all


## Contribuidores

[<img src="https://avatars3.githubusercontent.com/u/6875298?s=460&v=4" alt="Lucas Bernardo de Souza Santos" width="100">](https://github.com/Sorackb)


## Autor

[<img src="https://avatars0.githubusercontent.com/u/130963?s=460&v=4" alt="Thiago Lagden" width="100">](https://github.com/lagden)


## License

MIT © [Thiago Lagden](https://lagden.in)
