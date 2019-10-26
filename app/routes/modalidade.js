const express = require('express')

const ModalidadeController = require('./../controllers/modalidade')

const route = express.Router()

route.get('/modalidade', ModalidadeController.get)
route.get('/modalidade/:id_modalidade', ModalidadeController.getById)
router.post('/modalidade',ModalidadeController.post)
router.delete('/modalidade',ModalidadeController.delete)
router.put('/modalidade', ModalidadeController.put)
router.get('/modalidade',ModalidadeController.getModalidadePage)
router.getByNome('/modalidade',ModalidadeController.getByNome)
module.exports = route