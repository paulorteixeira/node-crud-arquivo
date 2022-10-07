const express = require('express')
const router = express.Router()

const dados_Controller = require('../control/dados_control')

//retorna todo o array
router.get("/api", dados_Controller.innerElements);

//retorna o array na posição id
router.get("/api/:id", dados_Controller.getElementById);

//adiciona ao array
router.post('/api', dados_Controller.appendChild);

//atualizar
router.put('/api/:id', dados_Controller.update);

//apagar registo
router.delete('/api/:id', dados_Controller.shakeTheTree);

module.exports = router