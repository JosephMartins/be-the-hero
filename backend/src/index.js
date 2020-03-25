//importa o express
const express = require('express');
//importando o cors
const cors = require('cors');
//importa o routes do arquivo routes.js
const routes = require('./routes');

const app = express();

app.use(cors());

//usamos o modulo json que está dentro do express para aplicação entender json 
app.use(express.json());

//usamos o modulo router que está dentro do routes que vem do routes.js
app.use(routes);

//para o servidor escutar nessa porta alguma requisição
app.listen(3333);