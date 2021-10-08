const { Transaction } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const getSpendingsForMonth = async (req, res) => {
  console.log(req.params)

  const { year, month } = req.params

  const pipeline = [
    {
      $match: {
        $and: [
          {
            cashIncome: false,
          },
          {
            year: `${year}`,
          },
          {
            month: `${month}`,
          },
        ],
      },
    },
    {
      $sort: {
        year: -1,
        month: -1,
      },
    },
  ]

  const result = await Transaction.aggregate(pipeline)

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
