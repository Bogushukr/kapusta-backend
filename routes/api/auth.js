const express = require('express')
const router = express.Router()
const { validationSignUpSignIn } = require('../../validation/validation')
const { controllerWrapper, authenticate } = require('../../middlewares')
const ctrl = require('../../controller/auth')




router.post('/signup', validationSignUpSignIn, controllerWrapper(ctrl.reg))
router.post('/login', validationSignUpSignIn, controllerWrapper(ctrl.login))
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))
router.get('/current', controllerWrapper(authenticate), controllerWrapper(ctrl.current))
router.get('/balance', controllerWrapper(authenticate), controllerWrapper(ctrl.balance))

module.exports = router
