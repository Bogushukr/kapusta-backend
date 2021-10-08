const express = require('express')
const router = express.Router()
// const { validationCreateTransaction } = require('../../validation/validation')
const { controllerWrapper } = require('./../../middlewares')
const ctrl = require('./../../controller/reports')

// Routes for db reports

// GET Balance
router.get('/balance', controllerWrapper(ctrl.getBalance))

// POST Balance (once when application initialized dy user)
router.post('/balance', controllerWrapper(ctrl.setBalance))

// ===== Cash-Out reports =====
// GET Cash-Out report for Month
router.get(
  '/cash-out/:year/month',
  controllerWrapper(ctrl.getSpendingsForMonth)
)

// GET Cash-Out report for last six month
router.get('/cash-out/last-six-month', controllerWrapper(ctrl.lastSixMonth))

// GET Cash-Out summary report for categories and descriptions
router.get('/cash-out/summary-report')

// ===== Cash-In reports
// GET Cash-In report for Month
router.get('/cash-in/:year/month', controllerWrapper(ctrl.getSpendingsForMonth))

// GET Cash-In report for last six month
router.get('/cash-in/last-six-month', controllerWrapper(ctrl.lastSixMonth))

// GET Cash-In summary report for categories and descriptions
router.get('/cash-in/summary-report')

module.exports = router
