const connection = require('../database/connection');

//metodo de listar casos somentes de uma ong
module.exports = {
    async index(request, response){
        //id da ong logada
        const ong_id = request.headers.authorization;

        //pegando dados do banco
        const incidents = await connection('incidents')
        .select('*')
        .where('ong_id', ong_id);

        //retornando os dados
        return response.json(incidents);
    }
}