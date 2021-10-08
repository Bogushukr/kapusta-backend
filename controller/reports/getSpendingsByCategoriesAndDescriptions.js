const { Transaction } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const getSpendingsByCategoriesAndDescriptions = async (_, res) => {
  const pipeline = [
    {
      $match: {
        cashIncome: false,
      },
    },
    {
      $group: {
        _id: '$desc',
        value: {
          $sum: '$value',
        },
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $limit: 10,
    },
  ]

  const result = await Transaction.aggregate(pipeline)

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      result: result,
    },
    message: 'Spending types summary report has been successufully prepared',
  })
}

module.exports = getSpendingsByCategoriesAndDescriptions
