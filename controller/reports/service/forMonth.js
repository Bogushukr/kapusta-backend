const { Transaction } = require('../../../model')

const forMonth = async (isIncoming, year, month) => {
  const pipeline = [
    {
      $facet: {
        list: [
          {
            $match: {
              cashIncome: isIncoming,
              year: `${year}`,
              month: `${month}`
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
              cashIncome: false,
              year: '2021',
              month: '09'
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
              cashIncome: true,
              year: '2021',
              month: '09'
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

  const transactionListMonth = result[0].list
  const cashOutMonth = result[0].totalCashOut[0].total
  const cashInMonth = result[0].totalCashIn[0].total

  return { transactionListMonth, cashOutMonth, cashInMonth }
}

module.exports = forMonth
