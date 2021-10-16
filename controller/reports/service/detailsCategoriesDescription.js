const { ObjectId } = require('mongodb')
const { Transaction } = require('../../../model')

const getDetails = async (isIncoming, year, month, owner) => {
  const pipeline = [
    {
      $facet: {
        categoriesAndDescription: [
          {
            $match: {
              year: year,
              month: month,
              cashIncome: isIncoming,
              owner: new ObjectId(`${owner}`)
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

  return result[0]
}

module.exports = getDetails
