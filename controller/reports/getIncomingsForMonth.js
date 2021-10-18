const { HttpCode } = require('../../helpers/constants')
const forMonth = require('./service/forMonth')
const detailsCategoriesDescription = require('./service/detailsCategoriesDescription')

const getIncomingsForMonth = async (req, res) => {
  const { year, month } = req.params
  const owner = req.user._id

  const { transactionsListMonth, cashOutMonth, cashInMonth } = await forMonth(
    true,
    year,
    month,
    owner
  )

  const result = await detailsCategoriesDescription(true, year, month, owner)

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      transactionsListMonth,
      cashOutMonth,
      cashInMonth,
      details: result
    },
    message: `Incoming summary report for ${month}-${year} has been successfully prepared`
  })
}

module.exports = getIncomingsForMonth
