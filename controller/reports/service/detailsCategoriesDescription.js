const { Transaction } = require('../../../model')

const getDetails = async (isIncoming, year, month) => {
  const pipeline = [
    {
      $facet: {
        categoriesAndDescription: [
          {
            $match: {
              year: `${year}`,
              month: `${month}`,
              cashIncome: isIncoming
            }
          },
          {
            $group: {
              _id: {
                categories: {
                  $cond: [
                    '$cashIncome',
                    '$incomeCategories',
                    '$expenseCategories'
                  ]
                },
                desc: '$desc'
              },
              totalByDesc: {
                $sum: '$value'
              }
            }
          },
          {
            $group: {
              _id: '$_id.categories',
              totalByCategory: {
                $sum: '$totalByDesc'
              },
              desc: {
                $push: {
                  desc: '$_id.desc',
                  total: '$totalByDesc'
                }
              }
            }
          }
        ]
      }
    }
  ]

  const result = await Transaction.aggregate(pipeline)

  //   const transactionListMonth = result[0].list
  //   const cashOutMonth = result[0].totalCashOut[0].total
  //   const cashInMonth = result[0].totalCashIn[0].total

  console.log(result[0])

  return result[0]
}

module.exports = getDetails

/*
  categoriesAndDescription: [
    { _id: 'education', totalByCategory: 4000, desc: [Array] },
    { _id: 'food', totalByCategory: 395, desc: [Array] },
    { _id: 'sport', totalByCategory: 300, desc: [Array] },
    { _id: 'transport', totalByCategory: 120, desc: [Array] },
    { _id: 'alcohol', totalByCategory: 605, desc: [Array] },
    { _id: 'entertainment', totalByCategory: 800, desc: [Array] }
  ]
}
*/
