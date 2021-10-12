const { Transaction } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const getIncomingsLastSixMonth = async (_, res) => {
  const pipeline = [
    {
      $match: {
        cashIncome: true
      }
    },
    {
      $group: {
        _id: '$month',
        totalSum: {
          $sum: '$value'
        }
      }
    },
    {
      $sort: {
        _id: -1
      }
    },
    {
      $limit: 6
    }
  ]

  const result = await Transaction.aggregate(pipeline)

  if (!result) {
    res.status(HttpCode.NO_CONTENT)
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      result: result
    },
    message: 'Last six month spendings report has been successufully prepared'
  })
}

module.exports = getIncomingsLastSixMonth
