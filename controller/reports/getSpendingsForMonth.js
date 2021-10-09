const { HttpCode } = require('../../helpers/constants')
const forMonth = require('./forMonth')

const getSpendingsForMonth = async (req, res) => {
  const { year, month } = req.params

  // const result = await Transaction.aggregate(pipeline)

  const result = await forMonth(false, year, month)

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      result: result,
    },
    message: `Spending summary report for ${month} ${year} has been successufully prepared`,
  })
}

module.exports = getSpendingsForMonth
