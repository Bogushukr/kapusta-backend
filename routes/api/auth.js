const express = require("express");

const { joiSchema } = require("../../model/user");
const { validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controller");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post("/signup", userValidationMiddleware, ctrl.reg);
// router.post("/login", ctrl.login);
// router.post("/logout", ctrl.logout);

module.exports = router;
