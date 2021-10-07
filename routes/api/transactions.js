const express = require("express");
const router = express.Router();
const { validationCreateTransaction } = require("../../validation/validation");
const { controllerWrapper } = require("./../../middlewares");
const ctrl = require("./../../controller/transactions");

router.get("/", controllerWrapper(ctrl.getAll));
router.post(
  "/",
  validationCreateTransaction,
  controllerWrapper(ctrl.addTransaction)
);
router.delete("/:transactionId", controllerWrapper(ctrl.delTransaction));

// Routes for db reports
router.get("/last-six-month-report", controllerWrapper(ctrl.lastSixMonth));
router.get(
  "/spending-types-summary-report",
  controllerWrapper(ctrl.spendingTypesSummary)
);

module.exports = router;
