//Importa o modulo knex
const knex = require('knex');
//importa o modulo/arquivo do knex 
const configuration = require('../../knexfile');

//armazena o modulo de desenvolvimento do arquivo knexfile fazendo a conexao
const connection = knex(configuration.development);

//exporta a connexao
module.exports = connection;