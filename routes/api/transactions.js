const express = require('express')
const router = express.Router()
const { validationCreateTransaction} = require('../../middlewares/validation')
const { controllerWrapper, authenticate } = require('../../middlewares')
const ctrl = require('../../controllers/transactions')

router.get('/', controllerWrapper(authenticate), ctrl.getAll)
router.post('/', controllerWrapper(authenticate), validationCreateTransaction, ctrl.addTransaction )


module.exports = router