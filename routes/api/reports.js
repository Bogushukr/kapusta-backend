const express = require('express')
const router = express.Router()
const { controllerWrapper, authenticate } = require('./../../middlewares')
const ctrl = require('./../../controller/reports')


router.get('/balance', controllerWrapper(authenticate), controllerWrapper(ctrl.balanceGet))
router.get('/cash-out/:year/:month', controllerWrapper(authenticate), controllerWrapper(ctrl.getSpendingsForMonth))
router.get('/cash-out/last-six-month', controllerWrapper(authenticate), controllerWrapper(ctrl.getSpendingsLastSixMonth))
router.get('/cash-in/:year/:month', controllerWrapper(authenticate), controllerWrapper(ctrl.getIncomingsForMonth))
router.get('/cash-in/last-six-month', controllerWrapper(authenticate), controllerWrapper(ctrl.getIncomingsLastSixMonth))

module.exports = router
