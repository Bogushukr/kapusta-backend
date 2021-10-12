const { HttpCode } = require('../../helpers/constants')
const { Transaction } = require('../../model')

const balanceGet = async (_, res) => {
  const cashOutBalance = await getCashState(false)
  const cashInBalance = await getCashState(true)
  const balance = cashInBalance[0].total - cashOutBalance[0].total

  res.status(HttpCode.OK).json({
    status: 'success',
    code: 200,
    data: {
      cashOutBalance: cashOutBalance[0].total,
      cashInBalance: cashInBalance[0].total,
      balance: balance
    },
    message: `Total Balance: ${cashInBalance} - ${cashOutBalance} = ${balance}`
  })
}

const getCashState = async (isIncoming) => {
  const pipeline = [
    {
      $match: {
        cashIncome: isIncoming
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

  return result
}

module.exports = balanceGet
