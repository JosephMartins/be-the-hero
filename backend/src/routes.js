//importa o express 
const express = require('express');

//Importa o modulo de controller OngController.js
const OngController = require('./controllers/OngController');
//importa o modulo incidentesController
const IncidentController = require('./controllers/IncidentController');
//importa o modulo ProfileController
const ProfileController = require('./controllers/ProfileController');
//importa o modulo SessionController
const SessionController = require('./controllers/SessionController');
//importa o modulo ROUTER que tem dentro do express
const routes = express.Router();

routes.post('/session', SessionController.create);

//lista todas as ongs
routes.get('/ongs', OngController.index);
//cadastra ong
routes.post('/ongs', OngController.create);

//lista todos incidents
routes.get('/incidents', IncidentController.index);
//cadastra incident/caso
routes.post('/incidents', IncidentController.create);
//deleta incident
routes.delete('/incidents/:id', IncidentController.delete);

//lista caso de uma só ong
routes.get('/profile', ProfileController.index);

module.exports = routes;