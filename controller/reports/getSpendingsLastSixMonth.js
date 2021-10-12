const { Transaction } = require('../../model')
const { HttpCode } = require('../../helpers/constants')

const getSpendingsLastSixMonth = async (_, res) => {
  const today = new Date()
  const curYear = today.getFullYear().toString()
  const curMonth = (today.getMonth() + 1).toString()

  console.log(`Today is a day of ${curMonth}-${curYear}`)

  const pipeline = [
    {
      $project: {
        year: 1,
        month: 1,
        day: 1,
        value: 1,
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
          $lte: new Date('2021-10')
        }
        // myNewDate: {
        //   $gte: new Date('2021-05'),
        // },
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

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      result: result
    },
    message: 'Last six month spendings report has been successufully prepared'
  })
}

module.exports = getSpendingsLastSixMonth
