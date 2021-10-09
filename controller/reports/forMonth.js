const { Transaction } = require('../../model')

const forMonth = async (isIncoming, year, month) => {
  const pipeline = [
    {
      $match: {
        $and: [
          {
            cashIncome: isIncoming,
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

  return result
}

module.exports = forMonth
