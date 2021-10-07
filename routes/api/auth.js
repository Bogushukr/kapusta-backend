const express = require("express");

const { joiSchema } = require("../../model/user");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controller");

const router = express.Router();

const userValidationMiddleware = validation(joiSchema);

router.post("/signup", userValidationMiddleware, controllerWrapper(ctrl.reg));
router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));
router.get(
  "/logout",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout)
);
router.get(
  "/current",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.current)
);

module.exports = router;
