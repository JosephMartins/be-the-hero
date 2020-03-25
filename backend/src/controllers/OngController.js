//importa a conexao que está em database/connection.js
const connection = require('../database/connection');

//importa improviso para gerar uma string aleatoria como um id para a ong
const crypto = require('crypto');

module.exports = {

    //função de listar todas as ongs
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    //função de cadastrar ong
    async create(request, response) {
        //armazena os valores que tem no corpo da requisição em cada variavel.
        const { name, email, whatsapp, city, uf } = request.body;

        //retorna 4 caracteres em formato de hexadecimal para armazenar o id da ong
        const id = crypto.randomBytes(4).toString('HEX');

        //chega aqui o request espera inserir
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        //só executa depois de inserir no banco
        return response.json({ id });
    }
}