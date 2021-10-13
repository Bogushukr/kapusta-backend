const { Transaction } = require('../../../model')

const lastSixMonth = async (isIncoming, owner) => {
  const today = new Date()
  const curYear = today.getFullYear().toString()
  const curMonth = (today.getMonth() + 1).toString()

  const pipeline = [
    {
      $project: {
        year: 1,
        month: 1,
        day: 1,
        value: 1,
        owner: 1,
        cashIncome: 1,
        myNewDate: {
          $toDate: {
            $concat: ['$year', '-', '$month', '-', '$day']
          }
        }
      }
    },
    {
      $match: {
        myNewDate: {
          $lte: new Date(`${curYear}-${curMonth}`)
        },
        cashIncome: isIncoming,
        owner: new ObjectId(`${owner}`) // eslint-disable-line
      }
    },
    {
      $group: {
        _id: {
          month: {
            $month: '$myNewDate'
          },
          year: {
            $year: '$myNewDate'
          }
        },
        Total: {
          $sum: '$value'
        }
      }
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1
      }
    },
    {
      $limit: 6
    }
  ]

  const result = await Transaction.aggregate(pipeline)

  return result
}

module.exports = lastSixMonth
