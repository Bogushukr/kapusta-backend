const { HttpCode } = require('../../helpers/constants')
const forMonth = require('./service/forMonth')
const detailsCategoriesDescription = require('./service/detailsCategoriesDescription')

const getSpendingsForMonth = async (req, res) => {
  const { year, month } = req.params
  const owner = req.user._id

  const { transactionListMonth, cashOutMonth, cashInMonth } = await forMonth(
    false,
    year,
    month,
    owner
  )

  const result = await detailsCategoriesDescription(false, year, month, owner)

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      transactionListMonth,
      cashOutMonth,
      cashInMonth,
      details: result
    },
    message: `Spending summary report for ${month}-${year} has been successufully prepared`
  })
}

module.exports = getSpendingsForMonth
