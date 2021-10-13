const { Transaction } = require('../../../model')

const getCashState = async (isIncoming, owner) => {
  const pipeline = [
    {
      $match: {
        cashIncome: isIncoming,
        owner: new ObjectId(`${owner}`) // eslint-disable-line
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

  const result = await Transaction.aggregate(pipeline)

  return result[0].total
}

module.exports = getCashState
