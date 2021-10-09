const { HttpCode } = require('../../helpers/constants')
const forMonth = require('./forMonth')

const getIncomingsForMonth = async (req, res) => {
  const { year, month } = req.params

  const { transactionListMonth, cashOutMonth, cashInMonth } = await forMonth(
    true,
    year,
    month
  )

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: { transactionListMonth, cashOutMonth, cashInMonth },
    message: `Spending summary report for ${month} ${year} has been successufully prepared`,
  })
}

module.exports = getIncomingsForMonth
