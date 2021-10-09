const express = require('express')
const router = express.Router()
const { validationCreateTransaction } = require('../../validation/validation')
const { controllerWrapper, authenticate } = require('./../../middlewares')
const ctrl = require('./../../controller/transactions')

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getAll))
router.post('/', controllerWrapper(authenticate), validationCreateTransaction, controllerWrapper(ctrl.addTransaction))
router.delete('/:transactionId', controllerWrapper(ctrl.delTransaction))

module.exports = router
