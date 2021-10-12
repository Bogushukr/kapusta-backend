const express = require('express')
const router = express.Router()
// const { validationCreateTransaction } = require('../../validation/validation')
const { controllerWrapper } = require('./../../middlewares')
const ctrl = require('./../../controller/reports')

// Routes for db reports

// GET Balance
router.get('/balance', controllerWrapper(ctrl.balanceGet))


// ===== Cash-Out reports =====
// GET Cash-Out report for Month. Returns summary report by categories and description
router.get(
  '/cash-out/:year/:month',
  controllerWrapper(ctrl.getSpendingsForMonth)
)

// GET Cash-Out report for last six month
router.get(
  '/cash-out/last-six-month',
  controllerWrapper(ctrl.getSpendingsLastSixMonth)
)

// ===== Cash-In reports
// GET Cash-In report for Month. Returns summary report by categories and description
router.get(
  '/cash-in/:year/:month',
  controllerWrapper(ctrl.getIncomingsForMonth)
)

// GET Cash-In report for last six month
router.get(
  '/cash-in/last-six-month',
  controllerWrapper(ctrl.getIncomingsLastSixMonth)
)

module.exports = router
