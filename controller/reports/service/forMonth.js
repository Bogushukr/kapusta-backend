const { ObjectId } = require('mongodb')
const { Transaction } = require('../../../model')

const forMonth = async (isIncoming, year, month, owner) => {
  const pipeline = [
    {
      $facet: {
        list: [
          {
            $match: {
              owner: new ObjectId(`${owner}`),
              cashIncome: isIncoming,
              year: year,
              month: month
            }
          },
          {
            $sort: {
              day: -1
            }
          }
        ],
        totalCashOut: [
          {
            $match: {
              owner: new ObjectId(`${owner}`),
              cashIncome: false,
              year: year,
              month: month
            }
          },
          {
            $group: {
              _id: 'cashOut',
              total: {
                $sum: '$value'
              }
            }
          }
        ],
        totalCashIn: [
          {
            $match: {
              owner: new ObjectId(`${owner}`),
              cashIncome: true,
              year: year,
              month: month
            }
          },
          {
            $group: {
              _id: 'cashIn',
              total: {
                $sum: '$value'
              }
            }
          }
        ]
      }
    }
  ]

  const result = await Transaction.aggregate(pipeline)

  const { totalCashIn, totalCashOut } = result[0]
  const transactionsListMonth = result[0].list

  const cashOutMonth = totalCashOut.length === 0 ? 0 : totalCashOut[0].total

  const cashInMonth = totalCashIn.length === 0 ? 0 : totalCashIn[0].total

  return { transactionsListMonth, cashOutMonth, cashInMonth }
}

module.exports = forMonth
