const { ObjectId } = require('mongodb')
const { Transaction } = require('../../../model')

const getCashState = async (isIncoming, owner) => {
  const pipeline = [
    {
      $match: {
        cashIncome: isIncoming,
        owner: new ObjectId(`${owner}`)
      }
    },
    {
      $group: {
        _id: 'Cash',
        total: {
          $sum: '$value'
        }
      }
    }
  ]

  const data = await Transaction.aggregate(pipeline)

  if (!data.length === 0) return 0

  const total = data[0]?.total

  return total
}

module.exports = getCashState
